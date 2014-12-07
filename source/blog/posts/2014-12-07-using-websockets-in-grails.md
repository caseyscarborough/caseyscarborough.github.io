---
layout: post
title: "Using WebSockets in Grails"
date: 2014-12-07
categories: [grails]
---

[WebSockets](https://developer.mozilla.org/en-US/docs/WebSockets) are a fairly new web technology that allows an open connection between a client (typically a web browser) and a server. They allow for message sending and receiving, as well as real-time updates. Unfortunately, like with many subjects in Grails, there isn't a lot of information on the web for getting started with them. This post aims to get you up and running with WebSockets in your Grails application. The version targeted in this post is the latest version at the time of this writing, Grails 2.4.4 using Java 8 (Java 7 should also work).

## Installing Necessary Dependencies

You'll want to begin by adding the necessary dependency to your `grails-app/conf/BuildConfig.groovy` file. Add the following dependency to your `dependencies` block:

<pre class="highlight"><code class="java">dependencies {
  bundle('javax.websocket:javax.websocket-api:1.1') {
    // This line is necessary for deployment to Tomcat, since
    // Tomcat comes with its own version of javax.websocket-api.
    export = false
  }  
}
</code></pre>

## Creating Your WebSocket

You'll want to create your WebSocket in your `src/groovy/{package-name}` directory. For this example, we'll create a WebSocket that handles the receiving and sending of messages to/from a chatroom.

Here is our WebSocket class:

<pre class="highlight"><code class="java">package chatroom

import grails.util.Environment
import org.apache.log4j.Logger
import org.codehaus.groovy.grails.commons.GrailsApplication
import org.codehaus.groovy.grails.web.servlet.GrailsApplicationAttributes
import org.springframework.context.ApplicationContext

import javax.servlet.ServletContext
import javax.servlet.ServletContextEvent
import javax.servlet.ServletContextListener
import javax.servlet.annotation.WebListener
import javax.websocket.*
import javax.websocket.server.ServerContainer
import javax.websocket.server.ServerEndpoint

@ServerEndpoint("/chatroom")
@WebListener
class ChatroomEndpoint implements ServletContextListener {

  private static final Logger log = Logger.getLogger(ChatroomEndpoint.class)
  private static final Set&lt;Session&gt; users = ([] as Set).asSynchronized()

  @Override
  void contextInitialized(ServletContextEvent servletContextEvent) {
    ServletContext servletContext = servletContextEvent.servletContext
    ServerContainer serverContainer = servletContext.getAttribute("javax.websocket.server.ServerContainer")

    try {
      // This is necessary for Grails to add the endpoint in development.
      // In production, the endpoint will be added by the @ServerEndpoint
      // annotation.
      if (Environment.current == Environment.DEVELOPMENT) {
        serverContainer.addEndpoint(ChatroomEndpoint)
      }

      // This is mainly for demonstration of retrieving the ApplicationContext,
      // the GrailsApplication instance, and application configuration.
      ApplicationContext ctx = (ApplicationContext) servletContext.getAttribute(GrailsApplicationAttributes.APPLICATION_CONTEXT)
      GrailsApplication grailsApplication = ctx.grailsApplication
      serverContainer.defaultMaxSessionIdleTimeout = grailsApplication.config.servlet.defaultMaxSessionIdleTimeout ?: 0
    } catch (IOException e) {
      log.error(e.message, e)
    }
  }

  @Override
  void contextDestroyed(ServletContextEvent servletContextEvent) {
  }

  /**
   * This method is executed when a client connects to this websocket
   * endpoint, and adds the new user's session to our users list.
   */
  @OnOpen
  public void onOpen(Session userSession) {
    users.add(userSession)
  }

  /**
   * This method is executed when a client sends a message to the
   * websocket endpoint. It sets the first message that the user sends
   * as the user's username, and treats all others as a message to
   * the chatroom.
   * @param message
   * @param userSession
   */
  @OnMessage
  public void onMessage(String message, Session userSession) {
    String username = userSession.userProperties.get("username")

    if (!username) {
      userSession.userProperties.put("username", message)
      sendMessage(String.format("%s has joined the chatroom.", message))
      return
    }

    // Send the message to all users in the chatroom.
    sendMessage(message, userSession)
  }

  /**
   * This method is executed when a user disconnects from the chatroom.
   */
  @OnClose
  public void onClose(Session userSession, CloseReason closeReason) {
    String username = userSession.userProperties.get("username")
    users.remove(userSession)
    userSession.close()

    if (username) {
      sendMessage(String.format("%s has left the chatroom.", username))
    }
  }

  @OnError
  public void onError(Throwable t) {
    log.error(t.message, t)
  }

  /**
   * Iterate through all chatroom users and send a message to them.
   * @param message
   */
  private void sendMessage(String message, Session userSession=null) {
    if (userSession) {
      message = String.format(
        "%s: %s", userSession.userProperties.get("username"), message)
    }
    Iterator&lt;Session&gt; iterator = users.iterator()
    while(iterator.hasNext()) {
      iterator.next().basicRemote.sendText(message)
    }
  }
}
</code></pre>

## Registering the WebSocket Listener

Next, you'll need to register your newly created WebSocket class in Grails' `web.xml` file. By default, this file is not created in your Grails application directory, but you can create it by running the following command:

<pre class="highlight"><code class="bash">grails install-templates</code></pre>

This will install the `web.xml` file in the `src/templates/war` directory. You can feel free to delete the other templates if you don't have a use for them. You'll want to add the following listener to that file:

<pre class="highlight"><code class="xml">&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;web-app version=&quot;3.0&quot;
         metadata-complete=&quot;true&quot;
         xmlns=&quot;http://java.sun.com/xml/ns/javaee&quot;
         xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;
         xsi:schemaLocation=&quot;http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd&quot;&gt;

    &lt;!-- Add the following lines: --&gt;
    &lt;listener&gt;
        &lt;listener-class&gt;chatroom.ChatroomEndpoint&lt;/listener-class&gt;
    &lt;/listener&gt;
&lt;/web-app&gt;
</code></pre>

Now your WebSocket should be ready to go when your application starts up. Now we just need to connect to it via JavaScript.

## Connecting to Your Endpoint Using JavaScript

First, we'll want to create an example page to test out the chatroom. In your `grails-app/views/index.gsp` (or wherever you'd like to connect to your endpoint), replace the contents with the following:

<pre class="highlight"><code class="gsp">&lt;html&gt;
&lt;head&gt;
  &lt;meta name=&quot;layout&quot; content=&quot;main&quot;&gt;
  &lt;title&gt;WebSocket Example&lt;/title&gt;
  &lt;style&gt;
  #chatroom {
    padding: 10px;
  }

  #message {
    width: 400px;
    padding: 10px;
  }

  #log {
    width: 400px;
    height: 400px;
    border: 1px solid #ddd;
    overflow: auto;
    padding: 10px;
  }
  &lt;/style&gt;
  &lt;script&gt;
    $(document).ready(function () {
      var log = $(&quot;#log&quot;),
          message = $(&quot;#message&quot;),
          sendMessageButton = $(&quot;#send-message-button&quot;),

      // Create the WebSocket URL link. This URI maps to the URI you specified
      // in the @ServerEndpoint annotation in ChatroomEndpoint.groovy.
          webSocketUrl = &quot;${createLink(uri: &#39;/chatroom&#39;, absolute: true).replaceFirst(/http/, /ws/)}&quot;,

      // Connect to the WebSocket.
          socket = new WebSocket(webSocketUrl);

      socket.onopen = function () {
        log.append(&quot;&lt;p&gt;Connected to server. Enter your username.&lt;/p&gt;&quot;);
      };

      socket.onmessage = function (message) {
        log.append(&quot;&lt;p&gt;&quot; + message.data + &quot;&lt;/p&gt;&quot;);
      };

      socket.onclose = function () {
        log.append(&quot;&lt;p&gt;Connection to server was lost.&lt;/p&gt;&quot;);
      };

      sendMessageButton.on(&#39;click&#39;, function () {
        var text = message.val();
        if ($.trim(text) !== &#39;&#39;) {
          // Send the message and clear the text.
          socket.send(text);

          message.val(&quot;&quot;);
          message.focus();
          return;
        }
        message.focus();
      });
    });
  &lt;/script&gt;
&lt;/head&gt;

&lt;body&gt;
&lt;div id=&quot;chatroom&quot;&gt;
  &lt;input type=&quot;text&quot; id=&quot;message&quot; placeholder=&quot;Enter your username first, then chat&quot;&gt;&lt;br&gt;

  &lt;div id=&quot;log&quot;&gt;&lt;/div&gt;&lt;br&gt;
  &lt;button id=&quot;send-message-button&quot;&gt;Send&lt;/button&gt;
&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</code></pre>

You can then run the application using `grails run-app` to see it in action.

## Conclusion

This is a simple example, which does not handle things such as XSS prevention or HTML encoding, but it should be sufficient to get started. Feel free to post a comment if you have any questions or run into any problems.
---
layout: post
title: "Using WebSockets in Grails"
date: 2014-12-07
categories: [grails]
---

[WebSockets](https://developer.mozilla.org/en-US/docs/WebSockets) are a fairly new web technology that allows an open connection between a client (typically a web browser) and a server. They allow for message sending and receiving, as well as real-time updates. Unfortunately, like with many subjects in Grails, there isn't a lot of information on the web for getting started with them. This post aims to get you up and running with WebSockets in your Grails application. The version targeted in this post is the latest version at the time of this writing, Grails 2.4.4 using Java 8 (Java 7 should also work).

## Installing Necessary Dependencies

You'll want to begin by adding the necessary dependency to your `grails-app/conf/BuildConfig.groovy` file. Add the following dependency to your `dependencies` block:

```java
dependencies {
  bundle('javax.websocket:javax.websocket-api:1.1') {
    // This line is necessary for deployment to Tomcat, since
    // Tomcat comes with its own version of javax.websocket-api.
    export = false
  }  
}
```

## Creating Your WebSocket

You'll want to create your WebSocket in your `src/groovy/{package-name}` directory. For this example, we'll create a WebSocket that handles the receiving and sending of messages to/from a chatroom.

Here is our WebSocket class:

```java
package chatroom

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
  private static final Set<Session> users = ([] as Set).asSynchronized()

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
    Iterator<Session>; iterator = users.iterator()
    while(iterator.hasNext()) {
      iterator.next().basicRemote.sendText(message)
    }
  }
}
```

## Registering the WebSocket Listener

Next, you'll need to register your newly created WebSocket class in Grails' `web.xml` file. By default, this file is not created in your Grails application directory, but you can create it by running the following command:

```bash
grails install-templates
```

This will install the `web.xml` file in the `src/templates/war` directory. You can feel free to delete the other templates if you don't have a use for them. You'll want to add the following listener to that file:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app version="3.0"
         metadata-complete="true"
         xmlns="http://java.sun.com/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd">

    <!-- Add the following lines: -->
    <listener>
        <listener-class>chatroom.ChatroomEndpoint</listener-class>
    </listener>
</web-app>
```

Now your WebSocket should be ready to go when your application starts up. Now we just need to connect to it via JavaScript.

## Connecting to Your Endpoint Using JavaScript

First, we'll want to create an example page to test out the chatroom. In your `grails-app/views/index.gsp` (or wherever you'd like to connect to your endpoint), replace the contents with the following:

```gsp
<html>
<head>
  <meta name="layout" content="main">
  <title>WebSocket Example</title>
  <style>
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
  </style>
  <script>
    $(document).ready(function () {
      var log = $("#log"),
          message = $("#message"),
          sendMessageButton = $("#send-message-button"),

      // Create the WebSocket URL link. This URI maps to the URI you specified
      // in the @ServerEndpoint annotation in ChatroomEndpoint.groovy.
          webSocketUrl = "${createLink(uri: '/chatroom', absolute: true).replaceFirst(/http/, /ws/)}",

      // Connect to the WebSocket.
          socket = new WebSocket(webSocketUrl);

      socket.onopen = function () {
        log.append("<p>Connected to server. Enter your username.</p>");
      };

      socket.onmessage = function (message) {
        log.append("<p>" + message.data + "</p>");
      };

      socket.onclose = function () {
        log.append("<p>Connection to server was lost.</p>");
      };

      sendMessageButton.on('click', function () {
        var text = message.val();
        if ($.trim(text) !== '') {
          // Send the message and clear the text.
          socket.send(text);

          message.val("");
          message.focus();
          return;
        }
        message.focus();
      });
    });
  </script>
</head>

<body>
<div id="chatroom">
  <input type="text" id="message" placeholder="Enter your username first, then chat"><br>

  <div id="log"></div><br>
  <button id="send-message-button">Send</button>
</div>
</body>
</html>
```

You can then run the application using `grails run-app` to see it in action.

## Conclusion

This is a simple example, which does not handle things such as XSS prevention or HTML encoding, but it should be sufficient to get started. Feel free to post a comment if you have any questions or run into any problems.
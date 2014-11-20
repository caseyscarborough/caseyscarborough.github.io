---
layout: post
title:  "Using Git to Easily Deploy a Site"
date:   2013-09-02 17:39:00
categories: [deployment, git]
---

[Git](http://git-scm.com) is a very powerful and full featured version control system. If you aren't using it, [you should be](http://www.makeuseof.com/tag/git-version-control-youre-developer/). In addition to tracking development changes, allowing easy collaboration, and many other features, it can be used to easily deploy your site (or any other content for that matter) to a server. For example, updating your site can be as simple as these steps:

<pre class="highlight"><code class="bash"># Make changes to site...
<span class="dollar">$</span> git add .
<span class="dollar">$</span> git commit -m "Add awesome new feature."
<span class="dollar">$</span> git push</code></pre>

And your changes will be live! To make it better, only the changes that you've made in your commit will be changed, so your files will not have to be continuously reuploaded. Let's get started.

### On the Server

To begin, you'll want to create a place on your server to deploy your site to. Start by opening an SSH connection with your server and creating a directory to hold your repository.

<pre class="highlight"><code class="bash"><span class="dollar">$</span> ssh user@example.com
<span class="dollar">$</span> mkdir site.git && cd site.git

# Initialize a bare repository and create a directory to hold your site.
<span class="dollar">$</span> git init --bare
<span class="dollar">$</span> mkdir www</code></pre>

You'll then want to create a post-receive [Git Hook](http://git-scm.com/book/ch7-3.html) to checkout the latest files into our `www` directory after pushing our latest commit. From inside of your `site.git` folder, create a file in the `hooks` directory called `post-receive`.

<pre class="highlight"><code class="bash"><span class="dollar">$</span> vim hooks/post-receive</code></pre>

Then, add the following contents to the file:

<pre class="highlight"><code class="bash">#!/bin/sh
GIT_WORK_TREE=./www git checkout -f</code></pre>

Then `chmod` the script to make it executable.

<pre class="highlight"><code class="bash"><span class="dollar">$</span> chmod +x hooks/post-receive</code></pre>

That's all for the server configuration. Now to move onto our local machine.

### Local Changes

If you don't already have a repository or site that you are ready to deploy, you can begin by creating your repository. Otherwise, you can skip to the next section.

<pre class="highlight"><code class="bash"><span class="dollar">$</span> mkdir my-website && cd my-website
<span class="dollar">$</span> git init
<span class="dollar">$</span> echo 'Under MAJOR construction.' > index.html
<span class="dollar">$</span> git add .
<span class="dollar">$</span> git commit -m "Initial commit."</code></pre>

Otherwise, you can just initialize a repository (if it doesn't exist yet) in your existing site's directory.

<pre class="highlight"><code class="bash"><span class="dollar">$</span> cd [path-to-your-site]
<span class="dollar">$</span> git init
<span class="dollar">$</span> git add .
<span class="dollar">$</span> git commit -m "Initial commit."</code></pre>

#### Connect with Your Remote Repository

The last step before deployment is to connect your local repository to your remote repository. Add a remote named _origin_ and point it to the path of the repository created earlier on your server.

<pre class="highlight"><code class="bash"><span class="dollar">$</span> git remote add origin user@example.com:[path-to-repo]/site.git</code></pre>

That's it! The final step is to deploy your site.

<pre class="highlight"><code class="bash"><span class="dollar">$</span> git push origin master</code></pre>

Your repository will then be pushed to your remote server, and your files will be in the `www` directory created earlier. This will greatly increase the ease of future deployments, as well as help by keeping your site versioned. The last step is just to make sure your server's Virtual Host configuration points to your `www` directory.

### Resources

* [Git](http://git-scm.org)
* [Git Hooks](http://git-scm.com/book/ch7-3.html)

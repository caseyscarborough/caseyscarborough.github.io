---
layout: post
title:  "Previewing Your GitHub Markdown Files Using Yield"
date:   2013-08-08 13:08:00
categories: [markdown, ruby]
---

It is very common when uploading your repositories to GitHub to include a file called `README.md` with your repository. This file is usually written in GitHub Flavored Markdown, which is essentially traditional markdown with a few added features from GitHub. Markdown is a super simple, text-focused language that gives you easy ways to add lists, font formatting, blockquotes, code snippets, headers, and much more.

When working with multiple projects on GitHub, I've noticed that it is sometimes inconvenient that you cannot view the output of your markdown until your changes are pushed up to GitHub. If you make a mistake, or something is not formatted as you'd like, this can lead to unnecessary commits. To solve this issue, I've created a small Ruby gem called [`yield`](http://caseyscarborough.github.io/yield), that allows you to view the output of your markdown rendered by [GitHub's Markdown API](http://developer.github.com/v3/markdown/). 

### Installing the Gem

Installing the gem requires Ruby v1.9.3 or greater, so be sure to have that installed before the installation. To get started with [`yield`](http://caseyscarborough.github.io/yield), you can begin by running the following command to install the latest version:

<pre class="no-highlight"><code><span class="dollar">$</span> gem install yield</code></pre>

This will install the [`yield`](http://caseyscarborough.github.io/yield) gem, and will give you access to its executable.

## Using Yield to Render Markdown

After installation, from any repository with a README.md file, issue the yield command to fire up the server and parse your markdown file:

<pre class="no-highlight"><code><span class="dollar">$</span> yield
=* Yield is serving your markdown at http://localhost:4000/
</code></pre>

This will start up a server instance using Thin, and open your browser to [localhost:4000](http://localhost:4000). You should see something in your browser similar to the following, which is the [`README.md`](https://github.com/caseyscarborough/yield/blob/master/README.md) file for the [`yield`](http://caseyscarborough.github.io/yield) gem.

![screenshot](/assets/images/readme.png)

You can render markdown files that are not named `README.md` by specifying the name of the file as an argument to `yield`.

<pre class="no-highlight"><code><span class="dollar">$</span> yield updates.md</code></pre>

This will render the contents of the `updates.md` file in the browser at [localhost:4000](http://localhost:4000).

Yield also supports relative URLs, so you can render markdown files just by navigating to their filename in the browser. For instance, the `updates.md` file can be viewed at [localhost:4000/updates.md](localhost:4000/updates.md).

Finally, you can set the port for the server to start on by using the `-p` or `--port` option, shown below.

<pre class="no-highlight"><code><span class="dollar"># Specify the port to serve on
$</span> yield -p 8080
=* Yield is serving your markdown at http://localhost:8080/
</code></pre>

Check out the repository on GitHub for the latest updates and to view the source for the gem. This gem is still in development so many updates and improvements are likely to come.

### Resources

[`yield` homepage](http://caseyscarborough.com/projects/yield)<br />
[`yield` source code on GitHub](https://github.com/caseyscarborough/yield)<br />
[Markdown Syntax Guide](http://daringfireball.net/projects/markdown/syntax)<br />
[GitHub Flavored Markdown](https://help.github.com/articles/github-flavored-markdown)<br />
[GitHub's Markdown API](http://developer.github.com/v3/markdown/)<br />
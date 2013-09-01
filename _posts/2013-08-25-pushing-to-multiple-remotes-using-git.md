---
layout: post
title:  "Pushing to Multiple Remote Repositories Using Git"
date:   2013-08-25 16:52:00
categories: [markdown, git]
---

When using Git for version control, many people use [GitHub](https://github.com) as a place to hold remote
repositories, and push their repositories there. I recently started using [BitBucket](https://bitbucket.org)
also, and wanted to be able to simultaneously update my GitHub and BitBucket repositories when changes were made.

To begin, rename your current remote (most likely named _origin_) to a different name. I'd rename this to the
name of the service you are using, such as _github_ or _bitbucket_.

<pre class="no-highlight"><code><span class="dollar">$</span> git remote rename origin github</code></pre>

You can then add the remote for your second remote repository, in this case, a BitBucket repository.

<pre class="no-highlight"><code><span class="dollar">$</span> git remote add bitbucket git@bitbucket.org:username/example.git</code></pre>

Afterwards, you'll want to set up your _origin_ remote to push to both of these. Issue the following command:

<pre class="no-highlight"><code><span class="dollar">$</span> git config -e</code></pre>

You will be greeted with your Git configuration (most likely using vim). Add the `[remote "origin"]` section
to the bottom of the file with the URLs from each remote repository you'd like to push to.

<small>.git/config</small>
<pre class="highlight"><code>[core]
  repositoryformatversion = 0
  filemode = true
  bare = false
  logallrefupdates = true
  ignorecase = true
  precomposeunicode = false
[branch "master"]
  remote = github
  merge = refs/heads/master
[remote "github"]
  url = git@github.com:username/repo.git
  fetch = +refs/heads/*:refs/remotes/github/*
[remote "bitbucket"]
  url = git@bitbucket.org:username/repo.git
  fetch = +refs/heads/*:refs/remotes/bitbucket/*
[remote "origin"]
  url = git@github.com:username/repo.git
  url = git@bitbucket.org:username/repo.git
</code></pre>

You can then push to both repositories by issuing:

<pre class="no-highlight"><code><span class="dollar">$</span> git push origin master</code></pre>

Or to a single one by issuing either of these commands:

<pre class="no-highlight"><code><span class="dollar">$</span> git push github master
<span class="dollar">$</span> git push bitbucket master</code></pre>
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

```bash
git remote rename origin github
```

You can then add the remote for your second remote repository, in this case, a BitBucket repository.

```bash
git remote add bitbucket git@bitbucket.org:username/example.git
```

Afterwards, you'll want to set up your _origin_ remote to push to both of these. Issue the following command:

```bash
git config -e
```

You will be greeted with your Git configuration (most likely using vim). Add the `[remote "origin"]` section
to the bottom of the file with the URLs from each remote repository you'd like to push to.

<small>.git/config</small>

```
[core]
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
```

You can then push to both repositories by issuing:

```bash
git push origin master
```

Or to a single one by issuing either of these commands:

```bash
git push github master
git push bitbucket master
```
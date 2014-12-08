---
layout: post
title:  "Using Git to Easily Deploy a Site"
date:   2013-09-02 17:39:00
categories: [deployment, git]
---

[Git](http://git-scm.com) is a very powerful and full featured version control system. If you aren't using it, [you should be](http://www.makeuseof.com/tag/git-version-control-youre-developer/). In addition to tracking development changes, allowing easy collaboration, and many other features, it can be used to easily deploy your site (or any other content for that matter) to a server. For example, updating your site can be as simple as these steps:

```bash
# Make changes to site...$ git add .
git commit -m "Add awesome new feature."
git push
```

And your changes will be live! To make it better, only the changes that you've made in your commit will be changed, so your files will not have to be continuously reuploaded. Let's get started.

### On the Server

To begin, you'll want to create a place on your server to deploy your site to. Start by opening an SSH connection with your server and creating a directory to hold your repository.

```bash
ssh user@example.com$ mkdir site.git && cd site.git

# Initialize a bare repository and create a directory to hold your site.
git init --bare
mkdir www
```

You'll then want to create a post-receive [Git Hook](http://git-scm.com/book/ch7-3.html) to checkout the latest files into our `www` directory after pushing our latest commit. From inside of your `site.git` folder, create a file in the `hooks` directory called `post-receive`.

```bash
vim hooks/post-receive
```

Then, add the following contents to the file:

```bash
#!/bin/shGIT_WORK_TREE=./www git checkout -f
```

Then `chmod` the script to make it executable.

```bash
chmod +x hooks/post-receive
```

That's all for the server configuration. Now to move onto our local machine.

### Local Changes

If you don't already have a repository or site that you are ready to deploy, you can begin by creating your repository. Otherwise, you can skip to the next section.

```bash
mkdir my-website && cd my-website$ git init
echo 'Under MAJOR construction.' > index.html
git add .
git commit -m "Initial commit."
```

Otherwise, you can just initialize a repository (if it doesn't exist yet) in your existing site's directory.

```bash
$ cd [path-to-your-site]$ git init
$ git add .
$ git commit -m "Initial commit."
```

#### Connect with Your Remote Repository

The last step before deployment is to connect your local repository to your remote repository. Add a remote named _origin_ and point it to the path of the repository created earlier on your server.

```bash
$ git remote add origin user@example.com:[path-to-repo]/site.git
```

That's it! The final step is to deploy your site.

```bash
$ git push origin master
```

Your repository will then be pushed to your remote server, and your files will be in the `www` directory created earlier. This will greatly increase the ease of future deployments, as well as help by keeping your site versioned. The last step is just to make sure your server's Virtual Host configuration points to your `www` directory.

### Resources

* [Git](http://git-scm.org)
* [Git Hooks](http://git-scm.com/book/ch7-3.html)

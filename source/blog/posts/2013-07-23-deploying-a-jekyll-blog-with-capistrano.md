---
layout: post
title:  "Deploying a Jekyll Blog with Capistrano"
date:   2013-07-23 20:51:00
categories: [programming, ruby]
---

A large majority of sites built using Jekyll end up being hosted using [GitHub Pages](http://pages.github.com/). I opted to host this blog myself, and wanted the convenience I've had in the past with Rails applications of deploying with [Capistrano
](http://www.capistranorb.com/). The first thing you'll want to do is be sure that you have the Capistrano gem installed on your system.

```bash
gem install capistrano
gem install rvm-capistrano
```

Afterwards, `cd` to your blog's directory and initialize the directory using Capistrano's `capify` command.

```bash
cd /path-to/jekyll-blog
capify .
```

This will generate a file named `Capfile` and a directory called `config` with a `deploy.rb` script inside. The following is a sample `deploy.rb` script based on the one I used for my blog to deploy the blog to your remote server. Replace the contents of your `deploy.rb` script with this and edit the values as necessary.

```ruby
set :rvm_ruby_string, 'default'require "rvm/capistrano"

# Set application name and username on server
set :application, "blog.caseyscarborough.com"
set :user, "username-on-server"
 
# Set SSH Port and location on the server to deploy to
set :port, 22
set :deploy_to, "/var/www/#{application}"
set :deploy_via, :copy
set :use_sudo, false
 
# Set git as the SCM and set the repository and branch
set :scm, :git
set :repository, "https://github.com/caseyscarborough/blog.caseyscarborough.com"
set :branch, "master"

# Set the hostname or IP of the server to deploy to
role :web, "123.456.7.890"
role :app, "123.456.7.890"
role :db,  "123.456.7.890", :primary => true
role :db,  "123.456.7.890"

# Remove the config dir and Capfile, and run jekyll build
after "deploy:create_symlink" do
  run "rm -rf #{release_path}/config #{release_path}/Capfile"
  run "cd #{release_path} && jekyll build"
end
```

Afterwards, you can run the typical Capistrano commands from the root of your blog directory to deploy the application. Make sure that you have the `jekyll` gem installed on your remote server before this step.

```bash
cap deploy:setup
cap deploy:check
cap deploy
```

Your blog should then be deployed to the remote server and `jekyll build` will be run on your blog to generate the static content.

The last step is to make sure that your Virtual Host configuration for your web server points to the \_site directory at the deployed location on your server. Here is a sample nginx configuration for the Virtual Host:

```
server {
  listen 80;
  server_name example.com;
  root /var/www/example.com/current/_site;
}
```

This way, every time you make a change you can deploy the blog and it will update automatically.
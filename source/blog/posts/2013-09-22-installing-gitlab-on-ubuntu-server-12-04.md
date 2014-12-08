---
layout: post
title:  "Installing GitLab on Ubuntu Server 12.04"
date:   2013-09-22 16:00:00
categories: [deployment, git, system administration]
---

If you are an avid user of [Git](http://git-scm.com/) like myself, it is likely that you've used a service such as [GitHub](https://github.com) or [BitBucket](https://bitbucket.org) to share your Git repositories and collaborate with others. I recently stumbled upon [GitLab](http://gitlab.org). GitLab is an open source project management, code hosting, and collaboration application, very similar to GitHub, that you can install and run securely on your own server! I won't go into all the details about how awesome this is, as I'm sure if you're here, you're eager to get it up and running. I've written this blog post to work through some common issues that I've had with the installation and to provide a smooth, easy way to get it installed on your server. The following installation will be performed on a freshly installed copy on [Ubuntu Server 12.04](http://www.ubuntu.com/download/server).

### Requirements

The officially supported operating systems for GitLab are Ubuntu Linux and Debian/GNU Linux, although it should work on many others. I've installed this with pretty much the same results on Debian 6 and Ubuntu Server.

A processor with __4 cores__ is recommended, but if you won't have a lot of users, 2 cores should be sufficient.

The following are the memory requirements:

* 768MB is the minimal memory size and supports up to 100 users
* __1GB is the recommended memory size__ and supports up to 1,000 users
* 1.5GB supports up to 10,000 users

### Installing Required Packages

The first step when booting up your install is to set a root password and update the machine.

```bash
# Set the root password
$ sudo passwd root

# Enter root, update the system, and install requirements.
$ su
$ apt-get update -y
$ apt-get upgrade -y
$ apt-get install -y build-essential zlib1g-dev libyaml-dev libssl-dev libgdbm-dev libreadline-dev libncurses5-dev libffi-dev curl git-core openssh-server redis-server checkinstall libxml2-dev libxslt-dev libcurl4-openssl-dev libicu-dev

# Set VIM as the default editor (optional, nano is the default)
$ update-alternatives --set editor /usr/bin/vim.basic
```

You can then exit the root shell by typing `exit`. Next you'll want to ensure you have the proper Python installation (which comes by default with Ubuntu Server), and install the python-docutils to support reStructuredText markdown.

```bash
# Make sure you have at least Python 2.5, but not 3.x$ python --version
Python 2.7.3

$ sudo apt-get install python-docutils -y
```

Now on to download and compile Ruby, then install the [Bundler Gem](http://bundler.io).

```bash
$ mkdir /tmp/ruby && cd /tmp/ruby$ curl --progress ftp://ftp.ruby-lang.org/pub/ruby/2.0/ruby-2.0.0-p247.tar.gz | tar xz
$ cd ruby-2.0.0-p247
$ ./configure
$ make && sudo make install  # This will take a while!
$ sudo gem install bundler --no-ri --no-rdoc
```

### Setting Up the Git User

The simplest part of the installation is setting up the user to manage the application. Run the following command:

```bash
$ sudo adduser --disabled-login --gecos 'GitLab' git```

### Setting Up the Database

The next step is to set up the database. GitLab recommends using [MySQL](https://www.mysql.com/), which we will be using here.

> Note: If you'd like to use [PostgreSQL](http://www.postgresql.org/), see this [link](https://github.com/gitlabhq/gitlabhq/blob/master/doc/install/databases.md#postgresql).

Install the database and set up the root password.

```bash
$ sudo apt-get install -y mysql-server mysql-client libmysqlclient-dev
```

Then login to MySQL server with your password and create the database and user. 

> Note: Make sure that you do not type the `mysql> ` prompt, and that you replace the password with one of your own.

```bash
$ mysql -u root -p

# Create the user.
mysql> CREATE USER 'gitlab'@'localhost' IDENTIFIED BY 'Password1';

# Create the database.
mysql> CREATE DATABASE IF NOT EXISTS `gitlabhq_production` DEFAULT CHARACTER SET `utf8` COLLATE `utf8_unicode_ci`;

# Grant the user priveleges to the database.
mysql> GRANT SELECT, LOCK TABLES, INSERT, UPDATE, DELETE, CREATE, DROP, INDEX, ALTER ON `gitlabhq_production`.* TO 'gitlab'@'localhost';

# Exit.
mysql> \q
```

### Update Git

GitLab requires a Git version 1.7.10 or greater. We'll need to update that. Issue the following commands:

```bash
$ sudo apt-get install -y python-software-properties$ sudo add-apt-repository ppa:git-core/ppa
$ sudo apt-get update
$ sudo apt-get install -y git
```

### Installing GitLab Shell

Now we'll install the GitLab Shell, GitLab's replacement for Gitolite.

```bash
$ cd /home/git

# Clone the repository
$ sudo -u git -H git clone https://github.com/gitlabhq/gitlab-shell.git
$ cd gitlab-shell

# Checkout the latest version
$ sudo -u git -H git checkout v1.7.1
$ sudo -u git -H cp config.yml.example config.yml

# Edit the configuration file and update gitlab_url with something like 'http://yourdomain.com/'
$ sudo -u git -H editor config.yml

# Run the installation
$ sudo -u git -H ./bin/install
```


### Installing GitLab

Now, onto the main event. The following steps will walk you through installing the actual GitLab application.

```bash
$ cd /home/git

# Clone the repository
$ sudo -u git -H git clone https://github.com/gitlabhq/gitlabhq.git gitlab
$ cd /home/git/gitlab

# Checkout the latest stable release
$ sudo -u git -H git checkout 6-1-stable

# Rename the config file and edit the domain name to your machine's name.
$ sudo -u git -H cp config/gitlab.yml.example config/gitlab.yml
$ sudo -u git -H editor config/gitlab.yml

# Rename the Unicorn config file.
$ sudo -u git -H cp config/unicorn.rb.example config/unicorn.rb
```

The next step is to update permissions and create the satellites folder. I'm leaving the bash prompt out of these so that you can copy-paste all commands and they will just run in order.

```bash
# Create satellites directory and update permissions.sudo -u git -H mkdir /home/git/gitlab-satellites
sudo chown -R git log/
sudo chown -R git tmp/
sudo chmod -R u+rwX log/
sudo chmod -R u+rwX tmp/
sudo -u git -H mkdir tmp/pids/
sudo -u git -H mkdir tmp/sockets/
sudo chmod -R u+rwX tmp/pids/
sudo chmod -R u+rwX tmp/sockets/
sudo -u git -H mkdir public/uploads
sudo chmod -R u+rwX public/uploads

# Set up the Git configuration.
sudo -u git -H git config --global user.name "GitLab"
sudo -u git -H git config --global user.email "gitlab@localhost"
sudo -u git -H git config --global core.autocrlf input
```

Now you'll want to configure the database. Rename the database.yml file and edit the file with the proper username and password that you created for the MySQL connection. The username should be _gitlab_ and whatever password you specified.

```bash
$ sudo -u git cp config/database.yml.mysql config/database.yml$ sudo -u git -H editor config/database.yml
$ sudo -u git -H chmod o-rwx config/database.yml
```

Then install the required gems.

```bash
$ cd /home/git/gitlab$ sudo gem install charlock_holmes --version '0.6.9.4'
$ sudo -u git -H bundle install --deployment --without development test postgres aws
```

### Initialize the Application

Now you can proceed to initialize the database and to activate GitLab's features, as well as make it start on system bootup. Type `yes` at the prompt to continue with this command.

```bash
$ sudo -u git -H bundle exec rake gitlab:setup RAILS_ENV=production

# Download the init script.
$ sudo cp lib/support/init.d/gitlab /etc/init.d/gitlab
$ sudo chmod +x /etc/init.d/gitlab

# Make GitLab start on bootup.
$ sudo update-rc.d gitlab defaults 21
```

Now just to check the status of your application and start the GitLab instance.

```bash
$ sudo -u git -H bundle exec rake gitlab:env:info RAILS_ENV=production$ sudo service gitlab start

# Make sure everything is green!
$ sudo -u git -H bundle exec rake gitlab:check RAILS_ENV=production
```

### Setting up Nginx

The final step is to install your webserver and have it serve your application. The officially supported webserver for GitLab is Nginx, so we'll be using that.

```bash
$ sudo apt-get install -y nginx$ sudo cp lib/support/nginx/gitlab /etc/nginx/sites-available/gitlab
$ sudo ln -s /etc/nginx/sites-available/gitlab /etc/nginx/sites-enabled/gitlab

# Edit the site file with your domain name.
$ sudo editor /etc/nginx/sites-available/gitlab

# Then restart the server!
$ sudo service nginx restart
```

### Finishing Up

You should now navigate in your browser to the URL of your GitLab server. If your server does not yet have an [FQDN](http://en.wikipedia.org/wiki/Fully_qualified_domain_name), you can get this by running the `ifconfig` command on your server. If all went well, you should be greeted with the GitLab login page! You can then proceed to login with the default credentials:

```
admin@local.host
5iveL!fe
```
If you have any issues with the installation, feel free to leave a comment below, or check out the [GitLab Troubleshooting Guide](https://github.com/gitlabhq/gitlab-public-wiki/wiki/Trouble-Shooting-Guide).

### Note

On each installation I've performed with GitLab I was unable to push to the remote repository via SSH. Every time I tried, the following error occurred:

```bash
$ git push -u origin master/usr/local/lib/ruby/2.0.0/net/http.rb:878:in `initialize': Connection timed out - connect(2) (Errno::ETIMEDOUT)
  from /usr/local/lib/ruby/2.0.0/net/http.rb:878:in `open'
  from /usr/local/lib/ruby/2.0.0/net/http.rb:878:in `block in connect'
  from /usr/local/lib/ruby/2.0.0/timeout.rb:52:in `timeout'
  from /usr/local/lib/ruby/2.0.0/net/http.rb:877:in `connect'
  from /usr/local/lib/ruby/2.0.0/net/http.rb:862:in `do_start'
  from /usr/local/lib/ruby/2.0.0/net/http.rb:851:in `start'
  from /home/git/gitlab-shell/lib/gitlab_net.rb:62:in `get'
  from /home/git/gitlab-shell/lib/gitlab_net.rb:17:in `allowed?'
  from /home/git/gitlab-shell/lib/gitlab_shell.rb:60:in `validate_access'
  from /home/git/gitlab-shell/lib/gitlab_shell.rb:23:in `exec'
  from /home/git/gitlab-shell/bin/gitlab-shell:16:in `main'
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

This happened when I my SSH keys were added and everything was set up properly. After much research, I finally resolved the issue by editing the `/etc/hosts` file and replacing the following line:

```bash
127.0.0.1       localhost
```

with (replace `gitlab.example.com` with your server's name):

```bash
127.0.0.1       gitlab.example.com
```

If you encounter this issue, this should resolve it for you.
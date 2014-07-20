---
layout: project
title: Projects &middot; GitHub API v3
---

# GitHub API v3 

<i class="fa fa-cloud-download"></i> <a href="https://github.com/caseyscarborough/github/zipball/master">Download .zip</a> &nbsp; 
<i class="fa fa-cloud-download"></i> <a href="https://github.com/caseyscarborough/github/tarball/master">Download .tar.gz</a> &nbsp; 
<i class="fa fa-github"></i> <a href="https://github.com/caseyscarborough/github">View on GitHub</a>

[![Gem Version](https://badge.fury.io/rb/github_api_v3.png)](http://badge.fury.io/rb/github_api_v3) [![Code Climate](https://codeclimate.com/github/caseyscarborough/github.png)](https://codeclimate.com/github/caseyscarborough/github) [![Build Status](https://travis-ci.org/caseyscarborough/github.png?branch=master)](https://travis-ci.org/caseyscarborough/github)

This is a simple and easy to use wrapper for GitHub's v3 API. Knowing a little about [GitHub's API](http://developer.github.com/) will aid in its use, but is not necessary. Nearly all methods of the API have been implemented, but there are a few left to go.

## Documentation

Full documentation for the gem can be found at [rdoc.info/gems/github_api_v3/frames](http://rdoc.info/gems/github_api_v3/frames). I strongly recommend checking it out, as the library is very well documented.

## Installation

To install the gem, issue the following command:

<pre class="no-highlight"><code><span class="dollar">$</span> gem install github_api_v3</code></pre>

## Usage

```ruby
require 'github_api_v3'
```

### Unauthenticated Requests

There are multiple different unauthenticated requests to the API. These are performed when no credentials are given, and are shown below starting with `GitHub`. Unauthenticated methods can certainly be called from an authenticated client, and this is recommended as to not reach the hourly [rate limit](http://developer.github.com/v3/#rate-limiting).

### Authenticated Requests

Some methods, such as retrieving private repos or emails, require authentication. To create one of these requests, you'll need to pass in your login and access token. You can create a personal access token on your [account page](https://github.com/settings/applications).

```ruby
# Create a new client using username and access token.
client = GitHub.client(
  :login => 'username',
  :access_token => 'bf215181b5140522137b3d4f6b73544a'
)

# Authenticated methods
client.emails # => ["email@example.com", "email2@example.com"]
client.repos  # => #<Array:0x007fb8aa0d1a00>
client.follow('matz') # => true
client.user   # => #<Hash:0x007fb8a9109d70>
```

Anytime a method is shown below starting with `client`, it is an authenticated method.

### Sample usage

The following sections are some sample usages of the library for parts of the API that I consider to be very useful. The methods in this section are not comprehensive, but aim to give a nice overview of some usage of this library.

#### Users

The following are some sample usages of the Users module.

```ruby
# Retrieve a single user's information.
user = GitHub.user('caseyscarborough')
user.login     # => "caseyscarborough"
user.name      # => "Casey Scarborough"
user.html_url  # => "https://github.com/caseyscarborough"
user.following # => 23

# Retrieve an array of all GitHub users.
GitHub.users

# Retrieve all emails for an authenticated user.
client.emails

# Follow/unfollow a user.
client.follow('caseyscarborough')
client.unfollow('caseyscarborough')

# Check if a user follows another user.
GitHub.follows?('caseyscarborough','matz')

# Get a list of an unauthenticated user's followers.
GitHub.followers('caseyscarborough')

# Get a list of an authenticated user's followers.
client.followers

# Get a list of user's a user is following.
GitHub.following('caseyscarborough')

# Check if authenticated user is following another user.
client.following?('caseyscarborough')
# => true

# Retrieve events for a user.
GitHub.events('caseyscarborough')

# Retrieve notifications for a user.
client.notifications

# Retrieve repositories watching/starring for a user.
client.watching
client.starring

# Retrieve a client's rate limit.
GitHub.rate_limit
client.rate_limit

# etc...
```
You can find the available attributes [here](http://developer.github.com/v3/users/#get-a-single-user). Check the [Users documentation](http://rdoc.info/gems/github_api_v3/GitHub/Client/Users) for the gem for a complete list and more examples.

#### Repositories

The following are some sample usages for the Repos module.

```ruby
# Retrieve repositories for an unauthenticated/authenticated user.
GitHub.repos('caseyscarborough')
client.repos

# Retrieve all public repositories on GitHub.
GitHub.all_repos

# Retrieve a specific repository.
GitHub.repo('owner','repo-name')

# Create a new repository.
client.create_repo('new-repo', :description => 'New repository.', :private => true)

# Delete a repository.
client.delete_repo('repo-name')

# Retrieve a repository's contributors/languages/tags/branches/collaborators.
GitHub.contributors('caseyscarborough','github')
GitHub.languages('caseyscarborough','github')
GitHub.tags('caseyscarborough','github')
GitHub.branches('caseyscarborough','github')
GitHub.collaborators('caseyscarborough','github')

# Get a specific branch from a repository (master shown below).
GitHub.branch('caseyscarborough','github','master')

# Add/remove collaborator from a repository.
client.add_collaborator('owner','repo-name','user-to-add')
client.remove_collaborator('owner','repo-name','user-to-remove')

# Subscribe/unsubscribe/star/unstar a repository.
client.subscribe('caseyscarborough','github')
client.unsubscribe('caseyscarborough','github')
client.star('caseyscarborough','github')
client.unstar('caseyscarborough','github')

# etc...
```

For a full list with descriptions, see the [Repos documentation](http://rdoc.info/gems/github_api_v3/GitHub/Client/Repos) for the gem.

#### Events

The following are some sample usages of the Events module.

```ruby
# Retrieve all events for a user.
GitHub.user_events('caseyscarborough')

# Retrieve all public events for a user.
GitHub.public_user_events('caseyscarborough')

# Retrieve all public GitHub events.
GitHub.public_events

# Retrieve all events for a repository.
GitHub.repo_events('owner','repo-name')

# Retrieve public events for an organization.
GitHub.organization_events('ruby')

# etc...
```

Check out the [Events documentation](http://rdoc.info/gems/github_api_v3/GitHub/Client/Events) for a comprehensive list of methods.

#### Gists

The following are sample uses for the Gists module.

```ruby
# Retrieve all gists for a user.
GitHub.gists('caseyscarborough')

# Retrieve all gists for the authenticated user.
client.gists

# Retrieve all public gists.
GitHub.gists

# Retrieve a gist by it's ID.
GitHub.gist(1234567)

# Create a new gist.
client.create_gist(
  # Hash of files to include.
  :files => { "file1.txt" => { :content => "File contents" } }, 
  :description => "Gist description.", 
  :public => "false"
)

# Check if a gist is starred.
client.gist_starred?(1234567)
# => true

# Star/unstar/fork/delete a gist
client.star_gist(1234567)
client.unstar_gist(1234567)
client.fork_gist(1234567)
client.delete_gist(1234567)

# etc...
```
Check out the [Gist documentation](http://rdoc.info/gems/github_api_v3/GitHub/Client/Gists) for more information.

#### Markdown

You can render any markdown test using the markdown method.

```ruby
# Render a string to markdown.
GitHub.markdown('# Markdown text!')

# Render a file's contents to markdown.
GitHub.markdown(File.read('markdown.md'))
```

#### Gitignore

You can retrieve .gitignore templates using the Gitignore API as well.

```ruby
# Retrieve a list of all available .gitignore templates.
GitHub.gitignore_list
# => ["Actionscript", "Android", "C", "C++", "CSharp"...]

# Retrieve a specific template.
GitHub.gitignore("Ruby")
# => {"name"=>"Ruby", "source"=>"*.gem\n*.rbc\n.bundle...}
```

#### Authorizations

The Authorizations OAuth API requires that a user use _basic authentication_. This means that you'll need to instantiate a client using your username and password, as opposed to the username and access token. You'll then be able to use the Authorizations API methods on  that client. See below:

```ruby
client = GitHub.client(:login => 'username', :password => 'password')

# List your authorizations.
client.authorizations

# Retrieve a single authorization by its ID.
client.authorization(123)

# Create a new authorization.
client.create_authorization(
  :note => 'New authorization',
  # The authorized applications ID and secret
  :client_id => 'ab0487b031b18f9286a6',
  :client_secret => '9d667c2b7fae7a329f32b6df17926154'
)

# Update an existing authorization.
client.update_authorization(
  123, # The authorization's ID.
  :note => 'Updated authorization',
  :note_url => 'http://anyrandomurl.com'
)

# Delete an authorization by it's ID.
client.delete_authorization(123)
```

For a full overview of the Authorizations API check out the [OAuth documentation](http://rdoc.info/gems/github_api_v3/GitHub/Client/OAuth).

#### Contents API

The Contents API methods are used to retrieve, create, update, and delete files in a repository. File contents that are retrieved are Base64 encoded. Some example methods are shown below:

```ruby
# Get the contents of the README file.
GitHub.contents('caseyscarborough', 'github')

# Retrieve the contents of a file or directory.
GitHub.contents(
  'caseyscarborough', # Repository owner.
  'github',           # Repository name.
  'lib',              # File/directory path. Defaults to the root of repository.
  'master'            # Reference or branch. Defaults to master.
)

# Create a new file.
client.create_file(
  'caseyscarborough',                    # Repository owner.
  'github',                              # Repository name.
  :path      => 'lib/new_file.txt',      # Path to file.
  :message   => 'Add lib/new_file.txt.', # Commit message.
  :content   => 'This is a test file.',  # File contents.
  :committer => { :name => 'Casey Scarborough', :email => 'casey@example.com' }
)

# Update an existing file.
client.update_file(
  'caseyscarborough',                          # Repository owner.
  'github',                                    # Repository name.
  :path      => 'lib/update_file.txt',         # File path.
  :message   => 'Update lib/update_file.txt.', # Commit message.
  :content   => 'This is a test file.',        # New file contents.
  :sha       => '329688480d39049927147c162b9d2deaf885005f', # SHA of file.
  :committer => { :name => 'Casey Scarborough', :email => 'casey@example.com' }
)

# Delete an existing file.
client.delete_file(
  'caseyscarborough',                        # Repository owner.
  'github',                                  # Repository name.
  :path      => 'lib/delete_me.txt',         # File path.
  :message   => 'Delete lib/delete_me.txt.', # Commit message.
  :sha       => '329688480d39049927147c162b9d2deaf885005f', # SHA of file.
  :committer => { :name => 'Casey Scarborough', :email => 'casey@example.com' }
)
```

As you can see, the Commits API methods are not as intuitive as the rest of the API, so the [documentation](http://rdoc.info/gems/github_api_v3/GitHub/Client/Contents) is very useful.

#### Conclusion

And if you've made it this far, you can check out the last method to get a little piece of random wisdom from GitHub.

```ruby
GitHub.octocat
# =>
          "MMM.           .MMM
           MMMMMMMMMMMMMMMMMMM
           MMMMMMMMMMMMMMMMMMM      _____________________
          MMMMMMMMMMMMMMMMMMMMM    |                     |
         MMMMMMMMMMMMMMMMMMMMMMM   | Design for failure. |
        MMMMMMMMMMMMMMMMMMMMMMMM   |_   _________________|
        MMMM::- -:::::::- -::MMMM    |/
         MM~:~   ~:::::~   ~:~MM
    .. MMMMM::. .:::+:::. .::MMMMM ..
          .MM::::: ._. :::::MM.
             MMMM;:::::;MMMM
      -MM        MMMMMMM
      ^  M+     MMMMMMMMM
          MMMMMMM MM MM MM
               MM MM MM MM
               MM MM MM MM
            .~~MM~MM~MM~MM~~.
         ~~~~MM:~MM~~~MM~:MM~~~~
        ~~~~~~==~==~~~==~==~~~~~~
         ~~~~~~==~==~==~==~~~~~~
             :~==~==~==~==~~"

# Or create your own wisdom.
GitHub.octocat('Wisdom.')
```

## Supported Ruby Versions

Currently these are the supported Ruby versions:

* Ruby 1.9.2
* Ruby 1.9.3
* Ruby 2.0.0

## To Do

Any functionality of the API listed at [developer.github.com](http://developer.github.com/) that hasn't currently been implemented.

Some main missing functionality:

* A good bit of the [Repos API](http://developer.github.com/v3/repos/), such as:
  * Hooks
  * Forks
  * Keys
  * Downloads
  * etc.

* Add support for Ruby 1.8.7.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
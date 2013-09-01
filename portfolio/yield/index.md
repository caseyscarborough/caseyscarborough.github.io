---
layout: project
title: Projects &middot; Yield Gem
---

# Yield

<i class="icon-cloud-download"></i> <a href="https://github.com/caseyscarborough/yield/zipball/master">Download .zip</a> &nbsp; 
<i class="icon-cloud-download"></i> <a href="https://github.com/caseyscarborough/yield/tarball/master">Download .tar.gz</a> &nbsp; 
<i class="icon-github"></i> <a href="https://github.com/caseyscarborough/yield">View on GitHub</a>

[![Gem Version](https://badge.fury.io/rb/yield.png)](http://badge.fury.io/rb/yield) [![Code Climate](https://codeclimate.com/github/caseyscarborough/yield.png)](https://codeclimate.com/github/caseyscarborough/yield)

Yield is a command line utility that generates a preview of README.md and markdown files using GitHub Flavored Markdown in your browser. It parses your markdown files using [GitHub's Markdown API](http://developer.github.com/v3/markdown/), so you can preview it exactly how it will look on GitHub.

## Installation

### Dependencies

* [Ruby v1.9.3](http://www.ruby-lang.org/en/) or greater
* [sinatra](http://sinatrarb.com)
* [launchy](https://github.com/copiousfreetime/launchy)

Install the gem by issuing the following command:

```bash
$ gem install yield
```

This will also install any necessary dependencies for the gem that are not currently installed.

## Usage

From the root of your project, or any folder containing a README.md file, run the following command:

```bash
$ yield
=* Yield is serving your markdown at http://localhost:4000/
```

You may also specify a path to a markdown file you'd like to render, such as:

```bash
# Render a specific file
$ yield UPDATES.md
```

Then navigate to [localhost:4000](http://localhost:4000) in your browser to view the preview of the file. You can stop the server by pressing Control+C.

Yield also supports relative URLs in the same directory, so you can preview other files by navigating to them in the URL bar. For example, you can preview the CHANGELOG.md file by navigating to [localhost:4000/CHANGELOG.md](http://localhost:4000/CHANGELOG.md).

Finally, you can specify the port for the server to run on using the `-p` or `--port` option:

```bash
# Run the server on port 8080
$ yield -p 8080
```

## Potential Errors

### OpenSSL Error

You may receive the following OpenSSL error after navigating to [localhost:4000](http://localhost:4000) on Mac OS X 10.8.

```
OpenSSL::SSL::SSLError at /
SSL_connect returned=1 errno=0 state=SSLv3 read server key exchange B: bad ecpoint
```

This error seems to be cause by a hosed installation of OpenSSL on the system. You can resolve this error by running the following commands:

```bash
$ brew install openssl
$ brew link openssl --force
$ rvm reinstall 2.0.0 --with-gcc=gcc
```

If this does not work for you, see the following links, which address the same issue:

* [How to install Ruby 2.0.0 with RVM on OSX 10.8 Mountain Lion](http://scottyv.me/2013/03/How-to-install-ruby-2-0-0-on-OSX-Mountain-Lion/)
* [“bad ecpoint” SSL error on fresh RVM Ruby 1.9.3 install on OSX Mountain Lion](http://stackoverflow.com/questions/15672133/bad-ecpoint-ssl-error-on-fresh-rvm-ruby-1-9-3-install-on-osx-mountain-lion)

### Windows OpenSSL Error

If you receive an OpenSSL "certificate verify failed" error on Windows after launching the gem, the following steps will fix the issue.

1. Download [http://curl.haxx.se/ca/cacert.pem](http://curl.haxx.se/ca/cacert.pem) and save it to C:\cacert.pem.
2. Go to Computer -> Advanced Settings -> Environment Variables and create a new System Variable:<br />
  **Variable**: SSL\_CERT\_FILE<br />
  **Value**: C:\cacert.pem.
4. Restart all command prompt windows and reissue the `yield` command.  

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
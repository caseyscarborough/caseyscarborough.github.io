---
layout: post
title:  "Dead Simple XML and JSON Parsing in Ruby"
date:   2013-08-03 00:28:00
categories: [programming, ruby]
---

Parsing large or complicated XML or JSON files is never fun, and just plain sucks. There are quite a few options for parsing XML or JSON in Ruby, such as [REXML](http://www.germane-software.com/software/rexml/) or [Nokogiri](http://nokogiri.org/) for XML, and [JSON](http://www.ruby-doc.org/stdlib-2.0/libdoc/json/rdoc/JSON.html) in Ruby's Standard Library, none of which are very spectacular. I recently stumbled on the rubygem [Crack](https://github.com/jnunemaker/crack), which is a combination of the JSON parser for Rails and the XML parser for Merb, combined and managed by GitHub user [jnunemaker](https://github.com/jnunemaker). This little gem will parse any XML or JSON, returning the result as a Ruby hash. This is much nicer and cleaner than the other options in my opinion (mainly XML), that return the result as an odd structure that is usually annoying to find your way through.

Take the following XML for an example:

```xml
<menu>
  <food>
    <name>Waffles</name>
    <price>5.95</price>
  </food>
  <food>
    <name>French Toast</name>
    <price>4.50</price>
  </food>
</menu>
```

And it's equivalent JSON:

```json
{
  "menu": {
    "food": [
      {
        "name": "Waffles",
        "price": "5.95"
      },
      {
        "name": "French Toast",
        "price": "4.50"
      }
    ]
  }
}
```

These XML and JSON files can be parsed and the result returned as a Ruby hash with the following code:

```ruby
require 'crack' # XML and JSON parsingrequire 'crack/json' # Only JSON parsing
require 'crack/xml' # Only XML parsing

response = Crack::XML.parse(File.read('food.xml'))
# => {"menu"=>{"food"=>[{"name"=>"Waffles", "price"=>"5.95"}, {"name"=>"French Toast", "price"=>"4.50"}]}}

response = Crack::JSON.parse(File.read('food.json'))
# => {"menu"=>{"food"=>[{"name"=>"Waffles", "price"=>"5.95"}, {"name"=>"French Toast", "price"=>"4.50"}]}}
```

These examples are obviously simple for the sake of this post, but this gem makes life so much simpler when parsing larger and more complicated XML or JSON.

You can install the [Crack](https://github.com/jnunemaker/crack) gem by issuing the following command:

```bash
gem install crack
```

### Resources

[Crack Documentation](http://rdoc.info/github/jnunemaker/crack)<br />
[Crack Source on GitHub](https://github.com/jnunemaker/crack)<br />
[JSON Std-Lib Documentation](http://www.ruby-doc.org/stdlib-2.0/libdoc/json/rdoc/JSON.html)
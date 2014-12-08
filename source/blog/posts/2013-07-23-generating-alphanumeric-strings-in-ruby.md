---
layout: post
title:  "Generating Alphanumeric Strings in Ruby"
date:   2013-07-23 10:41:00
categories: [programming, ruby]
---

In multiple projects I've worked on, I've occasionally had the need to generate a random alphanumeric string
using Ruby. There are multiple ways to do this, but my [previous post](/blog/2013/07/22/benchmarking-your-ruby-code/) on benchmarking led me to question the efficiency of how I'd been doing it. In this post, I'll show and 
explain a few different methods, as well as benchmark them and give the results. The methods in this post are
not completely conclusive on ways to generate strings, just a few that I've come up with.

These methods output strings with uppercase and lowercase letters, as well as numbers. See the following example:

```
rR5clIDfNV6nNsS1jp4pkaJbF9rSiUxMVwoKHTtLqaxGeioY5qJuvYVjxJzOVRjElXoGQ9ZCY04Lif0yQAd9C
```

### Method 1

The first method is the method I have been using for quite some time to generate random strings in
Ruby.

```ruby
range = [('0'..'9'),('A'..'Z'),('a'..'z')].map{ |i| i.to_a }.flatten(0...100).map{ range[rand(range.length)] }.join
```

This method seems a little complex compared to the others as you'll see, but is not that complicated
when broken down. The first line creates an array of characters including a-z, A-Z, and 0-9. Then,
line 2 selects a random character from the array 100 times and joins them all as a string using 
[`Array#join`](http://www.ruby-doc.org/core-2.0/Array.html#method-i-join).

### Method 2

The second method is the same as method 1, but uses the [`Array#sample`](http://www.ruby-doc.org/core-2.0/Array.html#method-i-sample) method to retrieve a random
item from the array.

```ruby
range = [('0'..'9'),('A'..'Z'),('a'..'z')].map{ |i| i.to_a }.flatten(0...100).map{ range.sample }.join
```

I decided to test this one along with method 1 to see the performance difference between `Array#sample`
and calculating the random number.

### Method 3

The third method is by far the simplest and easiest to read.

```ruby
range = [*'0'..'9',*'A'..'Z',*'a'..'z']Array.new(100){ range.sample }.join
```

This creates a range array using the ranges from before as well as the splat operator (that is, `*`). If you haven't seen this before, the splat operator creates a list of the items that would otherwise be an array, turning `*0..9` into `0, 1, 2, 3...` etc.
Then new array of size 100 is created with all random items pulled from the array, then joined together
as a string.

### Method 4

This is the same method as above, but using the `map` method as opposed to `Array#new`.

```ruby
range = [*'0'..'9',*'A'..'Z',*'a'..'z'](0...100).map{ range.sample }.join
```

### Method 5

The last method may be a little harder to decipher at first.

```ruby
range = ((48..57).to_a+(65..90).to_a+(97..122).to_a).map{ |i| i.chr }Array.new(100){ range.sample }.join
```

This method creates an array of integers that map to the ASCII values for 0-9, A-Z, and a-z, respectively, and each integer is converted into its ASCII character.
The array is then 'sampled' 100 times and joined as a string.

### On to Testing

Now to test the methods using the `Benchmark` module. You can certainly do this manually, but it's not
really necessary to re-invent the wheel. Here is the code I've written up to test the methods on generating
a random string of length 50,000,000:

```ruby
require 'benchmark'
n = 50_000_000

puts "\nGenerating random string of length #{n}:"

Benchmark.bm(9) do |x|
  x.report('Method 1: ') do
    range = [('a'..'z'),('A'..'Z'),('0'..'9')].map{ |i| i.to_a }.flatten
    (0...n).map{ range[rand(range.length)] }.join
  end

  x.report('Method 2: ') do
    range = [('a'..'z'),('A'..'Z'),('0'..'9')].map{ |i| i.to_a }.flatten
    (0...n).map{ range.sample }.join
  end

  x.report('Method 3: ') do
    range = [*'0'..'9',*'A'..'Z',*'a'..'z']
    Array.new(n){ range.sample }.join
  end

  x.report('Method 4: ') do
    range = [*'0'..'9',*'A'..'Z',*'a'..'z']
    (0...n).map{ range.sample }.join
  end

  x.report('Method 5: ') do
    range = ((48..57).to_a+(65..90).to_a+(97..122).to_a).map{ |i| i.chr }
    Array.new(n){ range.sample }.join
  end
end
```

Running this code should go through the benchmark process for each number. You should
receive an output similar to the following:

```
Generating random string of length 50000000:
                user     system      total        real
Method 1:  14.040000   0.210000  14.250000 ( 15.237528)
Method 2:   8.450000   0.160000   8.610000 (  8.625237)
Method 3:   7.260000   0.130000   7.390000 (  7.385367)
Method 4:   8.630000   0.340000   8.970000 (  9.063325)
Method 5:   7.300000   0.190000   7.490000 (  7.879254)
```

This shows you the output of each test with the user CPU time, the system CPU time,
the sum of the two, and the real time. The column we are most interested in is the
real time, or the far right column.

### The Verdict

After running the tests, it's pretty easy to see that method 3 is the quickest, generating a 50,000,000 character long random string in just over 7 seconds on my machine. 

```
Generating random string of length 50,000,000:
Method 3:  7.39s
Method 5:  7.88s
Method 2:  8.63s
Method 4:  9.06s
Method 1: 15.24s
```

These results were pretty surprising to me, as the method I've been using for quite some time actually came out to be the slowest. It's easy to see that this was caused by generating a random number for each character of the string, meaning that using [`Array#sample`](http://www.ruby-doc.org/core-2.0/Array.html#method-i-sample) gives us a nice bit of efficiency. Also, it seems that using `Array.new(n)` is a little quicker than `(0...n).map`, as shown in the ~1.6s difference between methods 3 and 4.
In conclusion, if you'd like to generate a large alphanumeric string with performance in mind, your best bet is to use Method 3, shown below:

```ruby
range = [*'0'..'9',*'A'..'Z',*'a'..'z']Array.new(n){ range.sample }.join
```

Keep in mind with these methods that the time differences are pretty negligible unless you are generating a string of length greater than 100,000, and that your results may vary.

It is also worth mentioning the [`SecureRandom`](http://www.ruby-doc.org/stdlib-2.0/libdoc/securerandom/rdoc/SecureRandom.html) module in Ruby handles secure random generation much quicker than these methods.

### Resources

[Ruby `Array` Documentation](http://ruby-doc.org/core-2.0/Array.html)<br />
[Ruby `Benchmark` Documentation](http://ruby-doc.org/stdlib-1.9.3/libdoc/benchmark/rdoc/Benchmark.html)<br />
[Ruby `SecureRandom` Documentation](http://ruby-doc.org/stdlib-2.0/libdoc/securerandom/rdoc/SecureRandom.html)

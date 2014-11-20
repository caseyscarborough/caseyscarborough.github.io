---
layout: post
title:  "Benchmarking Your Ruby Code"
date:   2013-07-22 18:45:00
categories: [programming, ruby]
---

There will more than likely come a time where you'll want to benchmark a piece of code that you've written, or you'd like to make it faster. Ruby comes packed with a module in its standard library that is built for benchmarking your code. The module is intuitively named `Benchmark`, and I'm going to go through a few examples of using it.

The first and simplest way to benchmark a piece of Ruby code is to use the `Benchmark#measure` method.

<pre><code class="ruby">require 'benchmark'

puts Benchmark.measure { 50_000.downto(1).inject(:*) }
</code></pre>

This line will determine the amount of time to calculate 50,000 factorial on your machine. After running this, you should get an output similar to the following:

<pre><code class="no-highlight">1.690000   0.020000   1.710000 (  1.707248)</code></pre>

This shows the amount of user CPU time, system CPU time, the sum of the user and system CPU times, and the elapsed real time in seconds. Generally, you'll want to take a look at the far right number, as this shows the amount of time taken to perform the operation.
<br />


### Benchmarking with Reports

Using the `Benchmark#measure` method is good for a quick benchmark on a simple piece of code, but typically you'll want to run multiple tests and compare the results. You can do this using the `Benchmark#bm` method.

<pre><code class="ruby">require 'benchmark'

Benchmark.bm do |x|
  x.report { (1..6).reduce(:*) }
  x.report { 1.upto(6).inject(:*) }
  x.report { 6.downto(1).inject(:*) }
end
</code></pre>

This will compare the multiple ways to calculate 50,000 factorial. You should receive an output similar to the following:

<pre><code class="no-highlight">       user     system      total        real
   1.110000   0.010000   1.120000 (  1.119566)
   1.050000   0.000000   1.050000 (  1.061835)
   1.150000   0.010000   1.160000 (  1.148309)
</code></pre>

You can also create labels with the `Benchmark#bm` method to create a more readable output.

<pre><code class="ruby">require 'benchmark'

Benchmark.bm(7) do |x|
  x.report('range:')  { (1..6).reduce(:*) }
  x.report('upto:')   { 1.upto(6).inject(:*) }
  x.report('downto:') { 6.downto(1).inject(:*) }
end
</code></pre>

This will give you the following format for your output:

<pre><code class="no-highlight">              user     system      total        real
range:    1.100000   0.000000   1.100000 (  1.103561)
upto:     1.060000   0.010000   1.070000 (  1.061857)
downto:   1.160000   0.010000   1.170000 (  1.173509)
</code></pre>
<br />


### Combatting Garbage Collection

Your benchmarks will likely differ for each run due to memory allocation costs and garbage collection. To combat this, the `Benchmark` library contains a method called `bmbm` which runs the test multiple times. Using the example from the documentation, you can see the differences between the benchmarks:

<pre><code class="ruby">require 'benchmark'

# Create an array of 1,000,000 random digits
array = (1..1000000).map { rand }

Benchmark.bmbm do |x|
  # Output the benchmark for sorting (destructive and non-destructive) the array
  x.report("sort!") { array.dup.sort! }
  x.report("sort")  { array.dup.sort  }
end
</code></pre>

Your result should be similar to the following:

<pre><code class="no-highlight">Rehearsal -----------------------------------------
sort!   1.090000   0.000000   1.090000 (  1.098318)
sort    1.090000   0.010000   1.100000 (  1.099114)
-------------------------------- total: 2.190000sec

            user     system      total        real
sort!   1.080000   0.000000   1.080000 (  1.082621)
sort    1.090000   0.000000   1.090000 (  1.084570)
</code></pre>

This will give you a more accurate representation of your benchmarks.
<br />


### Resources

[Benchmark Documentation](http://www.ruby-doc.org/stdlib-1.9.3/libdoc/benchmark/rdoc/Benchmark.html)
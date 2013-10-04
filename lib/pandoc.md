% Compiling Beautiful Documents with Pandoc
% By Casey Scarborough
% October 3, 2013

# Introduction

I was recently introduced to a remarkable tool called [Pandoc](http://johnmacfarlane.net/pandoc/). If you haven't heard of this yet, it can greatly expand your documentation formats and abilities. It essentially is a tool to convert markup from one format to another, and it supports hundreds of combinations of formats. A (large) diagram is available [here](http://johnmacfarlane.net/pandoc/diagram.png) that displays all of the different available format conversions.

In this post, I'd like to walk through installing Pandoc and compiling a document.

# Installing Pandoc

To install Pandoc, begin by visiting the [Downloads](http://johnmacfarlane.net/pandoc/installing.html) page on the project's homepage. You'll need to install the version of Pandoc that is compatible with your operating system, as well as a compatible version of LaTeX.

After the installation, you should be able to execute the following command in your terminal:

```bash
$ pandoc --version
```

If Pandoc is properly installed, then you'll receive a message with the version that you've installed, along with some other useful information.

# Starting a Document

Pandoc has support for many different formats, but I've found writing documents using [Markdown](http://en.wikipedia.org/wiki/Markdown) and converting them to the format you require makes life quite easy. Open up your favorite text editor and add the following to it.

```
% Getting Started with Pandoc
% Oct. 3, 2013

This is a test of [Pandoc](http://johnmacfarlane.net/pandoc/).

## Second level header

* This is a bulleted list.
  - item a
  - item b

### Third level header

> _Wow, this is awesome!_

Pandoc is the __greatest__.
```

Save the file as `pandoc_test.md` in the directory of your choice, and fire up the terminal. `cd` to the folder containing your markdown file and issue the following command:

```bash
$ pandoc pandoc_test.md -o pandoc_test.pdf
```

This will generate a PDF of the previously written `pandoc_test.md` markdown file in the same directory. This is the general output for any format that you'd like to convert to.

# Useful Options

Pandoc has a [ton of options](http://johnmacfarlane.net/pandoc/README.html#options), but here are a few that I've found useful:

* `--toc`: Generates a table of contents at the beginning of the document
* `--latex-engine`: Specifies the LaTeX engine of your choice such as `xelatex`, `lualatex`, or `pdflatex` (default).
* `--variable mainfont=`: Specifies the main font to use. Requires `xelatex` or `lualatex` engine.
* `--variable geometry:margin=1in`: Manually set the margin widths.

Click [here](http://caseyscarborough.com/lib/pandoc.pdf) to check out this post compiled to a PDF using Pandoc and [the corresponding markdown](http://caseyscarborough.com/lib/pandoc.md).
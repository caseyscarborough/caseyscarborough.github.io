---
layout: project
title: Projects &middot; libcrypt
---

# libcrypt

<i class="icon-cloud-download"></i> <a href="https://github.com/caseyscarborough/libcrypt/zipball/master">Download .zip</a> &nbsp; 
<i class="icon-cloud-download"></i> <a href="https://github.com/caseyscarborough/libcrypt/tarball/master">Download .tar.gz</a> &nbsp; 
<i class="icon-github"></i> <a href="https://github.com/caseyscarborough/libcrypt">View on GitHub</a>

libcrypt is a simple library used for encryption, hashing, and encoding in C. It is currently a work in progress.

## Using the Library

To use the library, include the [`crypt.h`](https://github.com/caseyscarborough/libcrypt/blob/master/crypt.h) and [`crypt.c`](https://github.com/caseyscarborough/libcrypt/blob/master/crypt.c) files in your project. Then, include the [`crypt.h`](https://github.com/caseyscarborough/libcrypt/blob/master/crypt.h) file at the top of each file you'd like to use it's methods in. See [`test.c`](https://github.com/caseyscarborough/libcrypt/blob/master/test.c) for example usage.

To run the test file or the Base64 converter, run `make` from the project directory.

### Base64 Converter

Included in this library is a Base64 file converter utility, located in the file [`b64.c`](https://github.com/caseyscarborough/libcrypt/blob/master/b64.c). This utility will convert the contents of a file to or from Base64 encoded data.

```bash
# Build the executables
make

# Encode a file
./b64 -e input.txt output.txt

# Decode a file
./b64 -e encoded.txt decoded.txt

# Print the help menu
./b64 -h
```

## Methods

The following methods are available in the [libcrypt](https://github.com/caseyscarborough/libcrypt) library. _Note that these methods return pre-allocated blocks of memory, and it is up to the user of the method to free the memory after use (shown below)._

#### rot13

This method encodes a string of text using the [ROT13](http://en.wikipedia.org/wiki/ROT13) cipher.

```c
char *text = "The Quick Brown Fox Jumps Over The Lazy Dog.";
char *rot13_encoded_text = rot13(text);

printf("%s\n", rot13_encoded_text);
// Outputs: ur Dhvpx Oebja Sbk Whzcf Bire Gur Ynml Qbt.

free(rot13_encoded_text);
```

#### rot47

This method encodes a string of text using the [ROT47](http://en.wikipedia.org/wiki/ROT47#Variants) cipher.

```c
char *text = "The Quick Brown Fox Jumps Over The Lazy Dog.";
char *rot47_encoded_text = rot13(text);

printf("%s\n", rot47_encoded_text);
// Outputs: %96 "F:4< qC@H? u@I yF>AD ~G6C %96 {2KJ s@8]

free(rot47_encoded_text);
```

#### base64_encode

This method encodes text using the [Base64](http://en.wikipedia.org/wiki/Base64) encoding scheme.

```c
char *text = "The Quick Brown Fox Jumps Over The Lazy Dog.";
char *base64_encoded_text = base64_encode(text);
printf("%s\n", base64_encoded_text);
// Outputs: VGhlIFF1aWNrIEJyb3duIEZveCBKdW1wcyBPdmVyIFRoZSBMYXp5IERvZy4=

free(base64_encoded_text);
```

#### base64_decode

This method decodes [Base64](http://en.wikipedia.org/wiki/Base64) encoded text.

```c
char *text = "VGhpcyBpcyBzb21lIGR1bW15IHRleHQgdG8gYmUgZW5jb2RlZCBhbmQgZGVjb2RlZC4=";
char *base64_decoded_text = base64_decode(text);
printf("%s\n", base64_decoded_text);
// Outputs: This is some dummy text to be encoded and decoded.

free(base64_decoded_text);
```
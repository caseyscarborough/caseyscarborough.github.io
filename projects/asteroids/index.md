---
layout: project
title: Projects &middot; Asteroids
group: Portfolio
---

Asteroids in Java
=================

<i class="icon-cloud-download"></i> <a href="https://github.com/caseyscarborough/j-asteroids/zipball/master">Download .zip</a> &nbsp; 
<i class="icon-cloud-download"></i> <a href="https://github.com/caseyscarborough/j-asteroids/tarball/master">Download .tar.gz</a> &nbsp; 
<i class="icon-github"></i> <a href="https://github.com/caseyscarborough/j-asteroids">View on GitHub</a>

This is an bare bones implementation of the classic Asteroids video arcade game using the Java programming language.

The game is a simple black screen with asteroids that float around. The objective of the game is to fly your space ship around the screen without getting hit by any asteroids while at the same time shooting as many asteroids as possible and accumulating points.

![alt text][screenshot]

The technical documentation for the game can be viewed [here][documentation].

Controls
--------

The following are the controls in the game:

- W: Forward (Accelerate)
- A: Rotate Counter-clockwise
- S: Reverse (Slow down)
- D: Rotate Clockwise
- E: Stop the ship at the current location
- Enter: Fire lasers

Scoring System
--------------

The player is able to accumulate score by destroying asteroids during gameplay. Each asteroid destroyed earns the player 10 points. If the player's ship is hit by an asteroid, the player will return to the starting position and lose 10 points.

After destroying all asteroids, the player will receive a final score and some statistics about the game such as total shots fired, asteroids destroyed, times ship exploded, and accuracy. The player can then exit the game using the exit button.

Running the Game
----------------

Included in the repository is a .jar executable file. It contains the game in its currently developed state. This can be run from the command line by using the following command:

<pre class="highlight"><code class="bash"><span class="dollar">$</span> java -jar asteroids.jar</code></pre>

[documentation]: http://caseyscarborough.github.com/j-asteroids/doc/
[screenshot]: https://github.com/caseyscarborough/j-asteroids/raw/master/resources/img/1.png "The game's main layout."
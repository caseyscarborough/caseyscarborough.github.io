//= require jquery
//= require bootstrap-sprockets
//= require vendor/mustache.min
//= require vendor/jquery.validate.min
//= require vendor/highlight.min
//= require github-activity

$(function() {
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-43691924-1', 'caseyscarborough.com');
  ga('send', 'pageview');

  hljs.initHighlightingOnLoad();
});
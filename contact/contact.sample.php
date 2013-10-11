<?php

  if (isset($_POST['name'])) {
    // Retrieve params from the form
    $name = strip_tags($_POST['name']);
    $email = strip_tags($_POST['email']);
    $message = strip_tags($_POST['message']);
  } else {
    echo "Oops! You've reached this page in error.";
    exit;
  }
  
  // Set the destination address and subject
  $to = "user@example.com";
  $subject = "Contact from: $name";
  
  // Build the message body
  $body = "You've received a new message from <i>$name</i> from your contact form!<br><br>";
  $body .= "Here is the message:<br><br><i>$message</i><br><br>";
  $body .= "You may reply to this user at <a href=\"mailto:$email\">$email</a>.";
  
  // Set the headers and allow HTML
  $headers = "From: $email\r\n";
  $headers .= "Reply-To: $email\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
  
  // Check if email contains any injection
  if(IsInjected($email)) {
    echo "Bad email value!";
    exit;
  }

  // Mail that shit!
  mail($to, $subject, $body, $headers);
  
  function IsInjected($str) {
    $injections = array('(\n+)','(\r+)','(\t+)','(%0A+)','(%0D+)','(%08+)','(%09+)');  
    $inject = join('|', $injections);
    $inject = "/$inject/i";
     
    if(preg_match($inject,$str)) {
      return true;
    } else {
      return false;
    }
  }
?> 
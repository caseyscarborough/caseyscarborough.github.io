<?php

  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];
  
  $email_subject = "Contact from: $name";
  $email_body = "Here is the message:\n$message\n\nYou may reply to this user at $email.";
 
  $to = "user@example.com";
  $headers = "You've received a new message from $name from your contact me form!\r\n";
  $headers .= "From: <$email>";
 
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
   
  if(IsInjected($email)) {
      echo "Bad email value!";
      exit;
  }

  mail($to,$email_subject,$email_body,$headers);
  
?> 
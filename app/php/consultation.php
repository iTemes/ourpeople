<?php
   require_once('testInput.php');

   // data sent in header are in JSON format
   header('Content-Type: application/json');
   // takes the value from variables and Post the data
   $name = test_input($_POST['name']);
   $phone = test_input($_POST['phone']);
   $comment = test_input($_POST['comment']);  
   $to = "itemes@mail.ru";
   $subject = "Заявка на консультацию";
   $email = "info@cvoiludi.ru"
   // Email Template
   $message = "<b> Клиент : </b>". $name ."<br>";
   $message .= "<b>Номер телефона : </b>".$phone ."<br>";
   $message .= "<b>Комментарий : </b>".$comment ."<br>";

   $header = "From:"+$email+" \r\n";
   $header .= "MIME-Version: 1.0\r\n";
   $header .= "Content-type: text/html\r\n";
   $retval = mail ($to,$subject,$message,$header);
   // message Notification
   if( $retval == true ) {
      echo json_encode(array(
         'success'=> true,
         'message' => 'Message sent successfully'
      ));
   }else {
      echo json_encode(array(
         'error'=> true,
         'message' => 'Error sending message'
      ));
   }
?>
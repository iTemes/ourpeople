<?php
   ini_set('display_errors', 1);
   // require_once __DIR__ . '/testInput.php';

   // data sent in header are in JSON format
   header('Content-Type: application/json');
   // takes the value from variables and Post the data
   $name = test_input($_POST['name']);
   $phone = test_input($_POST['phone']);
   $comment = test_input($_POST['comment']);  
   $to = "martyn_1987@mail.ru";
   $subject = "Заявка на консультацию";
   $email = "info@cvoiludi.ru";
   // Email Template
   $message = "<b>Клиент : </b>". $name ."<br>";
   $message .= "<b>Номер телефона : </b>". $phone ."<br>";
   $message .= "<b>Комментарий : </b>". $comment ."<br>";

   // Для отправки HTML-письма должен быть установлен заголовок Content-type
   $headers  = 'MIME-Version: 1.0' . "\n" . 
      'Content-type: text/html; charset=iso-8859-1' . "\n" .
      'From: info@cvoiludi.ru' . "\n" . 
      'X-Mailer: PHP/' . phpversion();

   $retval = mail ($to,$subject,$message,$headers);
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

   function test_input($data) {
      $data = trim($data);
      $data = stripslashes($data);
      $data = htmlspecialchars($data);
      return $data;
  }
?>
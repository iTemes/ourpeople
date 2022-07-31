<?php
   ini_set('display_errors', 1);

   // data sent in header are in JSON format
   header('Content-Type: application/json');
   // takes the value from variables and Post the data
   $name = test_input($_POST['name']);
   $phone = test_input($_POST['phone']);
   $address = test_input($_POST['address']);
   $floor = test_input($_POST['floor']);
   $square = test_input($_POST['square']);
   $rooms = test_input($_POST['rooms']);
   $sail = test_input($_POST['sail']);
   $rent = test_input($_POST['rent']);
   $repair = test_input($_POST['repair']);

   $to = "itemes@mail.ru";
   $subject = "Заявка на  продажу и аренду";
   $email = "info@cvoiludi.ru";
   // Email Template
   $message = "<b>Клиент : </b>". $name ."<br>";
   $message .= "<b>Номер телефона : </b>". $phone ."<br>";
   $message .= "<b>Адрес : </b>". $address ."<br>";
   $message .= "<b>Этаж : </b>". $floor ."<br>";
   $message .= "<b>Площадь : </b>". $square ."<br>";
   $message .= "<b>Колличество комнат : </b>". $rooms ."<br>";
   $message .= "<b>Продажа : </b>". $sail ."<br>";
   $message .= "<b>Аренда : </b>". $rent ."<br>";
   $message .= "<b>Ремонта : </b>". $repair ."<br>";

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
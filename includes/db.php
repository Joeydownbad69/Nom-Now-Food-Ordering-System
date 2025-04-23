<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "nomnow"; // or your actual DB name

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>

<?php
session_start();
include '../db_connect.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Fetch user from database
    $query = "SELECT * FROM customers WHERE email = '$email'";
    $result = $conn->query($query);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password_hash'])) {
            $_SESSION['customer_id'] = $user['customer_id'];
            header("Location: ../dashboard/customer_dashboard.php");
        } else {
            echo "Invalid password!";
        }
    } else {
        echo "No such user found!";
    }
}
?>

<form method="POST">
    Email: <input type="email" name="email" required>
    Password: <input type="password" name="password" required>
    <input type="submit" value="Login">
</form>

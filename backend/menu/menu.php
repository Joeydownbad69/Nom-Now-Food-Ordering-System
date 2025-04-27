<?php
include '../db_connect.php';

$query = "SELECT * FROM menu_items";
$result = $conn->query($query);

echo "<h1>Menu</h1>";
while ($item = $result->fetch_assoc()) {
    echo "<div>";
    echo "<h3>" . $item['name'] . "</h3>";
    echo "<p>" . $item['description'] . "</p>";
    echo "<p>Price: $" . $item['price'] . "</p>";
    echo "</div>";
}
?>

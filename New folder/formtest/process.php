<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $age = trim($_POST['age']);
    $message = trim($_POST['message']);
    


    $file = fopen("submissions.txt", "a");

    // Write data to the file
    fwrite($file, "Name: $name\n");
    fwrite($file, "Email: $email\n");
    fwrite($file, "Age: $age\n");
    fwrite($file, "Message: $message\n");
    fwrite($file, "---------------------\n");

    fclose($file);

    echo "Form submitted successfully!";
} else {
    echo "Invalid submission.";
}
?>

<?php
// Start a session to manage user authentication
session_start();

// Replace with your actual user authentication logic
$username = $_POST['username'];
$password = $_POST['password'];

// Example: Check for a hardcoded username and password
if ($username === 'your_username' && $password === 'your_password') {
    // Save user information in the session
    $_SESSION['logged_in'] = true;
    $_SESSION['username'] = $username; // You can store other user information as needed

    // Redirect to the home page
    header('Location: HomeSheet.html'); // Change the URL to your home page
    exit();
} else {
    // Redirect back to the login page with an error message if login fails
    header('Location: login.html?error=1');
    exit();
}

?>

<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fname = $_POST["fname"];
    $lname = $_POST["lname"];
    $email = $_POST["email"];
    $telnumber = $_POST["telnumber"];
    $message = $_POST["message"];

    if (empty($fname) || empty($lname) || empty($email) || empty($message)) {
        $error = "All fields are required";
    } else {
        // Load existing JSON data
        $jsonFilePath = 'form_data.json';
        $existingData = file_get_contents($jsonFilePath);
        $formDataArray = json_decode($existingData, true);

        $newFormData = array(
            'fname' => $fname,
            'lname' => $lname,
            'email' => $email,
            'telnumber' => $telnumber,
            'message' => $message
        );

        $formDataArray[] = $newFormData;

        $jsonData = json_encode($formDataArray, JSON_PRETTY_PRINT);

        // Write the updated JSON data to the file
        if (file_put_contents($jsonFilePath, $jsonData)) {
            $success = "Form data has been successfully submitted!";
        } else {
            $error = "Failed to store form data. Please try again.";
        }
    }
}
?>

<?php

// send.php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $firstName = $_POST["firstName"];
    $lastName  = $_POST["lastName"];
    $email     = $_POST["email"];
    $mobile    = $_POST["mobile"];
    $subject   = $_POST["subject"];
    $message   = $_POST["message"];

    $to = "rishabdutt4@gmail.com";

    $mailSubject = "New Sponsorship Proposal Submission";

    $body = "
    <h2>New Sponsorship Form Submission</h2>

    <p><strong>First Name:</strong> $firstName</p>

    <p><strong>Last Name:</strong> $lastName</p>

    <p><strong>Email:</strong> $email</p>

    <p><strong>Mobile:</strong> $mobile</p>

    <p><strong>Subject:</strong> $subject</p>

    <p><strong>Message:</strong> $message</p>
    ";

    $headers  = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: <$email>" . "\r\n";

    if (mail($to, $mailSubject, $body, $headers)) {

        echo json_encode([
            "status" => "success",
            "message" => "Email sent successfully"
        ]);

    } else {

        echo json_encode([
            "status" => "error",
            "message" => "Email failed"
        ]);
    }

} else {

    echo json_encode([
        "status" => "error",
        "message" => "Invalid Request"
    ]);
}
?>
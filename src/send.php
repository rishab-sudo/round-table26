<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // FORM DATA
    $tablerName      = $_POST["tablerName"] ?? '';
    $tableNumber     = $_POST["tableNumber"] ?? '';
    $spouseName      = $_POST["spouseName"] ?? '';
    $circleNumber    = $_POST["circleNumber"] ?? '';
    $travellingKids  = $_POST["travellingKids"] ?? '';
    $childrenDetails = $_POST["childrenDetails"] ?? '';
    $travellingMaid  = $_POST["travellingMaid"] ?? '';
    $chairmanMessage = $_POST["chairmanMessage"] ?? '';

    // EMAIL
    $to = "rishabdutt4@gmail.com";

    $mailSubject = "New AAGM Jaipur 2026 Registration";

    // HTML BODY
    $body = "
    <html>
    <body style='font-family:Poppins,sans-serif;'>

        <h2 style='color:#25176e;'>
            New Delegate Registration
        </h2>

        <table cellpadding='10' cellspacing='0' border='1' 
        style='border-collapse:collapse;width:100%;'>

            <tr>
                <td><strong>Name of Tabler</strong></td>
                <td>$tablerName</td>
            </tr>

            <tr>
                <td><strong>Table Number</strong></td>
                <td>$tableNumber</td>
            </tr>

            <tr>
                <td><strong>Circler / Spouse Name</strong></td>
                <td>$spouseName</td>
            </tr>

            <tr>
                <td><strong>Circle Number</strong></td>
                <td>$circleNumber</td>
            </tr>

            <tr>
                <td><strong>Travelling With Kids</strong></td>
                <td>$travellingKids</td>
            </tr>

            <tr>
                <td><strong>Children Details</strong></td>
                <td>$childrenDetails</td>
            </tr>

            <tr>
                <td><strong>Travelling With Maid</strong></td>
                <td>$travellingMaid</td>
            </tr>

            <tr>
                <td><strong>Message For Area Chairman</strong></td>
                <td>$chairmanMessage</td>
            </tr>

        </table>

    </body>
    </html>
    ";

    // FILE DATA
    $fileTmpPath = $_FILES['image']['tmp_name'];
    $fileName    = $_FILES['image']['name'];
    $fileType    = $_FILES['image']['type'];

    $fileData = chunk_split(
        base64_encode(
            file_get_contents($fileTmpPath)
        )
    );

    $boundary = md5(time());

    // HEADERS
    $headers = "MIME-Version: 1.0\r\n";

    $headers .= "From: AAGM Jaipur <noreply@aagmjaipur.com>\r\n";

    $headers .= "Content-Type: multipart/mixed; boundary=\"".$boundary."\"\r\n";

    // MESSAGE BODY
    $message = "--".$boundary."\r\n";

    $message .= "Content-Type: text/html; charset=UTF-8\r\n";

    $message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";

    $message .= $body."\r\n";

    // ATTACHMENT
    $message .= "--".$boundary."\r\n";

    $message .= "Content-Type: ".$fileType."; name=\"".$fileName."\"\r\n";

    $message .= "Content-Disposition: attachment; filename=\"".$fileName."\"\r\n";

    $message .= "Content-Transfer-Encoding: base64\r\n\r\n";

    $message .= $fileData."\r\n";

    $message .= "--".$boundary."--";

    // SEND MAIL ONLY ONCE
    $mailSent = mail(
        $to,
        $mailSubject,
        $message,
        $headers
    );

    if ($mailSent) {

        echo json_encode([
            "status" => "success",
            "message" => "Registration submitted successfully"
        ]);

    } else {

        echo json_encode([
            "status" => "error",
            "message" => "Mail sending failed"
        ]);
    }

} else {

    echo json_encode([
        "status" => "error",
        "message" => "Invalid Request"
    ]);
}

?>
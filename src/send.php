```php
<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

/*
|--------------------------------------------------------------------------
| AAGM Jaipur 2026 Registration Mailer
| Receives:
| 1. Form Data
| 2. Couple Photo (image)
| 3. Payment Screenshot (paymentScreenshot)
|--------------------------------------------------------------------------
*/

if ($_SERVER["REQUEST_METHOD"] !== "POST") {

    echo json_encode([
        "status" => "error",
        "message" => "Invalid Request Method"
    ]);
    exit;
}

/* ==========================
   FORM DATA
========================== */

$tablerName      = trim($_POST["tablerName"] ?? "");
$tableNumber     = trim($_POST["tableNumber"] ?? "");
$spouseName      = trim($_POST["spouseName"] ?? "");
$circleNumber    = trim($_POST["circleNumber"] ?? "");
$travellingKids  = trim($_POST["travellingKids"] ?? "");
$noOfChildren    = trim($_POST["noOfChildren"] ?? "");
$child1Age       = trim($_POST["child1Age"] ?? "");
$child2Age       = trim($_POST["child2Age"] ?? "");
$child3Age       = trim($_POST["child3Age"] ?? "");
$travellingMaid  = trim($_POST["travellingMaid"] ?? "");
$chairmanMessage = trim($_POST["chairmanMessage"] ?? "");

/* ==========================
   EMAIL SETTINGS
========================== */

$to = "rishabdutt4@gmail.com";

$subject = "New AAGM Jaipur 2026 Registration";

/* ==========================
   EMAIL BODY
========================== */

$htmlBody = '
<html>
<head>
<meta charset="UTF-8">
</head>

<body style="font-family:Arial,sans-serif;background:#f7f7f7;padding:20px;">

<div style="
max-width:800px;
margin:auto;
background:#ffffff;
padding:25px;
border-radius:12px;
border:1px solid #ddd;
">

<h2 style="
color:#25176e;
margin-bottom:20px;
">
AAGM Jaipur 2026 Registration
</h2>

<table
width="100%"
cellpadding="10"
cellspacing="0"
border="1"
style="border-collapse:collapse;"
>

<tr>
<td><strong>Name of Tabler</strong></td>
<td>' . htmlspecialchars($tablerName) . '</td>
</tr>

<tr>
<td><strong>Table Number</strong></td>
<td>' . htmlspecialchars($tableNumber) . '</td>
</tr>

<tr>
<td><strong>Circler / Spouse Name</strong></td>
<td>' . htmlspecialchars($spouseName) . '</td>
</tr>

<tr>
<td><strong>Circle Number</strong></td>
<td>' . htmlspecialchars($circleNumber) . '</td>
</tr>

<tr>
<td><strong>Travelling With Kids</strong></td>
<td>' . htmlspecialchars($travellingKids) . '</td>
</tr>

<tr>
<td><strong>No. Of Children</strong></td>
<td>' . htmlspecialchars($noOfChildren) . '</td>
</tr>

<tr>
<td><strong>Child 1 Age</strong></td>
<td>' . htmlspecialchars($child1Age) . '</td>
</tr>

<tr>
<td><strong>Child 2 Age</strong></td>
<td>' . htmlspecialchars($child2Age) . '</td>
</tr>

<tr>
<td><strong>Child 3 Age</strong></td>
<td>' . htmlspecialchars($child3Age) . '</td>
</tr>

<tr>
<td><strong>Travelling With Maid</strong></td>
<td>' . htmlspecialchars($travellingMaid) . '</td>
</tr>

<tr>
<td><strong>Message For Area Chairman</strong></td>
<td>' . nl2br(htmlspecialchars($chairmanMessage)) . '</td>
</tr>

</table>

<br>

<p>
<b>Attachments:</b>
</p>

<ul>
<li>Couple Photo</li>
<li>Payment Screenshot</li>
</ul>

</div>

</body>
</html>
';

/* ==========================
   MULTIPART MAIL
========================== */

$boundary = md5(time());

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "From: AAGM Registration <noreply@yourdomain.com>\r\n";
$headers .= "Reply-To: rishabdutt4@gmail.com\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"".$boundary."\"\r\n";

/* ==========================
   HTML BODY PART
========================== */

$message  = "--".$boundary."\r\n";
$message .= "Content-Type: text/html; charset=UTF-8\r\n";
$message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$message .= $htmlBody."\r\n";

/* ==========================
   ATTACH COUPLE PHOTO
   INPUT NAME = image
========================== */

if (
    isset($_FILES["image"]) &&
    $_FILES["image"]["error"] === UPLOAD_ERR_OK
) {

    $fileName = $_FILES["image"]["name"];
    $fileTmp  = $_FILES["image"]["tmp_name"];
    $fileType = $_FILES["image"]["type"];

    $fileData = chunk_split(
        base64_encode(
            file_get_contents($fileTmp)
        )
    );

    $message .= "--".$boundary."\r\n";
    $message .= "Content-Type: ".$fileType."; name=\"".$fileName."\"\r\n";
    $message .= "Content-Disposition: attachment; filename=\"".$fileName."\"\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $message .= $fileData."\r\n";
}

/* ==========================
   ATTACH PAYMENT SCREENSHOT
   INPUT NAME = paymentScreenshot
========================== */

if (
    isset($_FILES["paymentScreenshot"]) &&
    $_FILES["paymentScreenshot"]["error"] === UPLOAD_ERR_OK
) {

    $fileName = $_FILES["paymentScreenshot"]["name"];
    $fileTmp  = $_FILES["paymentScreenshot"]["tmp_name"];
    $fileType = $_FILES["paymentScreenshot"]["type"];

    $fileData = chunk_split(
        base64_encode(
            file_get_contents($fileTmp)
        )
    );

    $message .= "--".$boundary."\r\n";
    $message .= "Content-Type: ".$fileType."; name=\"".$fileName."\"\r\n";
    $message .= "Content-Disposition: attachment; filename=\"".$fileName."\"\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $message .= $fileData."\r\n";
}

/* ==========================
   END MESSAGE
========================== */

$message .= "--".$boundary."--";

/* ==========================
   SEND EMAIL
========================== */

$mailSent = mail(
    $to,
    $subject,
    $message,
    $headers
);

/* ==========================
   RESPONSE
========================== */

if ($mailSent) {

    echo json_encode([
        "status" => "success",
        "message" => "Registration Submitted Successfully"
    ]);

} else {

    echo json_encode([
        "status" => "error",
        "message" => "Mail Sending Failed"
    ]);
}

?>
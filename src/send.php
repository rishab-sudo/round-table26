<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode(["status" => "error", "message" => "Invalid Request Method"]);
    exit;
}

/* ==========================
   CONFIGURATION
========================== */

$to      = "rishabdutt4@gmail.com";
$subject = "AAGM Jaipur 2026 - New Registration";

/* ==========================
   FORM DATA
========================== */

$travellingStatus = trim($_POST["travellingStatus"] ?? "");
$tablerName       = trim($_POST["tablerName"] ?? "");
$tableName        = trim($_POST["tableName"] ?? "");
$shirtSize        = trim($_POST["shirtSize"] ?? "");
$spouseName       = trim($_POST["spouseName"] ?? "");
$circleNumber     = trim($_POST["circleNumber"] ?? "");
$travellingKids   = trim($_POST["travellingKids"] ?? "");
$noOfChildren     = trim($_POST["noOfChildren"] ?? "");
$child1Age        = trim($_POST["child1Age"] ?? "");
$child2Age        = trim($_POST["child2Age"] ?? "");
$child3Age        = trim($_POST["child3Age"] ?? "");
$travellingMaid   = trim($_POST["travellingMaid"] ?? "");
$numberOfBeds     = trim($_POST["numberOfBeds"] ?? "");
$chairmanMessage  = trim($_POST["chairmanMessage"] ?? "");

$isCouple = ($travellingStatus === "Couple");

/* ==========================
   VALIDATION
========================== */

if (empty($travellingStatus) || empty($tablerName) || empty($tableName) || empty($shirtSize)) {
    echo json_encode(["status" => "error", "message" => "Required fields are missing."]);
    exit;
}

/* ==========================
   EMAIL BODY
========================== */

$coupleRows = "";

if ($isCouple) {
    $coupleRows .= '
    <tr>
        <td style="width:40%;background:#f0f0f0;padding:10px;"><strong>Number of Beds Required</strong></td>
        <td style="padding:10px;">' . htmlspecialchars($numberOfBeds) . '</td>
    </tr>
    <tr>
        <td style="background:#f0f0f0;padding:10px;"><strong>Circler / Spouse Name</strong></td>
        <td style="padding:10px;">' . htmlspecialchars($spouseName) . '</td>
    </tr>
    <tr>
        <td style="background:#f0f0f0;padding:10px;"><strong>Circle Number</strong></td>
        <td style="padding:10px;">' . htmlspecialchars($circleNumber) . '</td>
    </tr>
    <tr>
        <td style="background:#f0f0f0;padding:10px;"><strong>Travelling With Kids</strong></td>
        <td style="padding:10px;">' . htmlspecialchars($travellingKids) . '</td>
    </tr>';

    if ($travellingKids === "Yes") {
        $coupleRows .= '
        <tr>
            <td style="background:#f0f0f0;padding:10px;"><strong>No. Of Children</strong></td>
            <td style="padding:10px;">' . htmlspecialchars($noOfChildren) . '</td>
        </tr>';

        if (!empty($child1Age)) {
            $coupleRows .= '<tr><td style="background:#f0f0f0;padding:10px;"><strong>Child 1 Age</strong></td><td style="padding:10px;">' . htmlspecialchars($child1Age) . '</td></tr>';
        }
        if (!empty($child2Age)) {
            $coupleRows .= '<tr><td style="background:#f0f0f0;padding:10px;"><strong>Child 2 Age</strong></td><td style="padding:10px;">' . htmlspecialchars($child2Age) . '</td></tr>';
        }
        if (!empty($child3Age)) {
            $coupleRows .= '<tr><td style="background:#f0f0f0;padding:10px;"><strong>Child 3 Age</strong></td><td style="padding:10px;">' . htmlspecialchars($child3Age) . '</td></tr>';
        }
    }

    $coupleRows .= '
    <tr>
        <td style="background:#f0f0f0;padding:10px;"><strong>Travelling With Maid</strong></td>
        <td style="padding:10px;">' . htmlspecialchars($travellingMaid) . '</td>
    </tr>';
}

$photoLabel = $isCouple ? "Couple Photo" : "Individual Photo";

$htmlBody = '
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;background:#f7f7f7;padding:20px;margin:0;">
<div style="max-width:700px;margin:auto;background:#ffffff;padding:30px;border-radius:12px;border:1px solid #ddd;">

  <div style="text-align:center;margin-bottom:25px;">
    <h2 style="color:#25176e;margin:0;">AAGM Jaipur 2026</h2>
    <p style="color:#555;margin:5px 0 0;">New Registration Received</p>
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" border="1" style="border-collapse:collapse;border-color:#ddd;">

    <tr>
        <td style="width:40%;background:#f0f0f0;padding:10px;"><strong>Travelling Status</strong></td>
        <td style="padding:10px;">' . htmlspecialchars($travellingStatus) . '</td>
    </tr>
    <tr>
        <td style="background:#f0f0f0;padding:10px;"><strong>Name of Tabler</strong></td>
        <td style="padding:10px;">' . htmlspecialchars($tablerName) . '</td>
    </tr>
    <tr>
        <td style="background:#f0f0f0;padding:10px;"><strong>Table Name</strong></td>
        <td style="padding:10px;">' . htmlspecialchars($tableName) . '</td>
    </tr>
    <tr>
        <td style="background:#f0f0f0;padding:10px;"><strong>Shirt Size</strong></td>
        <td style="padding:10px;">' . htmlspecialchars($shirtSize) . '</td>
    </tr>

    ' . $coupleRows . '

    <tr>
        <td style="background:#f0f0f0;padding:10px;"><strong>Message For Area Chairman</strong></td>
        <td style="padding:10px;">' . nl2br(htmlspecialchars($chairmanMessage)) . '</td>
    </tr>

  </table>

  <br>
  <p style="color:#333;"><strong>Attachments included:</strong></p>
  <ul style="color:#555;">
    <li>' . $photoLabel . '</li>
    <li>Payment Screenshot</li>
  </ul>

  <p style="font-size:12px;color:#999;margin-top:20px;text-align:center;">
    This is an automated email from the AAGM Jaipur 2026 Registration System.
  </p>

</div>
</body>
</html>
';

/* ==========================
   MULTIPART MAIL BUILDER
========================== */

$boundary = "AAGM_" . md5(uniqid(time()));

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "From: AAGM Registration <noreply@21maneuvers.in>\r\n";
$headers .= "Reply-To: " . $to . "\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"\r\n";

$message  = "--" . $boundary . "\r\n";
$message .= "Content-Type: text/html; charset=UTF-8\r\n";
$message .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$message .= $htmlBody . "\r\n";

/* ==========================
   ATTACH PHOTO (couple/individual)
========================== */

if (isset($_FILES["image"]) && $_FILES["image"]["error"] === UPLOAD_ERR_OK) {
    $fileName = basename($_FILES["image"]["name"]);
    $fileTmp  = $_FILES["image"]["tmp_name"];
    $fileType = mime_content_type($fileTmp);
    $fileData = chunk_split(base64_encode(file_get_contents($fileTmp)));

    $message .= "--" . $boundary . "\r\n";
    $message .= "Content-Type: " . $fileType . "; name=\"" . $fileName . "\"\r\n";
    $message .= "Content-Disposition: attachment; filename=\"" . $fileName . "\"\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $message .= $fileData . "\r\n";
}

/* ==========================
   ATTACH PAYMENT SCREENSHOT
========================== */

if (isset($_FILES["paymentScreenshot"]) && $_FILES["paymentScreenshot"]["error"] === UPLOAD_ERR_OK) {
    $fileName = basename($_FILES["paymentScreenshot"]["name"]);
    $fileTmp  = $_FILES["paymentScreenshot"]["tmp_name"];
    $fileType = mime_content_type($fileTmp);
    $fileData = chunk_split(base64_encode(file_get_contents($fileTmp)));

    $message .= "--" . $boundary . "\r\n";
    $message .= "Content-Type: " . $fileType . "; name=\"" . $fileName . "\"\r\n";
    $message .= "Content-Disposition: attachment; filename=\"" . $fileName . "\"\r\n";
    $message .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $message .= $fileData . "\r\n";
}

$message .= "--" . $boundary . "--";

/* ==========================
   SEND EMAIL
========================== */

$mailSent = mail($to, $subject, $message, $headers);

if ($mailSent) {
    echo json_encode(["status" => "success", "message" => "Registration Submitted Successfully! You will receive a confirmation shortly."]);
} else {
    echo json_encode(["status" => "error", "message" => "Mail sending failed. Please contact the administrator."]);
}

?>
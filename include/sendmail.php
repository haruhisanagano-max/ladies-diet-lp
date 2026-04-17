<?php
// メールの送信
$mail = '';
$encode_to = mb_internal_encoding();
$encode_from = utf8_encode($message);
$reply_to = $auto_mail;
foreach ($message as $key => $value ) {
	$value = preg_replace("/\x0D\x0A|\x0D|\x0A/", "\n", $value);
	$value = stripslashes($value);
	$key = mb_convert_encoding($key, $encode_to, $encode_from);
	$mail .= "{$key}".$value."\n";
	$auto_body .= "{$key}".$value."\n";
}
$auto_body .= $sign;
$auto_content=$mail;
$mail .= "\n";
$mail .= "------------------------------------------------------------\n";
$mail .= "このメールはメンズ脱毛LPから送信されました。"."\n";
$mail .= "https://mens.v-clinic.jp/lp/face/ "."\n";
$mail .= "\n";
$mail .= $_SERVER['HTTP_USER_AGENT']."\n";
$mail .= $_SERVER['REMOTE_ADDR']."\n";
$mail .= "------------------------------------------------------------\n";
$mail = wordwrap($mail, 60, "\n");
$x_headers = array();
//$x_headers[] = "From: {$auto_mail}";
$x_headers[] = "From: {$from}";
$x_headers[] = "Reply-To: {$reply_to}";

if(!is_null($cc)){
	$x_headers[] = "Cc: {$cc}";
}

if (is_email($auto_mail)) {
	if(mb_send_mail($to, $subject, $mail, join("\n", $x_headers))){
	//if(mail($to, $subject, $mail , join("\n", $x_headers))){
		$returnCode = FMAIL_THANKS;
	} else {
		$err .= "<p>送信に失敗しました。お手数ですが、時間を置いて後ほどもう一度お申込みください。</p>";
		$returnCode = FMAIL_ERROR;
	}
	$header = 'From: '.mb_encode_mimeheader("ヴァージンクリニック", 'UTF-8').' <'.$auto_from.'>'."\n";
	//$header = "From: {$auto_from}";
	// 確認メールの送信
	if($auto_flag){
		$auto_body = preg_replace("/\x0D\x0A|\x0D|\x0A/", "\n", $auto_body);
		$auto_body = str_replace('[auto_body]',$auto_content,$auto_body);
		mb_send_mail($auto_mail, $auto_subject, $auto_body, $header);
	}
}
?>
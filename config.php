<?php
$parm=$_POST['parm'];
$unicode="UTF-8";
$language="Japanese";
$user_mail = @$parm['email'];

if(@$parm['method'] == '京都院') {
	$to = "contact@v-clinic.jp";
	$from = "contact@v-clinic.jp";
}elseif(@$parm['method'] == '福岡天神院') {
	$to = "contact@fukuoka.v-clinic.jp";
	$from = "contact@fukuoka.v-clinic.jp";
}elseif(@$parm['method'] == '広島院') {
	$to = "reserve@hiroshima.v-clinic.jp";
	$from = "reserve@hiroshima.v-clinic.jp";
}
$subject = "[ヴァージンクリニック]カウンセリング予約がありました。";

$auto_flag = true;
if(@$parm['method'] == '京都院') {
	$auto_from = "contact@v-clinic.jp";
}elseif(@$parm['method'] == '福岡天神院') {
	$auto_from = "contact@fukuoka.v-clinic.jp";
}elseif(@$parm['method'] == '広島院') {
	$auto_from = "reserve@hiroshima.v-clinic.jp";
}

$auto_subject = "[ヴァージンクリニック]お問い合わせ完了のお知らせ";
$auto_body = <<<__EOD__

[このメールは自動的に送信されています]

この度はお問い合わせいただき、ありがとうございます。ヴァージンクリニックでございます。
ご入力いただきました内容を確認し、担当者からご連絡いたしますので今しばらくお待ちくださいませ。

2診療日以内に当院からの返信がない場合、メールが誤って迷惑メールフォルダに入ってしまっている場合がございます。
お手数をお掛けいたしますが、迷惑メールフォルダをご確認いただくか、お電話にてお問い合わせくださいませ。

------------------------
■お問い合わせ内容
------------------------

__EOD__;

$sign = '
------------------------
医療脱毛・美容皮膚科ヴァージンクリニック
[京都院][広島院][福岡天神院]
https://mens.v-clinic.jp/lp/face/ 
------------------------';
?>
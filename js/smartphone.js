
function spLinks() {

	var spurl = "tel:0462589640";  //スマホ用URLを設定

	if((navigator.userAgent.indexOf('iPhone') > 0 ) || navigator.userAgent.indexOf('Android') > 0 && navigator.userAgent.indexOf('Mobile') > 0){
		if(document.getElementsByTagName) {
			var anchors = document.getElementsByTagName("a");
			for (var i=0; i<anchors.length; i++) {
				var anchor = anchors[i];
				if (anchor.getAttribute("href") &&
				((anchor.getAttribute("rel") == "alternate")))
				anchor.href = spurl;
			}
		}
	}

}

if(window.addEventListener) {
	window.addEventListener("load", spLinks, false);
}else if(window.attachEvent) {
	window.attachEvent("onload", spLinks);
}


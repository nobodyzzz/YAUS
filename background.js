function isValidScheme(aURL) {
    var reg = new RegExp("^https?", "i");
    return reg.test(aURL)
}
var Clipboard = {
  copy: function(data) {
          var textArea = document.createElement("textarea");
          textArea.style.position = "absolute";
          textArea.style.left = "-100%";
          textArea.value = data;

          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("Copy");
          document.body.removeChild(textArea);
        }
}; 
  
$(function(){
	chrome.browserAction.onClicked.addListener(function(tab){
			if(isValidScheme(tab.url)){
				var backend = localStorage["backend"] || "bitly";
				var shortener = new Shortener(backend);

				shortener.shorten(tab.url, function(success, msg){
					if(success){
						Clipboard.copy(msg);
						chrome.browserAction.setBadgeText({text:"done"});
					} else {
						chrome.browserAction.setBadgeText({text:"fail"});
					}
					window.setTimeout(function(){
						chrome.browserAction.setBadgeText({text:""});
					}, 1000);
				});
			}
	});
});


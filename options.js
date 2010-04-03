$(function(){
	var backend = localStorage["backend"] || "bitly";

	for(var name in  SHORTENERS_BACKEND){
		if(SHORTENERS_BACKEND.hasOwnProperty(name)){
			$("<input />", {
				type: "radio",
				name: "backend",
				id: name,
				value: name,	
				click: function(e){
					 localStorage["backend"] = e.target.id
				}
			}).appendTo("#options");
			$("<label />", {
				text: SHORTENERS_BACKEND[name].desc,
				For: name
			}).appendTo("#options");
		}
		$("#" + backend).attr("checked", true);
	}
});

var include = (function(){
	var FINAL_STATES = {"loaded": true, "complete": true, 4: true},
		head = document.getElementsByTagName("head")[0],
		pending = {};
	return function(src, cb){
		console.log("[app] loading", src, "...");
		if (pending[src]) return;
		pending[src] = true;
		var inc = document.createElement("script");
		inc.onload = inc.onreadystatechange = function() {
			if (pending[src] && (!inc.readyState || FINAL_STATES[inc.readyState])) {
				cb && cb();
				delete pending[src];
			}
		};
		inc.src = src;
		head.appendChild(inc);
	};
})();

//onStateChanged.add(callback);

gadgets.util.registerOnLoadHandler(function(){
	gapi.hangout.onApiReady.add(function(eventObj) {
		if (eventObj.isApiReady)
			include("//raw.githubusercontent.com/ancorgs/hangout-timer/master/src/app.js?_t="+Date.now());
	});
});

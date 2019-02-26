window.onload = function(){

	var eyes = document.querySelectorAll(".eye-in");

	window.addEventListener("mousemove", move, false);

	function move (event){
		var mouseLeft = event.clientX,
			mouseTop = event.clientY;

		throttle(function(){   
				$forEach(eyes, function(o, i){
						var chaX = mouseLeft - getOffset(eyes[i]).left;
						var chaY = mouseTop  - getOffset(eyes[i]).top;
						var viewportWidth = getViewportSize().width /2;
						var viewportHeight = getViewportSize().height /2;
						
						//mouseLeft 与 mouseTop的值有时候太小，导致差值太小
						eyes[i].style.left = ((chaX / viewportWidth)*50) + "%";  
						eyes[i].style.top  = ((chaY / viewportHeight)*50) + "%";
				});
			}
		);
	};

	function throttle(method, context){
		clearTimeout(method.tId);
		method.tId = setTimeout(function(){
			method.call(context);
		}, 70);
	}

	
	function $forEach(arr, callback, thisp){
		if (arr.forEach) {
			arr.forEach(callback, thisp);
		} else {
			for (var i = 0, len=arr.length; i<len; i++){
				callback.call(thisp, arr[i], i, arr);
			}
		}
	}


	
	function getOffset(element){
		var actualLeft = element.offsetLeft;
		var actualTop  = element.offsetTop;
		var current = element.offsetParent;

		while(current !== null){
			actualTop += current.offsetTop;
			actualLeft += current.offsetLeft;
			current = current.offsetParent;
		}

		return {left: actualLeft,top:actualTop};
	}

	function getViewportSize(){
		var pageWidth = window.innerWidth,
			pageHeight = window.innerHeight;
		
		if (typeof pageWidth != "number") {
				pageWidth = document.documentElement.clientWidth;
				pageHeight = document.documentElement.clientHeight;
		}else {
			pageWidth = document.body.clientWidth;
			pageHeight = document.body.clientHeight;
		}
		return {width:pageWidth,height:pageHeight}	
	}
	


};
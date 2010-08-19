var Thingy = function(e,op) {
	var o = {
		position:"bottom"
	};
	if(op) {
		for(var k in op) {
			o[k] = op[k];
		};
	};
	if(o.position=="absolute") {
		e.style.position = o.position;
	};
	if(o.fixed) {
		e.style.position = 'fixed';
	};
	if(!o.top&&!o.bottom) o.top = "0";
	if(!o.left&&!o.right) o.left = "0";
	for(var k in o) {
		if('topbottomleftright'.indexOf(k)>-1) e.style.cssText += ';'+k+':'+o[k]+';';
	};
	if(o.element) {
		if(!o.element.constructor.toString().indexOf("Element]") > -1) {
			if(o.element.constructor==String) {
				if(o.position=="after") {
					var a = o.element.split(",");
					for(var i=0;i<a.length;i++) {
						var b = Sly.search(a[i]);
						if(b.length) {
							o.element = b[b.length-1];
							break;
						};
					};
				} else {
					var b = Sly.search(o.element);
					if(b.length) o.element = b[0];
				};
			};
		};
	};
	if(!o.element) o.element = document.body;
	if('beforeaftertopbottom'.indexOf(o.position)<0) o.position = "bottom";
	switch(o.position) {
		case "before":
			o.element.parentNode.insertBefore(e,o.element);
			break;
		case "after":
			o.element.parentNode.insertBefore(e,o.element.nextSibling);
			break;
		case "top":
			o.element.insertBefore(e,o.element.firstChild);
			break;
		case "bottom":
			o.element.appendChild(e);
			break;
	};
	if(o.align&&'topmiddlebottomcenter'.indexOf(o.align)>-1) {
		e.gS = function(p) {
			if(this.currentStyle) return this.currentStyle[p];
			else if (window.getComputedStyle) return document.defaultView.getComputedStyle(this,null).getPropertyValue(p);
		};
		if(o.align=="middle"||o.align=="center") {
			e.style.cssText += ';margin-top:-'+(parseInt(e.gS("height"),10)/2)+'px;';
		};
		if(o.align=="bottom") {
			e.style.cssText += ';margin-top:-'+(e.gS("height"))+';';
		};
	} else {
		e.style.cssText += ';margin-top:0;';
	};
	e.options = o;
	return(e);
};
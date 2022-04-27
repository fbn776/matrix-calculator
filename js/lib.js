function isInt(num) {
	return Number.isInteger(num);
}

function timeDiff(now, then) {
	var diff = now.getTime() - then.getTime();
	var msec = diff;

	var hh = Math.floor(msec / 1000 / 60 / 60);
	msec -= hh * 1000 * 60 * 60;
	var mm = Math.floor(msec / 1000 / 60);
	msec -= mm * 1000 * 60;
	var ss = Math.floor(msec / 1000);
	msec -= ss * 1000;

	var days = Math.floor(hh / 24);


	return {
		hh: hh,
		mm: mm,
		ss: ss,
		ms: msec,
		day: days,
	};
}
//Loacal storage:
function hasStoredItem(name) {
	return localStorage.getItem(name) !== null
}

function getStoredItem(name) {
	return localStorage.getItem(name);
}

function storeItem(name, value) {
	localStorage.setItem(name, value);
}

function removeStoredItem(name) {
	localStorage.removeItem(name);
}

function getElementCSSVariables(allCSSVars, element = document.body, pseudo) {
	var elStyles = window.getComputedStyle(element, pseudo);
	var cssVars = {};
	for (var i = 0; i < allCSSVars.length; i++) {
		let key = allCSSVars[i];
		let value = elStyles.getPropertyValue(key)
		if (value) { cssVars[key] = value; }
	}
	return cssVars;
}

//Main:
//HTML elements functions
function s(x) {
	return document.querySelector(x)
};

function css(x, y) {
	return window.getComputedStyle(x).getPropertyValue(y);
};
HTMLElement.prototype.setProps = function(obj) {
	if (obj) {
		let keys = obj.getKeys();
		for (let i of keys) {
			this[i] = obj[i];
		}
	}
};
HTMLElement.prototype.setStyle = function(obj) {
	if (obj) {
		let keys = obj.getKeys();
		for (let i of keys) {
			this.style[i] = obj[i];
		}
	}
};
HTMLElement.prototype.setAttr = function(obj) {
	if (obj) {
		let keys = obj.getKeys();
		for (let i of keys) {
			this.setAttribute(i, obj[i]);
		}
	}
};

function createMessage(txt, type) {
	let maxTime = 6000;
	type = type || 0;
	let types = [
		//[border,bg,color]
		//0 is alert type
		["#E53935", "#ea7b7b", "white"],
		//1 is info
		["#2979FF", "#64B5F6", "white"],
		//2 is warning (notes)
		["#FF9100", "#FFCC80", "white"],
		//3 is success
		["#4CAF50", "#81C784", "white"],
		//4 is default
		["#424242", "#9e9e9e", "white"],
	];
	let seq = types[type] || types[0];
	//Max number of boxes
	let MAX = 10;
	//List of all boxes
	let elms = document.getElementsByClassName("popup_box");
	this.open = function(elm) {
		elm.setStyle({
			transform: "translate(0px)",
			opacity: 1,
			zIndex: 999999,
		});
		let total = elms.length;
		for (let i = elms.length - 1; i >= 0; i--) {
			let transX = (total - 1) - i;
			let curr = elms[i];
			curr.style.transform = `translateY(${transX*5}px)`;
		}
	}
	this.close = function(elm) {
		elm.style.transform += "translateX(100px)";
		elm.setStyle({ opacity: 0 });
		elm.setAttr({ state: 0 });
		let boxes = document.getElementsByClassName("popup_box");
		let total = boxes.length - 1;
		for (let i = boxes.length - 1; i >= 0; i--) {
			let a = boxes[i];
			let state = a.getAttribute("state")
			if (state == 0) { continue }
			else {
				let transX = (total - 1) - i;
				if (transX <= 0) { transX = 0 };
				let curr = elms[i];
				curr.style.transform = `translateY(${transX*5}px)`;
			}
		}
		setTimeout(() => {
			elm.remove();
		}, 300);
	}
	let ref = this;
	if (elms.length >= MAX) {
		this.close(elms[0]);
	}
	if (elms.length <= MAX) {
		var main = document.createElement("div");
		main.setAttr({
			class: "popup_box",
		});
		main.setStyle({
			borderColor: seq[0],
			backgroundColor: seq[1],
			color: seq[2],
		});
		var msg = document.createElement("msg");
		msg.innerHTML = txt;
		var close = document.createElement("closeIc");
		close.innerHTML = "&times;";
		close.setStyle({
			backgroundColor: seq[0]
		});
		main.appendChild(msg)
		main.appendChild(close);
		close.onclick = function() {
			ref.close(main);
		}
		document.body.appendChild(main);
		setTimeout(() => {
			this.open(main);
		}, 10);
		setTimeout(() => {
			this.close(main);
		}, maxTime);
	}
};
//Strings functions
function small(x) {
	return x.toLowerCase()
};

function big(x) {
	return x.toUpperCase()
};

function jsonS(x) {
	return JSON.stringify(x);
};

function jsonP(x) {
	return JSON.parse(x);
};


//Maths functions
function round(value, precision) {
	var multiplier = Math.pow(10, precision || 0);
	return Math.round(value * multiplier) / multiplier;
};

function map_range(val, inMin, inMax, outMin, outMax) {
	return (val - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
};

function root(n) { return Math.sqrt(n) };

//Objects and array functions
Object.prototype.getKeys = function() {
	return Object.getOwnPropertyNames(this);
};
Object.prototype.getValues = function() {
	let keys = this.getKeys();
	let arr = [];
	for (let n of keys) { arr.push(this[n]) };
	return arr;
};
Array.prototype.max = function() {
	return Math.max.apply(null, this);
};
Array.prototype.min = function() {
	return Math.min.apply(null, this);
};
Array.prototype.randomItem = function() {
	return this[Math.floor(Math.random() * this.length)];
};
Object.prototype.randomItem = function() {
	let keys = this.getValues();
	return keys.randomItem();
};
Object.prototype.hasProp = function(key) {
	return this ? Object.prototype.hasOwnProperty.call(this, key) : false;
}
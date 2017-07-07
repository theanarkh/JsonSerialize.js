	var isObject = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    var isArray  = function(arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    }


function arrSerialize(arr) {
	var res = [];
	if (isObject(arr)) {
		return;
	}
	if (isArray(arr)) {
		for (var i = 0;i<arr.length;i++) {
			if (isArray(arr[i])) {
				res.push(arrSerialize(arr[i]));
			} else {
				res.push(objSerialize(arr[i]));
			}
			
		}
		return "["+res.join(',')+"]"
	} else {
		if (typeof arr === 'string') {
			return '"'+arr+'"';
		} else if (typeof arr === 'boolean' || arr === null || typeof arr === 'number'){
			return arr;
		} else {
			throw new Error('arguments error');
		}
	}
		
}

function objSerialize(obj) {
	var res = [];
	if (isArray(obj)) {
		return;
	}
	if (isObject(obj)) {
		for (var key in obj) {
			if (isObject(obj[key])) {
				res.push('"'+key+'"'+":"+objSerialize(obj[key]));
			} else {
				res.push('"'+key+'"'+":"+arrSerialize(obj[key]));
			}
			
		}
		return "{"+res.join(',')+"}"
	} else {
		if (typeof obj === 'string') {
			return '"'+obj+'"';
		} else if (typeof obj === 'boolean' || obj === null || typeof obj === 'number'){
			return obj;
		} else {
			throw new Error('arguments error');
		}
	}
		
}
MYJSON = {
	stringify: function(arg) {
		if (isObject(arg)) {
			return objSerialize(arg);
		} else if (isArray(arg)){
			return arrSerialize(arg)
		}
	}
}
console.log(MYJSON.stringify({
      "Image": {
          "Width":  800,
          "Height": 600,
          "Title":  "View from 15th Floor",
          "Thumbnail": {
              "Url":    "http://www.example.com/image/481989943",
              "Height": 125,
              "Width":  "100"
          },
          "IDs": [116, 943, 234, 38793]}})
)

	var isObject = function(obj) {
        return Object.prototype.toString.call(obj) === '[object Object]';
    }

    var isArray  = function(arr) {
        return Object.prototype.toString.call(arr) === '[object Array]';
    }


function mergeArr(arr) {
	var res = [];
	if (isObject(arr)) {
		return;
	}
	if (isArray(arr)) {
		for (var i = 0;i<arr.length;i++) {
			if (isArray(arr[i])) {
				res.push(mergeArr(arr[i]));
			} else {
				res.push(mergeObj(arr[i]));
			}
			
		}
		return "["+res.join(',')+"]"
	} else {
		if (typeof arr === 'string') {
			return '"'+arr+'"';
		} else {
			return arr;
		}
	}
		
}

function mergeObj(obj) {
	var res = [];
	if (isArray(obj)) {
		return;
	}
	if (isObject(obj)) {
		for (var key in obj) {
			if (isObject(obj[key])) {
				res.push('"'+key+'"'+":"+mergeObj(obj[key]));
			} else {
				res.push('"'+key+'"'+":"+mergeArr(obj[key]));
			}
			
		}
		return "{"+res.join(',')+"}"
	} else {
		if (typeof obj === 'string') {
			return '"'+obj+'"';
		} else {
			return obj;
		}
	}
		
}
JSON = {
	stringify: function(arg) {
		if (isObject(arg)) {
			return mergeObj(arg);
		} else if (isArray(arg)){
			return mergeArr(arg)
		}
	}
}
console.log(JSON.stringify({
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


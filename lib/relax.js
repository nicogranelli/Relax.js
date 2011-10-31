!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
  else this[name] = definition();
}('relax', function() {

function clone(obj) {
	"use strict"; 
	if(obj === null || typeof(obj) !== 'object') {
		return obj;
	}
	var target = {};
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			target[i] = obj[i];
		}
	}
	return target;
}

var relax = {
	map: function(collection, iterator){
		var rs = [];

		function emit(key, value){
			rs.push({key:key, value:value ? value : null}); 
		}

		with({emit:emit}){
			collection.forEach(function(item){
				try{
					if(iterator.length!==2){	
						this.emit = emit;		
					}
					iterator(clone(item), emit);	
				}
				catch(e){} //this is intended. Couchdb don't trow
			});
		}

		return rs;
	},

	reduce: function(collection, iterator){
		var aux=[],
			last={},
			index={},
			reduced=[];

		collection.forEach(function(item){
			if(!(item.key in index)){
				last = {key:item.key, values:[]};
				aux.push(last);
				index[item.key] = last;
			}
			else{
				last = index[item.key];
			}	
			last.values.push(item.value);
		});

		aux.forEach(function(item){
			this.sum = function(array){
				var i=0;
				array.forEach(function(ele){
					i+=ele;
				});
				return i;
			};
			reduced.push({
				key:item.key,
				value:iterator(item.key, item.values)
			});
			delete this.sum;
		});

		return reduced;
	}
};

return relax;
});
!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports = definition();
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition);
  else this[name] = definition();
}('relax', function() {

var relax = {
	map: function(collection, iterator){
	  var rs = [];
	  
	  function emit(key, value){
	   rs.push({key:key, value:value ? value : null}); 
	  }
	  
	  collection.forEach(function(item){
		try{
			if(iterator.length!==2)	
				this.emit = emit;		
			iterator(clone(item), emit);			

		}
		catch(e){}
		finally{
			delete this.emit;
		}
	  });
	  
	  return rs;
	},

	reduce: function(collection, iterator){
		var aux=[];
		var last={};
		var index={};
		var reduced=[];
		
		collection.forEach(function(item){
			if(!(item.key in index)){
				last = {key:item.key, values:[]}
				aux.push(last);
				index[item.key] = last;
			}
			else{
				last = index[item.key]
			}	
			last.values.push(item.value)
		});
		
		console.log(aux);
		
		aux.forEach(function(item){
			this.sum = function(array){
				var i=0;
				array.forEach(function(ele){
					i+=ele;
				});
				return i;
			}
			reduced.push({
				key:item.key,
				value:iterator(item.key, item.values)
			});
			delete this.sum;
		});
		
		return reduced;
	}
}

function clone(obj) {
    if(obj == null || typeof(obj) != 'object')
        return obj;
   var target = {};
   for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
     target[i] = obj[i];
    }
   }
   return target;
  }

  return relax;
});
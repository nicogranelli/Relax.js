describe('', function(){
  var ciudades = [];
	
	beforeEach(function(){
		ciudades = 
		  [
			{
			  ciudad:"Carlos paz",
			  zonas:["z1", "z2"]
			}
		];
	});

	it('should not mutate original collection', function(){
		var col = [{"some":"value"}];
		relax.map(col, 
			function(item, emit){
				item.some='mutated';
				emit(item);  
			});
		
		expect(col).toEqual([{"some":"value"}]);
	});
		
	it('multiples emit for item', function(){
		var result=relax.map(ciudades, 
		function(ciudad, emit){
			ciudad.zonas.forEach(function(zona){
				emit(ciudad.ciudad, zona);  
			});
		});
		expect(result).toEqual([{key:"Carlos paz", value:"z1"},{key:"Carlos paz", value:"z2"},]);
	});

	it('should not pollute the global namespace', function(){
		var result=relax.map(ciudades, 
		function(ciudad, emit){
			ciudad.zonas.forEach(function(zona){
				emit(ciudad.ciudad, zona);  
			});
		});
		
		expect(typeof(emit) == "undefined").toBe(true);
	});

	it('should not throw if any of the items is different from the others', function(){
		ciudades.push({username:"aUser"});
		var result=relax.map(ciudades, 
		function(ciudad, emit){
			ciudad.zonas.forEach(function(zona){
				emit(ciudad.ciudad, zona);  
			});
		});
	});

	it('it should work without defining emit parameter', function(){
		var result=relax.map(ciudades, 
		function(ciudad){
			ciudad.zonas.forEach(function(zona){
				emit(ciudad.ciudad, zona);  
			});
		});
		expect(result).toEqual([{key:"Carlos paz", value:"z1"},{key:"Carlos paz", value:"z2"},]);
	});

	it('simple test with key and values reverted', function(){
		var result=relax.map(ciudades, 
		function(ciudad, emit){
			ciudad.zonas.forEach(function(zona){
				emit(zona, ciudad.ciudad);  
			});
		});
		expect(result).toEqual([{key:"z1", value:"Carlos paz"},{key:"z2", value:"Carlos paz"},]);
	});

	it('if not value passed to emit, in the result the value should be null', function(){
		var result=relax.map(ciudades, 
		function(ciudad, emit){
			ciudad.zonas.forEach(function(zona){
				emit([ciudad.ciudad, zona]);  
			});
		});
		expect(result).toEqual(
			[
				{key:["Carlos paz", "z1"], value:null},
				{key:["Carlos paz", "z2"], value:null},
		]);
	});

	it('if not key passed to emit, in the result the key should be null', function(){
		var result=relax.map(ciudades, 
		function(ciudad, emit){
			ciudad.zonas.forEach(function(zona){
				emit(null,[ciudad.ciudad, zona]);  
			});
		});
		expect(result).toEqual(
			[
				{key:null, value:["Carlos paz", "z1"]},
				{key:null, value:["Carlos paz", "z2"]},
		]);
	});
});
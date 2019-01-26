var SERIOUSGAME =  SERIOUSGAME || {};

(function(){
	
	function log(txt){
		console.log(txt);
	}

	function MultiMesh (colladaPath,texturesPath) {
		this._colladaPath = (colladaPath ? colladaPath : "models/");
		this._texturesPath = (texturesPath ? texturesPath : "maps/");
	
		this._geometriesLoaded=0;
		this._texturesLoaded=0;
	
		this._texturasPendientesCarga=0;
		this._geometries={};
		this._textures={};
	
	}
	
	MultiMesh.prototype.addTexture=function(filename) {
		this._textures[filename]=null;
	}
	
	MultiMesh.prototype.addGeometry=function(filename) {
		this._geometries[filename]=null;
	}
	
	MultiMesh.prototype.getGeometry=function(filename) {
		if (this._geometries.hasOwnProperty(filename))    return this._geometries[filename];
		else this.log("getGeometry() key:"+filename+" not found on geometries");
	}

	MultiMesh.prototype.getTexture=function(filename) {
		if (this._textures.hasOwnProperty(filename))    return this._textures[filename];
		else this.log("getTexture() key:"+filename+" not found on textures");
	}
	
	MultiMesh.prototype._checkLoadingStatus=function() {
	
		if (
			(this._texturasPendientesCarga==0) && (this._geometriesLoaded==Object.keys(this._geometries).length) && (this.onAssetsLoaded)
		){
			this.onAssetsLoaded();
		}		
	}
		
	
	MultiMesh.prototype.loadTextures=function(){
		
		
			manager = new THREE.LoadingManager(
				function(){
					//log("manager success");
				},
				function(item, loaded, total){// progress
					//log("manager progress"+ item+" "+loaded+" "+total);
				},
				function(){// onError
					//log("manager error");		
			}
			);
			
			var files=Object.keys(this._textures);
//			log("texturas a cargar: " + files.length);
			
			this._texturasPendientesCarga=files.length;
			for (var i=0;i<files.length;i++){
				var filename=files[i];
	
				(function(file,me){
					var loader = new THREE.TextureLoader(manager);
					loader.load(
						me._texturesPath+file,
						function(texture){// success
							me.onTextureLoaded(texture,file);
						},
						function (xhr){// progress
							//log( (xhr.loaded / xhr.total * 100) + '% loaded' );	
						},
						function(xhr){// errors
							//log( ' error al cargar: ' +xhr.currentTarget.currentSrc );
						}
					 );
				 }(filename,this));
			}
	} // de loadTextures
	

	MultiMesh.prototype.onTextureLoaded=function(texture,file){
//		log(file+" success texture: "+file);
		
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		texture.repeat.set( 1 , 1 );
		texture.magFilter = THREE.LinearFilter;
		texture.minFilter = THREE.LinearMipMapLinearFilter;
		
		this._textures[file]=texture;
		this._texturasPendientesCarga--;
		
		this._checkLoadingStatus();
	}
	
	
	MultiMesh.prototype.loadGeometries=function(){
	
		var files=Object.keys(this._geometries);
	
		if ((this._geometriesLoaded==0) && (files.length>0)) {
	
			for (var i = 0; i < files.length; i++){
	
				var loader = new THREE.ColladaLoader();
				var url=this._colladaPath+files[i];
			   // this.log("loadGeometries() load:"+url);
	
				loader.load(url,(function (context,filename){
						var f = function (colladaFile){
	
	
							var node = colladaFile.scene.children[0];
							var depth=0;
	
							while ((!node.hasOwnProperty("geometry")) && (depth<4) && (node.children[0])){
								node=node.children[0];
								depth++;
							}
	
							if (!node.geometry) {
								context.log("loadGeometry() ERROR parsing colladaFile: "+filename+" can't find geometry");
								return;
							}
	
							var geometry=node.geometry;
							context._geometries[filename] = geometry;
						   // context.log("loadGeometries() "+filename+" sucessfully loaded");
							context._geometriesLoaded++;
	
							if (context._geometriesLoaded == files.length){
	
								 context._checkLoadingStatus();
	
							}
	
						}
						return f;
					}(this,files[i])) //context DAE
	
				);
			}
		}
		else{
	
			this._checkLoadingStatus();
		}
	
	}
	
	MultiMesh.prototype.startLoad=function(){
		this.loadGeometries();
		this.loadTextures();
	}
	
	MultiMesh.prototype.log=function(msg) {
		console.log(this.constructor.name+"."+msg);
	}
	
	MultiMesh.prototype.createMeshes=function(){
	
	
	}

	SERIOUSGAME.MultiMesh=MultiMesh;
}())

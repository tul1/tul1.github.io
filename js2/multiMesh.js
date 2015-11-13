"use strict";

function MultiMesh (colladaPath,texturesPath) 
{
	this._colladaPath = (colladaPath ? colladaPath : "models/");
	this._texturesPath = (texturesPath ? texturesPath : "maps/");

	this._geometriesLoaded=0;
	this._texturesLoaded=0;

	this.geometries={};
	this.textures={};
}

MultiMesh.prototype.addTexture=function(filename)
{
	this.textures[filename]=null;
}

MultiMesh.prototype.addGeometry=function(filename)
{
	this.geometries[filename]=null;
}

MultiMesh.prototype.getGeometry=function(filename)
{
	if (this.geometries.hasOwnProperty(filename))
		return this.geometries[filename];
	else 
		this.log("getGeometry() key:"+filename+" not found on geometries");
}

MultiMesh.prototype.getTexture=function(filename)
{
	if (this.textures.hasOwnProperty(filename))
		return this.textures[filename];
	else 
		this.log("getTexture() key:"+filename+" not found on textures");
}

MultiMesh.prototype._checkLoadingStatus=function() 
{
	if (
		(this._texturesLoaded==Object.keys(this.textures).length) &&
		(this._geometriesLoaded==Object.keys(this.geometries).length) &&
		(this.onAssetsLoaded)
		)
		this.onAssetsLoaded();
}

MultiMesh.prototype.loadTextures=function() 
{
	var files=Object.keys(this.textures);

	for (var i=0;i<files.length;i++)
	{
		var key=files[i];

		var t = THREE.ImageUtils.loadTexture( this._texturesPath+key, undefined,
			(function (context,file){//on success
				var f=function (texture){
					context.log("loadTextures() "+file+" successfully loaded");
					context._texturesLoaded++;
					context._checkLoadingStatus();
				};
				return f;
			}(this,key)),
		// on ERROR
			(function (context,file){
				var f=function (texture){
					context.log("loadTextures() ERROR loading "+file+" texture");
				};
				return f;
			}(this,key))
		);

		t.wrapS = THREE.RepeatWrapping;
		t.wrapT = THREE.RepeatWrapping;
		t.repeat.set( 1, 1 );

		t.magFilter = THREE.LinearFilter;
		t.minFilter = THREE.LinearFilter;

		this.textures[key]=t;
	}
}


MultiMesh.prototype.loadGeometries=function()
{
	var files=Object.keys(this.geometries);
	if ((this._geometriesLoaded==0) && (files.length>0))
	{
		for (var i = 0; i < files.length; i++)
		{
			var loader = new THREE.ColladaLoader();
			var url=this._colladaPath+files[i];
			this.log("loadGeometries() load:"+url);
	

			loader.load(url,(function (context,filename){
				var f = function (colladaFile){
					var node = colladaFile.scene.children[0];
					var depth=0;

					while ((!node.hasOwnProperty("geometry")) && (depth<4) && (node.children[0]))
					{
						node=node.children[0];
						depth++;
					}

					if (!node.geometry) 
					{
						context.log("loadGeometry() ERROR parsing colladaFile: "+filename+" can't find geometry");
						return;
					}

					var geometry=node.geometry;
					context.geometries[filename] = geometry;
					context.log("loadGeometries() "+filename+" sucessfully loaded");
					context._geometriesLoaded++;

					if (context._geometriesLoaded == files.length)
						context._checkLoadingStatus();
				}
				return f;
			}(this,files[i]))); // contexto, nombre del DAE
		}
	}
	else
		this._checkLoadingStatus();
}

MultiMesh.prototype.startLoad=function()
{
	this.loadGeometries();
	this.loadTextures();
}

MultiMesh.prototype.log=function(msg) 
{
	console.log(this.constructor.name+"."+msg);
}


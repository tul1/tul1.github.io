"use strict"

var DEMOAUTO =  DEMOAUTO || {};

(function(){
	
	var MultiMesh=DEMOAUTO.MultiMesh;

	function AutoJugador(){
	
	    MultiMesh.call(this,"modelos/","maps/");
	
		this._container;
		this._scene;
		this._multiMateriales;
		this._materials;
		
		this.cam;
		this.cam2;
		
		var velocidad=90;
		
			

		
		this.init=function(scene,aspect){

			$(document).keypress(function(e) {
				if (e.which==43){
					velocidad=Math.min(180,velocidad+1);	
				}
				if (e.which==45){
					velocidad=Math.max(0,velocidad-1);	
				}
				
			});
			
			this._scene=scene;
			
			this._container=new THREE.Object3D();			
			this._scene.add(this._container);

			this.addGeometry("chasis.DAE");
			this.addGeometry("vidrios.DAE");	
			
/******************************************************************************************************/
			this.addGeometry("auto1.DAE");				
/******************************************************************************************************/


			this.addTexture("refmap4a.jpg");
			this.addTexture("refmap4b.jpg");
			this.addTexture("uv.jpg");		
			this.addTexture("cuero1NormalMap.jpg");						
			this.addTexture("tablero.jpg");


			
			this.cam=new THREE.PerspectiveCamera(65,aspect, 0.1, 3000); 
			this.cam.position.set(0.8,0.5,-0.0);
			this.cam.lookAt(new THREE.Vector3(0.15,0.6,5));
			this._container.add(this.cam);			
			
			this.cam2=new THREE.PerspectiveCamera(65,aspect, 0.1, 3000); 
			this.cam2.position.set(0,10,-10.0);
			this.cam2.lookAt(new THREE.Vector3(0.15,1,5));			
			this._container.add(this.cam2);			
			
		}// de init
		
		var ang=0;
		var r=2000;

		//var clock = new THREE.Clock();
		//clock.start();

		var d = new Date();
		var lastTime=d.getTime();

		this.update=function(position){
		
			var d = new Date();
			var currentTime=d.getTime();
		
			//var delta = clock.getDelta();
			var delta=currentTime-lastTime;
		
			if (ang>0.25) ang=0;
			ang+=0.0000001*velocidad*delta;
			
			var x=-2.5+r-r*Math.cos(ang);
			var z=r*Math.sin(ang);		


			this._container.position.y = 1;
			this._container.position.z = -(sensFloorPosition.posZ)*10/48;
			this._container.position.x = (sensFloorPosition.posX)/6.5-5.5;		
		


//			console.log(ang);

			// this._container.position.y=1;
			// this._container.position.z=z;
			// this._container.position.x=x;
			
			//this._container.rotation.y=ang;
			
			lastTime=currentTime;
		}
		
		this.getPosicionAuto=function(){
			return this._container.position.clone();
		}
		
	}
	
	inheritPrototype(AutoJugador, MultiMesh);
	
	AutoJugador.prototype.onAssetsLoaded=function(){

		this.getTexture("refmap4a.jpg").mapping=THREE.EquirectangularReflectionMapping;
		this.getTexture("refmap4b.jpg").mapping=THREE.EquirectangularReflectionMapping;
		this.getTexture("cuero1NormalMap.jpg").repeat.set(4,4);
	
		this._materials={

			"neutro":new THREE.MeshPhongMaterial({
				"color":0x333333,
				"specular":0x777777,
				"shininess":16,
				"side":THREE.DoubleSide					
			}),
			"panel":new THREE.MeshPhongMaterial({
					color: 0x444444,
					specular: 0xAAAAAA,
					shininess: 2,
					shading: THREE.SmoothShading,
					normalMap:this.getTexture("cuero1NormalMap.jpg")
			}),
			"laterales":new THREE.MeshPhongMaterial({
					color: 0x666660,
					specular: 0xBBBBBB,
					shininess: 2,
					shading: THREE.SmoothShading
			}),	
			"metal":new THREE.MeshPhongMaterial({
					color: 0xFFFFFF,
					specular: 0xBBBBBB,
					shininess: 2,

					envMap:this.getTexture("refmap4b.jpg"),
					shading: THREE.SmoothShading
			}),
			"cueroNegro":new THREE.MeshPhongMaterial({
					color: 0x333333,
					specular: 0x999999,
					shininess: 4,
					shading: THREE.SmoothShading
			}),	
			"vidrioNegro":new THREE.MeshPhongMaterial({
					color: 0x000000,
					specular: 0xFFFFFF,
					shininess: 32,
					shading: THREE.SmoothShading
			}),	
			"espejo":new THREE.MeshPhongMaterial({
					color: 0xFFFFFF,
					specular: 0xFFFFFF,
					shininess: 32,
					envMap:this.getTexture("refmap4a.jpg"),
					shading: THREE.SmoothShading
			}),	
			"chapa":new THREE.MeshPhongMaterial({
					color: 0xDD5500,
					specular: 0x999999,
					shininess: 32,
					shading: THREE.SmoothShading
			}),	
			"tablero":new THREE.MeshPhongMaterial({
					specular: 0x999999,
					shininess: 2,			
					map:this.getTexture("tablero.jpg"),					

			}),	


/******************************************************************************************************/

			"auto_chapa":new THREE.MeshPhongMaterial({
					color: 0xFF0000,
					envMap: this.getTexture("refmap4a.jpg"),
					reflectivity:0.4,					
					shininess: 1,
					shading: THREE.SmoothShading
			}),	
			"auto_chapa2":new THREE.MeshPhongMaterial({
					color: 0x445544,
					envMap: this.getTexture("refmap4a.jpg"),
					reflectivity:0.8,					
					shininess: 128,
					shading: THREE.SmoothShading
			}),				
			"auto_vidrio":new THREE.MeshPhongMaterial({
					color: 0x999999,
					envMap: this.getTexture("refmap4a.jpg"),
					reflectivity:0.8,					
					specular: 0x101010,
					shininess: 64,
					shading: THREE.SmoothShading
			}),	
			"auto_llantas":new THREE.MeshPhongMaterial({
					color: 0xDDDDDD,
					envMap: this.getTexture("refmap4a.jpg"),
					reflectivity:0.8,					
					specular: 0x222222,
					shininess: 32,
					shading: THREE.SmoothShading
			}),				
			"auto_cubiertas":new THREE.MeshPhongMaterial({
					color: 0x222222,
					specular: 0x777777,
					shininess: 1,
					shading: THREE.SmoothShading
			}),							
			"auto_faros":new THREE.MeshPhongMaterial({
					color: 0xEEEEDD,
					specular: 0xFFFFFF,
					shininess: 32,
					shading: THREE.SmoothShading
			}),	
			"auto_luces":new THREE.MeshPhongMaterial({
					color: 0xEE0000,
					specular: 0xFFFFFF,
					shininess: 32,
					shading: THREE.SmoothShading
			}),				
			"auto_marcos":new THREE.MeshPhongMaterial({
					color: 0x111111,
					specular: 0x666666,
					shininess: 16,
					
					shading: THREE.SmoothShading
			})

/******************************************************************************************************/


		}
		
		this._multiMateriales={
			"interior": new THREE.MeshFaceMaterial([
				this._materials["panel"],
				this._materials["laterales"],
				this._materials["metal"],
				this._materials["cueroNegro"],
				this._materials["vidrioNegro"],
				this._materials["espejo"],
				this._materials["chapa"],
				this._materials["tablero"],			
			]),


/******************************************************************************************************/
			"auto1": new THREE.MeshFaceMaterial([
				this._materials["auto_chapa"],
				this._materials["auto_vidrio"],
				this._materials["auto_llantas"],
				this._materials["auto_faros"],
				this._materials["auto_marcos"],
				this._materials["auto_cubiertas"],
				this._materials["auto_marcos"],
				this._materials["auto_marcos"],
				this._materials["auto_luces"]
			]),
/******************************************************************************************************/

		}
				
		var luzInterna = new THREE.PointLight( 0xffeeee, 0.2, 10 );
		luzInterna.position.set( 0, 1, 0 );
		this._container.add(luzInterna);				
		
		var me=this;
		
		var ch=new THREE.Mesh(this._geometries["chasis.DAE"],this._multiMateriales["interior"]);
		var vd=new THREE.Mesh(this._geometries["vidrios.DAE"]);		

		var auto=new THREE.Mesh(this._geometries["auto1.DAE"],this._multiMateriales["auto1"]);


		this._container.add(ch);


//		this._container.add(auto);					
		
		console.log(this._container);
	}


	DEMOAUTO.autoJugador=new AutoJugador();
	
}())

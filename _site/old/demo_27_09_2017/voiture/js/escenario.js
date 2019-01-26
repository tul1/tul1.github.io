"use strict";

var SERIOUSGAME =  SERIOUSGAME || {};

(function(){
	
	var MultiMesh=SERIOUSGAME.MultiMesh;
	
	function Scene(){
	    MultiMesh.call(this,"modelos/escenario/","maps/");
	
		this._container;
		this._scene;
		this._multiMaterials;
		this._materials;
		this.blocks=[];
		
		var _sunLight;
		var _params;
		
		this._buildings=[
			{"model":"ed1.DAE","map1":"ed1_pb.jpg","map2":"ed1_pisos.jpg","front":20.5},
			{"model":"ed2.DAE","map1":"ed2_pb.jpg","map2":"ed2_pisos.jpg","front":21},
			{"model":"ed3.DAE","map1":"ed3_pb.jpg","map2":"ed3_pisos.jpg","front":16},
			{"model":"ed4.DAE","map1":"ed4_pb.jpg","map2":"ed4_pisos.jpg","front":16},
			{"model":"ed5.DAE","map1":"ed5_pb.jpg","map2":"ed5_pisos.jpg","front":14.2},
			{"model":"ed7.DAE","map1":"ed7_pb.jpg","map2":"ed7_pisos.jpg","front":20.2},
			{"model":"ed8.DAE","map1":"ed8_pb.jpg","map2":"ed8_pisos.jpg","front":13},
			{"model":"ed9.DAE","map1":"ed9_pb.jpg","map2":"ed9_pisos.jpg","front":20},
			{"model":"ed10.DAE","map1":"ed10_pb.jpg","map2":"ed10_pisos.jpg","front":12.5},
			{"model":"ed11.DAE","map1":"ed11_pb.jpg","map2":"ed11_pisos.jpg","front":9.2},
			{"model":"ed12.DAE","map1":"ed12_pb.jpg","map2":"ed12_pisos.jpg","front":20.3},
			{"model":"ed13.DAE","map1":"ed13_pb.jpg","map2":"ed13_pisos.jpg","front":13},			
			{"model":"ed14.DAE","map1":"ed14_pb.jpg","map2":"ed14_pisos.jpg","front":11.5},
			{"model":"ed15.DAE","map1":"ed15_pb.jpg","map2":"ed15_pisos.jpg","front":15.9},
			{"model":"ed16.DAE","map1":"ed16_pb.jpg","map2":"ed16_pisos.jpg","front":10.6},
			{"model":"ed17.DAE","map1":"ed17_pb.jpg","map2":"ed17_pisos.jpg","front":12.4},
			{"model":"ed18.DAE","map1":"ed18_pb.jpg","map2":"ed18_pisos.jpg","front":20.4},
			{"model":"ed19.DAE","map1":"ed19_pb.jpg","map2":"ed19_pisos.jpg","front":10.5}							
		];
		
		this.addGeometry("unaCuadra.DAE");
		this.addGeometry("cielo.DAE");
		this.addGeometry("vereda.DAE");

		this.addGeometry("auto1.DAE");
		this.addGeometry("arbolA1.DAE");
		this.addGeometry("arbolB1.DAE");
		this.addGeometry("arbolC1.DAE");

		// tree textures	
		this.addTexture("arbolA1_hojas.png");
		this.addTexture("arbolA1_tronco.jpg");
		this.addTexture("arbolB1_hojas.png");
		this.addTexture("arbolC1_hojas.png");

		this.addTexture("arbolA0.png");
		this.addTexture("arbolB0.png");
		this.addTexture("arbolC0.png");
		this.addTexture("arbolD0.png");

		this.addTexture("refmap4a.jpg");
		this.addTexture("uv.jpg");

		this.addTexture("cruce.jpg");
		this.addTexture("tramo-dobleamarilla.jpg");			
		this.addTexture("sky2.jpg");
		this.addTexture("vereda.jpg");			
		this.addTexture("vereda_normal.jpg");						
		
		// building textures
		for (var i=0;i<this._buildings.length;i++){
			var ed=this._buildings[i];
			this.addGeometry(ed.model);			
			this.addTexture(ed.map1);
			this.addTexture(ed.map2);								
		}
			

		this.init=function(scene,params) {
			
			this._params=params;
			this.enableShadows=true;
			this._scene=scene;
			this._container=new THREE.Object3D();

			this._scene.add(this._container);											

			// sky, ground
			var skyLight = new THREE.HemisphereLight(  0x9fb9d6,0xe9d5bb, 0.65 );
			scene.add(skyLight);

		  	_sunLight = new THREE.DirectionalLight(0xffdd99, 1);
			_sunLight.position.set(0,250,0);
			_sunLight.position.multiplyScalar(1);

			this._container.add(_sunLight);
			//***************************************************************************
			//  _sunLight target is not added to the container or the scene, its position doesn't need to be updated 
			//	https://github.com/mrdoob/three.js/issues/5555
			this._container.add(_sunLight.target);
			var d=100;

			_sunLight.castShadow = true;

			_sunLight.shadow.camera.visible=true;
			_sunLight.shadow.camera.left = -d;
			_sunLight.shadow.camera.right = d;
			_sunLight.shadow.camera.top = d;
			_sunLight.shadow.camera.bottom = -d;
			_sunLight.shadow.camera.near = 0.1;
			_sunLight.shadow.camera.far = 1000;
			_sunLight.shadow.bias = 0.0001;
			_sunLight.shadow.darkness = 0.1;
			
			_sunLight.shadow.mapSize.width = 1024;
			_sunLight.shadow.mapSize.height = 1024;
		}		
		
		this.setTargetSun=function (pos){
			_sunLight.target.position.copy(pos);				
			var p=pos.clone();					
			p.y+=100;
			p.x+=35;
			p.z+=150;
			_sunLight.position.copy(p);
		}
		
		this.updateVisibility=function(carPos){			
			for (var i=0;i<this.blocks.length;i++){
				var c=this.blocks[i];
				var pos=c.pos;

				var dist=Math.sqrt(Math.pow(carPos[0]-pos[0],2)+	Math.pow(carPos[1]-pos[1],2));

				if (dist<300) c.obj.visible=true;
				else c.obj.visible=false;
			}
		}
		
	}
	
	inheritPrototype(Scene, MultiMesh);
	
	Scene.prototype.onAssetsLoaded=function(){
		this.log("onAssetsLoaded");
		var me=this;

	// ********************* Materiales  definitions ******************************
		this.getTexture("refmap4a.jpg").mapping=THREE.EquirectangularReflectionMapping;
		
		this._materials={
			"neutro":new THREE.MeshPhongMaterial({
					color: 0x666666,
					specular: 0xffffff,
					shininess: 1,
					shading: THREE.SmoothShading
			}),
			"unaCuadra_1":new THREE.MeshPhongMaterial({
					color: 0xAAAAAA,
					specular: 0x333333,
					shininess: 1,
					shading: THREE.SmoothShading,
					map:this.getTexture("cruce.jpg")
			}),
			"unaCuadra_2":new THREE.MeshPhongMaterial({
					color: 0xFFFFFF,
					specular: 0x333333,
					shininess: 1,
					map:this.getTexture("tramo-dobleamarilla.jpg"),					
					shading: THREE.SmoothShading
			}),	
		    "cielo": new THREE.MeshBasicMaterial({
				map:this.getTexture("sky2.jpg"),
			    fog:false
			})	,
			"vereda1":new THREE.MeshPhongMaterial({
					color: 0x999999,
					specular: 0x333333,
					shininess: 8,
					map:this.getTexture("vereda.jpg"),
					normalMap:this.getTexture("vereda_normal.jpg"),					
					shading: THREE.SmoothShading
			}),	
			"vereda2":new THREE.MeshPhongMaterial({
					color: 0x222222,
					specular: 0x111111,
					shininess: 1,
					shading: THREE.SmoothShading
			}),				
			"arbolA0":new THREE.SpriteMaterial( { "map": this.getTexture("arbolA0.png"), "color": 0xffffff, "fog": true }),
			"arbolB0":new THREE.SpriteMaterial( { "map": this.getTexture("arbolB0.png"), "color": 0xffffff, "fog": true }),
			"arbolC0":new THREE.SpriteMaterial( { "map": this.getTexture("arbolC0.png"), "color": 0xffffff, "fog": true }),
			"arbolD0":new THREE.SpriteMaterial( { "map": this.getTexture("arbolD0.png"), "color": 0xffffff, "fog": true }),	
			
			
			"auto_chapa":new THREE.MeshPhongMaterial({
					color: 0xFF9900,
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
			}),	
			"arbolA1_hojas":new THREE.MeshPhongMaterial({
					color: 0xFFFFFF,
					specular: 0x666666,
					map:this.getTexture("arbolA1_hojas.png"),
					transparent:true,
					shininess: 1,
					shading: THREE.SmoothShading,
					fog: true ,					
					side:THREE.DoubleSide					
			}),	
			"arbolB1_hojas":new THREE.MeshPhongMaterial({
					color: 0xFFFFFF,
					specular: 0x666666,
					map:this.getTexture("arbolB1_hojas.png"),
					transparent:true,
					shininess: 1,
					shading: THREE.SmoothShading,
					fog: true ,
					side:THREE.DoubleSide
			}),	
			"arbolC1_hojas":new THREE.MeshPhongMaterial({
					color: 0xFFFFFF,
					specular: 0x666666,
					map:this.getTexture("arbolC1_hojas.png"),
					transparent:true,
					shininess: 1,
					shading: THREE.SmoothShading,
					fog: true ,
					side:THREE.DoubleSide
			}),							
			"arbolA1_tronco":new THREE.MeshPhongMaterial({
					color: 0xFFFFFF,
					specular: 0x666666,
					map:this.getTexture("arbolA1_tronco.jpg"),
					shininess: 1,
					fog: true ,					
					shading: THREE.SmoothShading
			}),																		
											
		}

		this._multiMaterials={
			"unaCuadra": new THREE.MeshFaceMaterial([
				this._materials["unaCuadra_1"],
				this._materials["unaCuadra_2"],
			]),
			"vereda": new THREE.MeshFaceMaterial([
				this._materials["vereda1"],
				this._materials["vereda2"]			
			]),
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
			"auto1B": new THREE.MeshFaceMaterial([
				this._materials["auto_chapa2"],
				this._materials["auto_vidrio"],
				this._materials["auto_llantas"],
				this._materials["auto_faros"],
				this._materials["auto_marcos"],
				this._materials["auto_cubiertas"],
				this._materials["auto_marcos"],
				this._materials["auto_marcos"],
				this._materials["auto_luces"]
			]),			
			"arbolA1": new THREE.MeshFaceMaterial([
				this._materials["arbolA1_hojas"],
				this._materials["arbolA1_tronco"]
			]),
			"arbolB1": new THREE.MeshFaceMaterial([
				this._materials["arbolB1_hojas"],
				this._materials["arbolA1_tronco"]
			]),
			"arbolC1": new THREE.MeshFaceMaterial([
				this._materials["arbolC1_hojas"],
				this._materials["arbolA1_tronco"]
			])									
		}
				

		// *************** Privet methods *************************

		function addMarker(z){
			var geometry = new THREE.BoxGeometry( 50, 10, 0.02 );
			var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
			var cube = new THREE.Mesh( geometry, material );
			cube.position.z=z;
			me._container.add( cube );	
		}
			
		
		function getBlock(buildingsSequence,spaceBetweenBuildings,treeSequence,specificParams){
			
			var params=$.extend({
					"excludeBuildings":false,
					"excludeTrees":false,
					"excludeCars":false,
					"blockNumber":2
				}, 
				specificParams
			);
			
			if (!spaceBetweenBuildings) spaceBetweenBuildings=0;
				
			var container3D = new THREE.Object3D();

			var street = new THREE.Mesh( me.getGeometry("vereda.DAE"), me._multiMaterials["vereda"] );
			street.position.x=-57;
			street.position.z=50;

			street.receiveShadow=true;	
			street.updateMatrix();		
			street.matrixAutoUpdate=false;
			
			container3D.add(street);
			

			// ************************* loading buildings *************************
			var z=2;
			if ((params) && (!params.excludeBuildings)){
				for (var i=0;i<buildingsSequence.length;i++){
					
					var eNro=buildingsSequence[i];
					var ed=me._buildings[eNro];
						
					var eMesh = new THREE.Mesh(me.getGeometry(ed.model), me._multiMaterials["ed"+(eNro+1)]);
					eMesh.position.x=-11;

					eMesh.position.z=z+ed.front/2;

					eMesh.castShadow=true;
					eMesh.receiveShadow=true;
					
					eMesh.updateMatrix();
					eMesh.matrixAutoUpdate=false;
					
					container3D.add(eMesh);				
					z=z+ed.front+spaceBetweenBuildings;					
				}
			}


			// ************************* loading trees *************************
			var z=5;
			if ((params) && (!params.excludeTrees)){
				for (var i=0;i<treeSequence.length;i++){							

					var lod = new THREE.LOD();
					lod.position.x=-8.5;
					lod.position.z=z;
					z=z+treeSequence[i].spaceBetweenBuildings;	

					var sc=treeSequence[i].scale;
					var sc2=sc*0.1;


					var letra="A";		
					switch(treeSequence[i].type){
						case 1: letra="A";break;
						case 2: letra="B";break;							
						case 3: letra="C";break;
					}

					var geo=me.getGeometry("arbol"+letra+"1.DAE");		
					var mat=me._multiMaterials["arbol"+letra+"1"];
					
					var abMesh = new THREE.Mesh(geo,mat);
					abMesh.castShadow=true;
					abMesh.receiveShadow=true;				
					abMesh.rotation.y=Math.random()*2*Math.PI;
					abMesh.scale.set(sc2,sc2,sc2);
					abMesh.updateMatrix();
					abMesh.matrixAutoUpdate=false;				
		
					var sprite = new THREE.Sprite( me._materials["arbol"+letra+"0"] );
					sprite.scale.set(sc,sc,sc);
					sprite.position.y=sc/2;
					
					lod.addLevel( sprite,150 );						
					lod.addLevel( abMesh,0 );				
			
					container3D.add(lod);
				}
			}
			var geometry = new THREE.BoxGeometry( 2, 1.5, 4 );
			var material = new THREE.MeshPhongMaterial( {color: 0x999999} );

			// ********************* loading cars ************************
			if ((params) && (!params.excludeCars)){
				for (var i=0;i<4;i++){
					
					var lod = new THREE.LOD();
					
					var autoLow = new THREE.Mesh( geometry, material );
					autoLow.position.y=1;
					autoLow.updateMatrix();
					autoLow.matrixAutoUpdate=false;						
					lod.addLevel( autoLow,200 );						
					
					var mat=me._multiMaterials["auto1"];
					
					if (Math.random()>0.5) mat=me._multiMaterials["auto1B"];
					
					var auto1 = new THREE.Mesh(me.getGeometry("auto1.DAE"),mat);				
					
					auto1.castShadow=true;
					auto1.receiveShadow=true;	
							
//					auto1.position.z=20+i*(15+Math.random()*5);
//					auto1.position.x=-5.5;				
//					auto1.position.y=-0.1;	
					auto1.updateMatrix();
					auto1.matrixAutoUpdate=false;	
					
					//contenedor.add(auto1);
					lod.position.z=20+i*(15+Math.random()*5);
					lod.position.x=-5.5;				
					lod.position.y=-0.1;							
					
					lod.addLevel( auto1,0 );	
					container3D.add(lod);	
	
				}
			}
								
//			var axisHelper = new THREE.AxisHelper( 5 );
//			contenedor.add( axisHelper );
		
			return container3D;
		}
		
		
		// ***************** Building materials **************************
		for (var i=1;i<=this._buildings.length;i++){
			var ed=this._buildings[i-1];
			var ed_sig=this._buildings[i];
	
			this._materials["ed"+i+"_0"]=new THREE.MeshPhongMaterial({
					color: 0xAAAAAA,
					specular: 0x333333,
					shininess: 1,
					shading: THREE.SmoothShading,
					map:this.getTexture(ed.map1)
			});
			
			this._materials["ed"+i+"_1"]=new THREE.MeshPhongMaterial({
					color: 0xAAAAAA,
					specular: 0x333333,
					shininess: 1,
					shading: THREE.SmoothShading,
					map:this.getTexture(ed.map2)
			});			
			
			this._multiMaterials["ed"+i]=new THREE.MeshFaceMaterial([this._materials["ed"+i+"_0"],this._materials["ed"+i+"_1"]]);

		}		
		
		// ********************** sky ***************************
				
		var cielo = new THREE.Mesh(this.getGeometry("cielo.DAE"), this._materials["cielo"]);
		cielo.rotation.y=Math.PI/2;
		this._container.add(cielo);

		
		var z=0;
		var block;
		
		var buildingDistance={
			"left":[
				{"d":[0,1,2,3,4],"e":1},
				{"d":[5,6,7,8,10],"e":2},
				{"d":[11,12,13,14,15,17,9],"e":2},
				{"d":[2,4,6,8,10,12],"e":1.2},
				{"d":[1,3,5,7,9],"e":1.8},
				{"d":[14,16,13,0,2],"e":2},
				{"d":[17,13,6,4,3,1],"e":0.5},
				{"d":[0,1,2,3,4],"e":1},
				{"d":[5,6,7,8,10],"e":2},
				{"d":[11,12,13,14,15,17,9],"e":2}		
			],
			"right":[
				{"d":[2,4,6,8,10,12],"e":1.2},
				{"d":[17,13,6,4,3,1],"e":0.5},
				{"d":[1,3,5,2,9],"e":1.8},
				{"d":[11,12,13,14,15,17,9],"e":2},
				{"d":[14,16,13,0,2],"e":2},
				{"d":[5,6,9,8,10],"e":2},
				{"d":[0,1,2,3,4],"e":1},
				{"d":[2,4,6,8,10,12],"e":1.2},
				{"d":[17,13,6,4,3,1],"e":0.5},
				{"d":[1,3,5,2,9],"e":1.8}
			]
		};
		
		var treeDistance=[
			{"type":1,"scale":12,"separation":9},
			{"type":2,"scale":7,"separation":10},
			{"type":3,"scale":15,"separation":19},
			{"type":1,"scale":9,"separation":7},									
			{"type":3,"scale":13,"separation":15},
			{"type":2,"scale":8,"separation":9},
			{"type":2,"scale":10,"separation":13},
			{"type":1,"scale":13,"separation":13},			
		];
		
		
		// ************************** Streets ****************************
		var angle = 0;
		var r = 2000;
		var blockMaxNumber=Math.min(Math.min(buildingDistance.left.length, buildingDistance.right.length), 1+parseInt(me._params.blocksNumber));
		
		for(var i=0; i<blockMaxNumber; i++){

			var blockComposed = new THREE.Object3D();			
			
			var dis = buildingDistance.left[i];						
			block = getBlock(dis.d, dis.e, treeDistance, me._params);
			blockComposed.add(block);
	
			
			var dis = buildingDistance.right[i];				
			block = getBlock(dis.d, dis.e, treeDistance, me._params);
			block.position.z = 100;
			block.rotation.y = Math.PI;

			blockComposed.add(block);

			var ang = i*0.056;
			var x = r-r*Math.cos(ang);
			var z = r*Math.sin(ang);
			
			blockComposed.position.x = x;
			blockComposed.position.z = z;
			blockComposed.rotation.y = ang + 0.0156;
			
			blockComposed.updateMatrix();
			blockComposed.matrixAutoUpdate=false;
			
			var pavement = new THREE.Mesh( me.getGeometry("unaCuadra.DAE"), me._multiMaterials["unaCuadra"] );
		
			pavement.position.z=-7;
			pavement.rotation.y=Math.PI;
			pavement.receiveShadow=true;
				
			pavement.updateMatrix();						
			pavement.matrixAutoUpdate=false;
			blockComposed.add( pavement );
			
			this._container.add(blockComposed);	
			
			this.blocks.push({
				"pos":[x,z],
				"obj":blockComposed
			});
						
		}

		
		var axisHelper = new THREE.AxisHelper( 5 );
		this._container.add( axisHelper );
	
		
	}
	
	//addEventsHandlingFunctions(Escenario);

	SERIOUSGAME.scene=new Scene();

}())
	
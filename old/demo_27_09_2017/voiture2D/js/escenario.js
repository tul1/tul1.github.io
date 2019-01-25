"use strict"

var DEMOAUTO =  DEMOAUTO || {};

(function(){
	

	var MultiMesh=DEMOAUTO.MultiMesh;
	
	function Escenario(){
	
	    MultiMesh.call(this,"modelos/escenario/","maps/");
	
		this._container;
		this._scene;
		this._multiMateriales;
		this._materials;
		this.cuadras=[];
		
		var luzSol;
		var _params;
		
		this._edificios=[
			{"modelo":"ed1.DAE","mapa1":"ed1_pb.jpg","mapa2":"ed1_pisos.jpg","frente":20.5},
			{"modelo":"ed2.DAE","mapa1":"ed2_pb.jpg","mapa2":"ed2_pisos.jpg","frente":21},
			{"modelo":"ed3.DAE","mapa1":"ed3_pb.jpg","mapa2":"ed3_pisos.jpg","frente":16},
			{"modelo":"ed4.DAE","mapa1":"ed4_pb.jpg","mapa2":"ed4_pisos.jpg","frente":16},
			{"modelo":"ed5.DAE","mapa1":"ed5_pb.jpg","mapa2":"ed5_pisos.jpg","frente":14.2},
			{"modelo":"ed7.DAE","mapa1":"ed7_pb.jpg","mapa2":"ed7_pisos.jpg","frente":20.2},
			{"modelo":"ed8.DAE","mapa1":"ed8_pb.jpg","mapa2":"ed8_pisos.jpg","frente":13},
			{"modelo":"ed9.DAE","mapa1":"ed9_pb.jpg","mapa2":"ed9_pisos.jpg","frente":20},
			{"modelo":"ed10.DAE","mapa1":"ed10_pb.jpg","mapa2":"ed10_pisos.jpg","frente":12.5},
			{"modelo":"ed11.DAE","mapa1":"ed11_pb.jpg","mapa2":"ed11_pisos.jpg","frente":9.2},
			{"modelo":"ed12.DAE","mapa1":"ed12_pb.jpg","mapa2":"ed12_pisos.jpg","frente":20.3},
			{"modelo":"ed13.DAE","mapa1":"ed13_pb.jpg","mapa2":"ed13_pisos.jpg","frente":13},			
			{"modelo":"ed14.DAE","mapa1":"ed14_pb.jpg","mapa2":"ed14_pisos.jpg","frente":11.5},
			{"modelo":"ed15.DAE","mapa1":"ed15_pb.jpg","mapa2":"ed15_pisos.jpg","frente":15.9},
			{"modelo":"ed16.DAE","mapa1":"ed16_pb.jpg","mapa2":"ed16_pisos.jpg","frente":10.6},
			{"modelo":"ed17.DAE","mapa1":"ed17_pb.jpg","mapa2":"ed17_pisos.jpg","frente":12.4},
			{"modelo":"ed18.DAE","mapa1":"ed18_pb.jpg","mapa2":"ed18_pisos.jpg","frente":20.4},
			{"modelo":"ed19.DAE","mapa1":"ed19_pb.jpg","mapa2":"ed19_pisos.jpg","frente":10.5}							
		];
		
		this.addGeometry("unaCuadra.DAE");
		this.addGeometry("cielo.DAE");
		this.addGeometry("vereda.DAE");	

		this.addGeometry("auto1.DAE");				
		this.addGeometry("arbolA1.DAE");
		this.addGeometry("arbolB1.DAE");
		this.addGeometry("arbolC1.DAE");									
				

		// agrego texturas
		this.addTexture("arbolA1_hojas.png");	
		this.addTexture("arbolA1_tronco.jpg");		
		this.addTexture("arbolB1_hojas.png");	
		this.addTexture("arbolC1_hojas.png");			


		// agrego texturas de arboles	
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
		
		// agrego texturas y DAEs de edificios
		for (var i=0;i<this._edificios.length;i++){
			var ed=this._edificios[i];
							
			this.addGeometry(ed.modelo);			
			this.addTexture(ed.mapa1);
			this.addTexture(ed.mapa2);								
		}
			



		this.init=function(scene,params) {
			
			this._params=params;
			this.enableShadows=true;
			this._scene=scene;
			this._container=new THREE.Object3D();

			this._scene.add(this._container);			
			
			// 
									

			// Luz cielo	
													// sky, ground
			var lightCielo = new THREE.HemisphereLight(  0x9fb9d6,0xe9d5bb, 0.65 );
			scene.add( lightCielo );
						
					

		  	luzSol = new THREE.DirectionalLight(0xffdd99, 1);

			luzSol.position.set(0,250,0); // +Z hacia el mar atras de la camara    X+ hacia la izquiera
			luzSol.position.multiplyScalar(1);

			this._container.add(luzSol);
			
						
			
			//***************************************************************************
			
			//  ALERTA !!!!!
			  
			//  si al target de la luzSol no esta agregado al container (o a la escena), no se actualiza su posicion 
			
			//	https://github.com/mrdoob/three.js/issues/5555
				
			
			
			this._container.add(luzSol.target);			
			
			var d=100;			

				luzSol.castShadow = true;

				luzSol.shadow.camera.visible=true;
				luzSol.shadow.camera.left = -d;	
				luzSol.shadow.camera.right = d;
				luzSol.shadow.camera.top = d;				
				luzSol.shadow.camera.bottom = -d;				
				luzSol.shadow.camera.near = 0.1;
				luzSol.shadow.camera.far = 1000;
				luzSol.shadow.bias = 0.0001;
				luzSol.shadow.darkness = 0.1;
				
				luzSol.shadow.mapSize.width = 1024;
				luzSol.shadow.mapSize.height = 1024;



			
			
			//var luzHelper=new THREE.DirectionalLightHelper(luzSol,d);
			//this._container.add(luzHelper);
	
			//var luzAmbiente = new THREE.AmbientLight( 0x111111 ); // soft white light
			//this._container.add( luzAmbiente);					
		
		}		
		
		this.setTargetSol=function (pos){

			luzSol.target.position.copy(pos);									
			var p=pos.clone();									

			p.y+=100;
			p.x+=35;	
			p.z+=150;		
			luzSol.position.copy(p);

			
			

		}
		
		
		this.updateVisibility=function(autoPos){
			
			
			for (var i=0;i<this.cuadras.length;i++){
				var c=this.cuadras[i];
				var pos=c.pos;

				var dist=Math.sqrt(Math.pow(autoPos[0]-pos[0],2)+	Math.pow(autoPos[1]-pos[1],2));

				if (dist<300) c.obj.visible=true;
				else c.obj.visible=false;

//				console.log("cuadra "+i+" dist:"+dist+" z:"+pos[1]+" autoPos z"+autoPos[1]+" "+c.obj.visible);								
			}
		}
		
	}
	
	inheritPrototype(Escenario, MultiMesh);
	
	Escenario.prototype.onAssetsLoaded=function(){
			    
		this.log("onAssetsLoaded");
		var me=this;
		
		
	// ********************* Definicion de materiales ******************************
		
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

		this._multiMateriales={
	
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
				

		// *************** Funciones Privadas *************************

		
		function addMarker(z){
			var geometry = new THREE.BoxGeometry( 50, 10, 0.02 );
			var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
			var cube = new THREE.Mesh( geometry, material );
			cube.position.z=z;
			me._container.add( cube );	
		}
			
		
		function getManzana(secuenciaEdificios,separacion,secuenciaArboles,parametros){
			
			var params=$.extend({
					"excluirEdificios":false,
					"excluirArboles":false,
					"excluirAutos":false,
					"totalCuadras":2
				}, 
				parametros
			);
			
			
			
			if (!separacion) separacion=0;
				
			var contenedor= new THREE.Object3D();

			var vereda = new THREE.Mesh( me.getGeometry("vereda.DAE"), me._multiMateriales["vereda"] );
			vereda.position.x=-57;
			vereda.position.z=50;

			vereda.receiveShadow=true;	
			vereda.updateMatrix();		
			vereda.matrixAutoUpdate=false;
			
			contenedor.add(vereda);
			
			var z=2;
			if ((params) && (!params.excluirEdificios)){
				for (var i=0;i<secuenciaEdificios.length;i++){
					
					var eNro=secuenciaEdificios[i];
					var ed=me._edificios[eNro];
	//				if (i==0) z=z+ed.frente/2;
					
					var eMesh = new THREE.Mesh(me.getGeometry(ed.modelo), me._multiMateriales["ed"+(eNro+1)]);
					eMesh.position.x=-11;
					eMesh.position.z=z+ed.frente/2;
					eMesh.castShadow=true;
					eMesh.receiveShadow=true;
					
					eMesh.updateMatrix();
					eMesh.matrixAutoUpdate=false;
					
								
					contenedor.add(eMesh);				
					z=z+ed.frente+separacion;					
				}
			}


			// ************************* creo los arboles *************************
			var z=5;
			if ((params) && (!params.excluirArboles)){
				for (var i=0;i<secuenciaArboles.length;i++){							

					var lod = new THREE.LOD();
					lod.position.x=-8.5;
					lod.position.z=z;
					z=z+secuenciaArboles[i].separacion;	

					var sc=secuenciaArboles[i].escala;
					var sc2=sc*0.1;


					var letra="A";		
					switch(secuenciaArboles[i].tipo){
						case 1: letra="A";break;
						case 2: letra="B";break;							
						case 3: letra="C";break;
					}

					var geo=me.getGeometry("arbol"+letra+"1.DAE");		
					var mat=me._multiMateriales["arbol"+letra+"1"];
					
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
			
					contenedor.add(lod);
				}
			}
			var geometry = new THREE.BoxGeometry( 2, 1.5, 4 );
			var material = new THREE.MeshPhongMaterial( {color: 0x999999} );
			// ********************* creo loas autos ************************
			if ((params) && (!params.excluirAutos)){
				for (var i=0;i<4;i++){
					
					var lod = new THREE.LOD();
					
					var autoLow = new THREE.Mesh( geometry, material );
					autoLow.position.y=1;
					autoLow.updateMatrix();
					autoLow.matrixAutoUpdate=false;						
					lod.addLevel( autoLow,200 );						
					
					var mat=me._multiMateriales["auto1"];
					
					if (Math.random()>0.5) mat=me._multiMateriales["auto1B"];
					
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
					contenedor.add(lod);	
	
				}
			}
								
			
//			var axisHelper = new THREE.AxisHelper( 5 );
//			contenedor.add( axisHelper );
			
		
			return contenedor;
		}
		
		
		// ***************** creo los materiales de los edificios **************************
		
		for (var i=1;i<=this._edificios.length;i++){
			var ed=this._edificios[i-1];
			var ed_sig=this._edificios[i];
	
			this._materials["ed"+i+"_0"]=new THREE.MeshPhongMaterial({
					color: 0xAAAAAA,
					specular: 0x333333,
					shininess: 1,
					shading: THREE.SmoothShading,
					map:this.getTexture(ed.mapa1)
			});
			
			this._materials["ed"+i+"_1"]=new THREE.MeshPhongMaterial({
					color: 0xAAAAAA,
					specular: 0x333333,
					shininess: 1,
					shading: THREE.SmoothShading,
					map:this.getTexture(ed.mapa2)
			});			
			
			this._multiMateriales["ed"+i]=new THREE.MeshFaceMaterial([this._materials["ed"+i+"_0"],this._materials["ed"+i+"_1"]]);

		}		
		
		// ********************** creo el cielo ***************************
				
		var cielo = new THREE.Mesh(this.getGeometry("cielo.DAE"), this._materials["cielo"]);
		cielo.rotation.y=Math.PI/2;
		this._container.add(cielo);	
		
		
		

		
		var z=0;
		var manzana;
		
		var distEdificios={
			"izquierda":[
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
			"derecha":[
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
		
		var distArboles=[
			{"tipo":1,"escala":12,"separacion":9},
			{"tipo":2,"escala":7,"separacion":10},
			{"tipo":3,"escala":15,"separacion":19},
			{"tipo":1,"escala":9,"separacion":7},									
			{"tipo":3,"escala":13,"separacion":15},
			{"tipo":2,"escala":8,"separacion":9},
			{"tipo":2,"escala":10,"separacion":13},
			{"tipo":1,"escala":13,"separacion":13},			
		];
		
		
		// ************************** creo las cuadras ****************************
		var angulo=0;
		var radio=2000;
		var cantMaxCuadras=Math.min(Math.min(distEdificios.izquierda.length,distEdificios.derecha.length),1+parseInt(me._params.totalCuadras));
		

		var cuadra;

		

		for (var i=0;i<cantMaxCuadras;i++){

			var cuadra=new THREE.Object3D();			
			
			var dis=distEdificios.izquierda[i];						
			manzana=getManzana(dis.d,dis.e,distArboles,me._params);
			cuadra.add(manzana);
	
			
			var dis=distEdificios.derecha[i];				
			manzana=getManzana(dis.d,dis.e,distArboles,me._params);
			manzana.position.z=100;
			manzana.rotation.y=Math.PI;

			cuadra.add(manzana);

			var ang=i*0.056;
			
			var x=radio-radio*Math.cos(ang);
			var z=radio*Math.sin(ang);			
			
			cuadra.position.x=x;
			cuadra.position.z=z;
			cuadra.rotation.y=ang+0.0156;
			

			cuadra.updateMatrix();
			cuadra.matrixAutoUpdate=false;
			
			// creo el pavimento
			var pavimento = new THREE.Mesh( me.getGeometry("unaCuadra.DAE"), me._multiMateriales["unaCuadra"] );
		
			pavimento.position.z=-7;
			pavimento.rotation.y=Math.PI;
			pavimento.receiveShadow=true;
				
			pavimento.updateMatrix();						
			pavimento.matrixAutoUpdate=false;
			cuadra.add( pavimento );
			
			this._container.add(cuadra);	
			
			this.cuadras.push({
				"pos":[x,z],
				"obj":cuadra
			});
						
		}

		
		var axisHelper = new THREE.AxisHelper( 5 );
		this._container.add( axisHelper );
	
		
	}
	
	

	
	//addEventsHandlingFunctions(Escenario);

	DEMOAUTO.escenario=new Escenario();




}())
	

var DEMOAUTO =  DEMOAUTO || {};

(function(){
	
	
	var scene;
	var camZero;
	var renderer;
	var controls;
	var currentCamera;
	var currentCameraNum;
	var otherCameras=[];
	var aspect=1;
	
	
	DEMOAUTO.visualizador={
		"getAspect":function(){
			return aspect;
		},
		"setCamera":function(num){
			
			if (num==0){
				currentCamera=camZero;
				currentCameraNum=num;
			} else {
				if ((num-1) < otherCameras.length) {
					currentCamera=otherCameras[num-1];
					currentCameraNum=num;
				}				
			}
		},
		
		"addCamera":function(cam){
			otherCameras.push(cam);
		},
		
		"init":function(elementId,params){
	
			var domElement=$("#"+elementId);
			
			
			$(document).keypress(function(e) {
				if (e.which==99){
					
					// console.log("hola")

					if (currentCameraNum<otherCameras.length){
						me.setCamera(currentCameraNum+1);

					} else {
						me.setCamera(0);						
					}
				}
			});
			// sobre width y height de pantalla en jquery
			
			// http://ryanve.com/lab/dimensions/
			
			
			
			var _params=$.extend({
				viewportWidth:1920,
				viewportHeight:1080,				
				
			},params);
			
			var ancho=_params.viewportWidth;
			var alto=_params.viewportHeight;
			
			aspect=ancho/alto;
			

			scene = new THREE.Scene(); 
			camZero = new THREE.PerspectiveCamera(65,aspect, 0.1, 1000000); 			
			camZero.position.set(0,10,0);
			
			//alert(alto+" x "+ancho+"a:"+aspect);			
			
			currentCamera=camZero;
			currentCameraNum=0;
			
			renderer = new THREE.WebGLRenderer({antialias:true});
			renderer.setSize(ancho,alto);		
			renderer.setClearColor( 0x444444, 1 );
			
			
			renderer.shadowMap.type = THREE.PCFShadowMap;
			renderer.shadowMap.type = THREE.PCFSoftShadowMap;

			renderer.shadowMap.enabled = (params.activarSombras==true);

	
			
			domElement.get(0).appendChild(renderer.domElement); 
			
			controls = new THREE.OrbitControls(currentCamera, domElement.get(0));
			
			controls.target.x = 0;
			controls.target.y = 0;
			controls.target.z = 100;

//			var gridHelper = new THREE.GridHelper( 500,10 );			
//			gridHelper.color2=0xCCCCCC;
//			scene.add( gridHelper );
			
			scene.fog=new THREE.Fog(0xEEEEFF,10,500);


		

			
			//var pointLightHelper = new THREE.PointLightHelper( pointLight, 5);
			//scene.add( pointLightHelper );
			
			
		//	var axisHelper = new THREE.AxisHelper( 10 );
		//	scene.add( axisHelper );
			
			
			controls.update();
			DEMOAUTO.visualizador.escena=scene;
			
		}, // de init
		
		"doRender":function(){
			renderer.render(scene, currentCamera,false,false);
			
			scene.traverse( function ( object ) {
				if ( object instanceof THREE.LOD ) {
					object.update(currentCamera);
				}
			});			
		},
		"setShadows":function(estado){
			renderer.shadowMap.enabled = estado;
			
		}
		
		
	} // de visualizador
	
	var me=DEMOAUTO.visualizador;
	
}())


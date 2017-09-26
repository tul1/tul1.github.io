"use strict";

var TILE_LENGTH = 40;

var COLOR_OFF = "#156289";//hsl(200, 73%, 31%)
var EMISSIVE_OFF = "#072534";

var COLOR_PATH = "#158928";

var floor=[];
var pathway=[];

function createFloor(nX,nZ) {

	//TODO change name of a and b for something more convinient
	var a=[2, 2.5, 2.5, 2, 1, 0.5, 0.5, 1];
	
	var b=[2.5, 2, 1, 0.5, 0.5, 1, 2, 2.5];

	var triangleVectors=[
		[new THREE.Vector3(0,0,-TILE_LENGTH/2), new THREE.Vector3(TILE_LENGTH/2,0,-TILE_LENGTH/2), new THREE.Vector3(0,0,0)],
		[new THREE.Vector3(TILE_LENGTH/2,0,-TILE_LENGTH/2), new THREE.Vector3(TILE_LENGTH/2, 0, 0), new THREE.Vector3(0,0,0)]
	];

	for(var x=0; x<nX; x++){
		for(var z=0; z<nZ; z++){
			var tile=[];
			var n=0;
			for(var i=0; i<4; i++){
				for(var j=0; j<2; j++){
					var triangle = new THREE.Object3D();
					var lineMaterial = new THREE.LineBasicMaterial({color:0xffffff, transparent:true, opacity:0.5});
					var triangleMaterial = new THREE.MeshPhongMaterial({color:COLOR_OFF ,emissive:EMISSIVE_OFF ,side:THREE.DoubleSide, shading:THREE.FlatShading});

					var geometry = new THREE.Geometry();
					geometry.vertices.push(	triangleVectors[j][0], triangleVectors[j][1], triangleVectors[j][2] );
					var face = new THREE.Face3(0, 1, 2);
					geometry.faces.push(face);

					triangle.add(new THREE.LineSegments(new THREE.Geometry(), lineMaterial));
					triangle.add( new THREE.Mesh( new THREE.Geometry(), triangleMaterial));

					triangle.children[ 0 ].geometry = new THREE.WireframeGeometry(geometry);
					triangle.children[ 1 ].geometry = geometry;

					triangle.rotation.y = -Math.PI*i/2;
					triangle.position.x = TILE_LENGTH*x+TILE_LENGTH/2;
					triangle.position.z = -TILE_LENGTH*z-TILE_LENGTH/2;

					var xCoord = TILE_LENGTH*(a[n]/3 + x);
					var zCoord = -TILE_LENGTH*(b[n]/3 + z);

					n++;
					tile.push({'triangle':triangle,'number':n,'state':"OFF",'padBarycenter':{'x':xCoord,'z':zCoord}});
					scene.add(triangle);
				}
			}

			//convert to 3D group from threejs
			floor.push({'tile':tile,'x':x,'z':z});
		}
	}
}


function clearFloor(){
	pathway=[];
	for(var i=0;i<floor.length; i++){
		for(var j=0;j<floor[i].tile.length; j++){
			floor[i].tile[j].triangle.children[1].material.color.set(COLOR_OFF);
			floor[i].tile[j].state="OFF";
		}
	}
}

function hexToRGB(hexColor){
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
		} : null;
}

function hexToHSL(hexColor){
	var rgb = hexToRGB(hexColor);
	var r = rgb.r/255;
	var g = rgb.g/255;
	var b = rgb.b/255;
	var max=Math.max(r,g,b), min=Math.min(r,g,b);
	var h,s,l=(max+min)/2;

	if (max==min){
		h=s=0; // achromatic
	}else{
		var d=max-min;
		s=l>0.5?d/(2-max-min):d/(max+min);
		switch(max){
			case r: h=(g-b)/d+(g<b?6:0); break;
			case g: h=(b-r)/d+2; break;
			case b: h=(r-g)/d+4; break;
		}
		h/=6;
	}
	return [h,s,l];
}

function composeActivityColor(intensity){//intensity goes from 0 to 127
	var MIN_ACTIVITY_HUE_COLOR = 45;
	var MAX_ACTIVITY_VALUE = 128;
	var hue = -MIN_ACTIVITY_HUE_COLOR*intensity/MAX_ACTIVITY_VALUE+MIN_ACTIVITY_HUE_COLOR;
	return "hsl("+hue+",90%,55%)";
}



// function updateFloor(activeTiles){//TODO change tile for active pad
// 	for(var i=0;i<floor.length; i++){
// 		for(var j=0;j<floor[i].tile.length; j++){
			
// 			floor[i].tile[j].triangle.children[1].material.color.set(COLOR_OFF);
// 			floor[i].tile[j].state="OFF";

// 			for(var k=0; k<activeTiles.length; k++){
// 				if(activeTiles[k].x == floor[i].x &&
// 					activeTiles[k].z == floor[i].z && 
// 					activeTiles[k].number == floor[i].tile[j].number){					
					
// 					var trianglePadColor = composeActivityColor(activeTiles[k].intensity);
// 					floor[i].tile[j].triangle.children[1].material.color.set(trianglePadColor);	
// 					floor[i].tile[j].state="ON";
					
// 					activeTiles[k].padBarycenter = floor[i].tile[j].padBarycenter;
// 				}
// 			}
// 		}
// 	}

// 	var intensitySum = 0;
// 	for(var i=0; i<activeTiles.length; i++)
// 		intensitySum += activeTiles[i].intensity;

// 	var posX=0;
// 	var posZ=0;
// 	for(var i=0; i<activeTiles.length; i++) {
// 		posX += activeTiles[i].intensity*activeTiles[i].padBarycenter.x;
// 		posZ += activeTiles[i].intensity*activeTiles[i].padBarycenter.z;
// 	}
// 	var actualPosition = {'posX': posX/intensitySum,'posZ': posZ/intensitySum};
	
// 	pathway.push(activeTiles);

// 	return actualPosition;
// }

function updateFloor(activeTiles){//TODO change tile for active pad
	console.log(activeTiles);
	if(activeTiles.length>0){
		for(var i=0;i<floor.length; i++){
			for(var j=0;j<floor[i].tile.length; j++){
				
				// floor[i].tile[j].triangle.children[1].material.color.set(COLOR_OFF);
				// floor[i].tile[j].state="OFF";

						var trianglePadColor = composeActivityColor(activeTiles[k].intensity);
						floor[i].tile[j].triangle.children[1].material.color.set(trianglePadColor);	
						floor[i].tile[j].state="ON";

				// for(var k=0; k<activeTiles.length; k++){
				// 	if(activeTiles[k].x == floor[i].x &&
				// 		activeTiles[k].z == floor[i].z && 
				// 		activeTiles[k].number == floor[i].tile[j].number){					
				// 		var trianglePadColor = composeActivityColor(activeTiles[k].intensity);
				// 		floor[i].tile[j].triangle.children[1].material.color.set(trianglePadColor);	
				// 		floor[i].tile[j].state="ON";
						
						//activeTiles[k].padBarycenter = floor[i].tile[j].padBarycenter;
				//	}
				}
			}
		}

		// var intensitySum = 0;
		// for(var i=0; i<activeTiles.length; i++)
		// 	intensitySum += activeTiles[i].intensity;

		// var posX=0;
		// var posZ=0;
		// for(var i=0; i<activeTiles.length; i++) {
		// 	posX += activeTiles[i].intensity*activeTiles[i].padBarycenter.x;
		// 	posZ += activeTiles[i].intensity*activeTiles[i].padBarycenter.z;
		// }
		// var actualPosition = {'posX': posX/intensitySum,'posZ': posZ/intensitySum};
		
		// pathway.push(activeTiles);

		// return actualPosition;		
	}

}


function showPathway(){
	if(pathway.length>1){
		for(var i=0; i<floor.length; i++){
			for(var j=0; j<floor[i].tile.length; j++){
				for(var k=0; k<pathway.length-1; k++){
					for(var l=0; l<pathway[k].length; l++){
						if(pathway[k][l].x == floor[i].x &&
						 	pathway[k][l].z == floor[i].z && 
						 	pathway[k][l].number == floor[i].tile[j].number &&
						 	floor[i].tile[j].state != "ON"	){

							floor[i].tile[j].triangle.children[1].material.color.set(COLOR_PATH);
							floor[i].tile[j].state="PATHWAY";

						}
					}
				}
			}
		}
	}
}
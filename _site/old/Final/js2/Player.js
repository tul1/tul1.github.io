"use strict";

var DEMO =  DEMO || {};

(function(){

	function Player(){
		// -----------------------------------------------------------------------
		this._scene;
		this._world;
		this._playerParams;
		this._botsParams;
		var pl = planck, Vec2 = pl.Vec2;
		var BALL_R = 0.35;
		// -----------------------------------------------------------------------
		var CYLINDER_HEIGHT = 1.5;
		var geometry = new THREE.CylinderGeometry( BALL_R, BALL_R, CYLINDER_HEIGHT, 32 );
		var material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );
		var cylinder = new THREE.Mesh( geometry, material );
		cylinder.position.y = CYLINDER_HEIGHT/2;
		// -----------------------------------------------------------------------
	    var client = null;
		this._position = {x:0.0, y:0.0};
	    var POSITION_SCALE_FACTOR = 1;
		// -----------------------------------------------------------------------
		this.init=function(scene,params,world){
			this._scene = scene;
			this._world = world;
			this._playerParams = params;

			var p = this._world.createKinematicBody();
			p.setPosition({x: 0.0, y: 0.0});
			p.createFixture(pl.Circle(BALL_R), {});
			this.physicModel = p;

			if(this._playerParams.avatar == "cylinder"){
				this._scene.add(cylinder);
			}
			if(this._playerParams.avatar == "carChasis"){
				console.log("car chasis");
			}
			if(this._playerParams.avatar=="none"){

			}
					
			if(this._playerParams.control=="solsens"){
				//TODO test
				client = io.connect('http://192.168.5.5:8000');
				client.on('objects-update', function(objects){
					this._position = {'x':(objects[0].x*POSITION_SCALE_FACTOR),'y':-(objects[0].y*POSITION_SCALE_FACTOR)};
				});
			}
		}
		// -----------------------------------------------------------------------
		this.update=function(position){
			if(this._playerParams.control=="mocFile"){
				this.physicModel.setPosition(position);
				cylinder.position.x=position.x;
				cylinder.position.z=position.y;		
			}else{
				this.physicModel.setPosition(this._position);
				cylinder.position.x=this._position.x;
				cylinder.position.z=this._position.y;
			}
	
		}
	}
	DEMO.player = new Player();

}())
"use strict";

var DEMO = DEMO || {};

(function(){
	//-----------------------------------------------------------------------
	function Bots(){
		// -----------------------------------------------------------------------
		this._scene;
		var _me = this;
		this._world = null;
		var clock = new THREE.Clock();
		// -----------------------------------------------------------------------
		var BOT_ORIENTATION_ANGLE = -Math.PI/2;
		var BOT_SCALE_FACTOR = 0.01;
		var SPEED_COEFICIENT = 0.3;
		this._bots = [];
		this._botsParams = null;
		// -----------------------------------------------------------------------
		//Physic parameters
		var pl = planck, Vec2 = pl.Vec2;
		this._botFixDef = {
		  friction: 1000,
		  restitution: 0.99,
		  mass: 60,
		  userData:'bot'
		};
		var botBodyDef = {
		  linearDamping: 0.5,
		  angularDamping: 0.1
		};
		var BALL_R = 0.35;
		// -----------------------------------------------------------------------
		this.loadSkeletalMeshes=function() {
			for(var i=0; i<this._botsParams.length; i++){
				var bot={};
				this._bots[i]=bot;
				bot.blendMesh = new THREE.SpeedBlendCharacter();
				bot.blendMesh.load( "./models/marine/marine_anims.js", dispachMeshLoadingEnd);
			}
		}
		// -----------------------------------------------------------------------
		this.init=function(scene, params, world){
			this._botsParams = params;
			this._scene = scene;
			this._world = world;
			this.loadSkeletalMeshes();
		}
		// -----------------------------------------------------------------------
		var modelLoaded=0;
		function dispachMeshLoadingEnd(){
			modelLoaded++;
			if(modelLoaded == botsParams.length)
				_me.addBotsToTheScene();
		}
		// -----------------------------------------------------------------------
		this.addBotsToTheScene=function() {
			for(var i=0; i < this._botsParams.length; i++){
				this._bots[i].blendMesh.rotation.y = BOT_ORIENTATION_ANGLE;
				this._bots[i].blendMesh.scale.set(BOT_SCALE_FACTOR, BOT_SCALE_FACTOR, BOT_SCALE_FACTOR);
				this._bots[i].blendMesh.position.x = botsParams[i].x;
				this._bots[i].blendMesh.position.y = botsParams[i].y;
				this._bots[i].blendMesh.position.z = botsParams[i].z;
				this._bots[i].characterController = new THREE.CharacterController( this._bots[i].blendMesh );
				this._bots[i].wasImpacted = false;

				var bot = this._world.createDynamicBody(botBodyDef);
				bot.bodyID = i;
				bot.setBullet(true);
				bot.setPosition({x: botsParams[i].x, y: botsParams[i].z});
				bot.createFixture(pl.Circle(BALL_R), this._botFixDef);
				bot.setLinearVelocity(Vec2(botsParams[i].speed, 0.0));
				this._bots[i].physicModel = bot;		
				this._scene.add(this._bots[i].blendMesh);
			}
		}
		// -----------------------------------------------------------------------
		this.update=function() {
			var scale = 1;
			var delta = clock.getDelta();
			var stepSize = delta * scale;
			THREE.AnimationHandler.update( stepSize );
			for(var i=0; i<this._botsParams.length; i++) {
				if(this._bots[i].wasImpacted == true){
					var speed = this._bots[i].physicModel.getLinearVelocity();
					this._bots[i].characterController.update( Math.abs(speed.x*SPEED_COEFICIENT) );
					this._bots[i].blendMesh.position.x = this._bots[i].physicModel.getPosition().x;
					this._bots[i].blendMesh.position.z = this._bots[i].physicModel.getPosition().y;
				}else{
					this._bots[i].physicModel.setLinearVelocity(Vec2(botsParams[i].speed,0))
					this._bots[i].characterController.update( Math.abs(botsParams[i].speed*SPEED_COEFICIENT) );
				}
			}
		}
	}
	// ------------------------------------------------------------------------
	DEMO.bots = new Bots();

}())
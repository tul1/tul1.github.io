"use strict";

var DEMO_BOTS =  DEMO_BOTS || {};

(function(){

	function Bots(){
		// -----------------------------------------------------------------------
		this._scene;
		var _me = this;
		// -----------------------------------------------------------------------
		//TODO pasar como argumento
		var botsParams = [
		  {x:0,y:0,z:-0.5,speed:1.5},{x:1,y:0,z:0.5,speed:1.5},
		  {x:2,y:0,z:-0.5,speed:1.5},{x:3,y:0,z:0.5,speed:1.5},
		  {x:4,y:0,z:-0.5,speed:1.5},{x:5,y:0,z:0.5,speed:1.5}
		];
		var botsOrientationAngle = -Math.PI/2;
		// var botsSpeed = 1.5;
		var botScaleFactor = 0.01;

		this._bots = [];

		// -----------------------------------------------------------------------
		//Physic parameters
		var pl = planck, Vec2 = pl.Vec2;
		var WorldDef={
		  gravity : Vec2.zero(),
		  allowSleep : false,
		  warmStarting : true,
		  continuousPhysics : true,
		  subStepping : true,
		  blockSolve : false,
		  velocityIterations : 10,
		  positionIterations : 5
		};

		var botFixDef = {
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
		this._world = pl.World(WorldDef);

		// -----------------------------------------------------------------------
		this.loadSkeletalMeshes=function() {
			for(var i=0; i<botsParams.length; i++){
				var bot={};
				this._bots[i]=bot;
				bot.blendMesh = new THREE.SpeedBlendCharacter();
				bot.blendMesh.load( "./threeJSDemos/models/marine/marine_anims.js", dispachMeshLoadingEnd);
			}
		}
		// -----------------------------------------------------------------------
		this.init=function(scene) {
			this._scene=scene;
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
			for(var i=0; i < botsParams.length; i++){
				this._bots[i].blendMesh.rotation.y = botsOrientationAngle;
				this._bots[i].blendMesh.scale.set(botScaleFactor, botScaleFactor, botScaleFactor);

				this._bots[i].blendMesh.position.x = botsParams[i].x;
				this._bots[i].blendMesh.position.y = botsParams[i].y;
				this._bots[i].blendMesh.position.z = botsParams[i].z;

				this._bots[i].characterController = new THREE.CharacterController( this._bots[i].blendMesh );

				this._bots[i].wasImpacted = false;

				var bot = this._world.createDynamicBody(botBodyDef);
				bot.bodyID = i;
				bot.setBullet(true);
				bot.setPosition({x: botsParams[i].x, y: botsParams[i].z});
				bot.createFixture(pl.Circle(BALL_R), botFixDef);
				bot.setLinearVelocity(Vec2(botsParams[i].speed, 0.0));
				this._bots[i].physicModel = bot;
			
				this._scene.add(this._bots[i].blendMesh);

			}
		}

		// -----------------------------------------------------------------------
		var SPEED_COEFICIENT = 0.3;
		this.update=function(delta) {
			var scale = 1;
			var stepSize = delta * scale;
			this._world.step(1 / 60);

			THREE.AnimationHandler.update( stepSize );
			for(var i=0; i<botsParams.length; i++) {
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

		// -----------------------------------------------------------------------
		this._world.on('post-solve', function(contact) {
			var fA = contact.getFixtureA(), bA = fA.getBody();
			var fB = contact.getFixtureB(), bB = fB.getBody();
			var bot = fA.getUserData() == botFixDef.userData && bA || fB.getUserData() == botFixDef.userData && bB;
			bots[bot.bodyID].wasImpacted=true;
		});
	}
	
	DEMO_BOTS.bots = new Bots();

}())

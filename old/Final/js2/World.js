"use strict";

var DEMO = DEMO || {};

(function(){
	//-----------------------------------------------------------------------
	var bots = DEMO.bots._bots;
	var botFixDef = DEMO.bots._botFixDef
	//-----------------------------------------------------------------------
	function World(){
		//-----------------------------------------------------------------------
		this._world=null;
		//-----------------------------------------------------------------------
		this.init=function(params){
			this._world = planck.World(params);
			this._world.on('post-solve', function(contact) {
				var fA = contact.getFixtureA(), bA = fA.getBody();
				var fB = contact.getFixtureB(), bB = fB.getBody();
				var bot = fA.getUserData() == botFixDef.userData && bA || fB.getUserData() == botFixDef.userData && bB;
				bots[bot.bodyID].wasImpacted=true;
			});
		}
		//-----------------------------------------------------------------------
		this.getPhysicModel=function(speed){
			return this._world;
		}
		//-----------------------------------------------------------------------
		this.update=function(speed){
			this._world.step(speed);
		}
	}
	//-----------------------------------------------------------------------
	DEMO.world = new World();
}())



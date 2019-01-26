THREE.CharacterController = function ( speedBlendCharacter ) {


  this.character = speedBlendCharacter;
  this.walkSpeed = 3;
  this.runSpeed = 7;

  // ---------------------------------------------------------------------------
  this.update = function( speed ) {
    var newSpeed = speed;
    var forward = this.character.getForward();
    var finalSpeed = ( newSpeed > 0.5 ) ? newSpeed * this.runSpeed:( newSpeed / 0.5 ) * this.walkSpeed;
    this.character.setSpeed( newSpeed );
    this.character.position.add( forward.multiplyScalar( finalSpeed ) );
  };


 }
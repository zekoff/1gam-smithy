/* global Phaser, game */
var HEIGHT = 1920;
var WIDTH = 1080;
var TRANSITION_TIME = 3000;

var Scene = function() {
    Phaser.Group.call(this, game);
};
Scene.prototype = Object.create(Phaser.Group.prototype);
Scene.prototype.constructor = Scene;
Scene.prototype.setOnscreen = function() {
    this.x = 0;
};
Scene.prototype.setOffscreen = function() {
    this.x = WIDTH;
};
Scene.prototype.transitionOut = function() {
    game.add.tween(this).to({
        x: -WIDTH
    }, TRANSITION_TIME, Phaser.Easing.Cubic.In, true);
};
Scene.prototype.transitionIn = function() {
    this.x = WIDTH;
    game.add.tween(this).to({
        x: 0
    }, TRANSITION_TIME, Phaser.Easing.Cubic.Out, true);
};
Scene.prototype.addToScene = function(object, x, y) {
    this.add(object);
    object.anchor.set(0.5);
    object.x = WIDTH * x;
    object.y = HEIGHT * y;
};

module.exports = Scene;
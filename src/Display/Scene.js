/* global Phaser, game, smithy */
var HEIGHT = smithy.GAME_HEIGHT;
var WIDTH = smithy.GAME_WIDTH;

var Scene = function() {
    Phaser.Group.call(this, game);
    ['underlay', 'overlay'].forEach(function(prop) {
        this[prop] = game.make.image(0, 0, 'pix');
        this[prop].height = HEIGHT;
        this[prop].width = WIDTH;
        this[prop].alpha = 0;
        this.add(this[prop]);
    }, this);
    this.underlay.inputEnabled = true;
};
Scene.prototype = Object.create(Phaser.Group.prototype);
Scene.prototype.constructor = Scene;
Scene.prototype.TRANSITION_TIME = 3000;
Scene.prototype.setOnscreen = function() {
    this.x = 0;
};
Scene.prototype.setOffscreen = function() {
    this.x = WIDTH;
};
Scene.prototype.transitionOut = function() {
    game.add.tween(this).to({
        x: -WIDTH
    }, this.TRANSITION_TIME, Phaser.Easing.Cubic.In, true);
};
Scene.prototype.transitionIn = function() {
    this.x = WIDTH;
    game.add.tween(this).to({
        x: 0
    }, this.TRANSITION_TIME, Phaser.Easing.Cubic.Out, true);
};
Scene.prototype.addToScene = function(object, x, y) {
    this.add(object);
    object.anchor.set(0.5);
    object.x = WIDTH * x;
    object.y = HEIGHT * y;
    this.bringToTop(this.overlay);
};

module.exports = Scene;
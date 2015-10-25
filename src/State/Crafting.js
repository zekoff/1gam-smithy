/* global game, Phaser, smithy */
var Scene = require('../Display/Scene');
var HEIGHT = smithy.GAME_HEIGHT;
var WIDTH = smithy.GAME_WIDTH;

var Crafting = {};

var STANDBY = 0;
var POWERING_UP = 1;
var AIMING = 2;
var ANIMATING = 3;

var DEBUG_VALUE = 0;
var DEBUG_TIMER = 0;
var COUNT_TIME = false;

var currentTween;

Crafting.create = function() {
    this.smithingScene = new Scene();
    this.smithingScene.setOffscreen();

    this.state = STANDBY;

    var fillBarBg = game.make.image(0, 0, 'pix');
    fillBarBg.height = 400;
    fillBarBg.width = 50;
    this.smithingScene.addToScene(fillBarBg, 0.5, 0.5);
    var fillBar = game.add.image(0, 0, 'pix');
    fillBar.height = 0;
    fillBar.width = 50;
    fillBar.tint = 0x00ff00;
    this.smithingScene.addToScene(fillBar, 0.5, 0.5);
    var aimCircle = game.add.image(0, 0, 'circle');
    aimCircle.height = 600;
    aimCircle.width = 600;
    aimCircle.alpha = 0;
    this.smithingScene.addToScene(aimCircle, 0.5, 0.8);
    currentTween = null;

    var smithingSequence = function() {
        COUNT_TIME = true;
        print('starting sequence');
        this.state = POWERING_UP;
        var scene = this.smithingScene;
        currentTween = game.add.tween(fillBar);
        currentTween.to({
            height: 400
        }, 2000, Phaser.Easing.Linear.In);
        currentTween.to({
            height: 0
        }, 2000, Phaser.Easing.Linear.In);
        currentTween.onComplete.addOnce(function() {
            this.state = AIMING;
            DEBUG_VALUE += fillBar.height / 400 * 50;
            aimCircle.alpha = 1;
            currentTween = game.add.tween(aimCircle);
            currentTween.to({
                height: 0,
                width: 0
            }, 2000, Phaser.Easing.Linear.In);
            currentTween.onComplete.addOnce(function() {
                this.state = ANIMATING;
                DEBUG_VALUE += (600 - aimCircle.height) / 600 * 50;
                print(DEBUG_VALUE);
            }, this);
            currentTween.start();
        }, this);
        print(currentTween.totalDuration);
        currentTween.start();
        scene.overlay.events.onInputUp.add(function() {
            currentTween.stop(true);
        }, this);
    }.bind(this);

    this.overlay = game.add.image(0, 0, 'pix');
    this.overlay.height = HEIGHT;
    this.overlay.width = WIDTH;
    this.overlay.alpha = 0;

    this.smithingScene.transitionIn();
    this.smithingScene.overlay.inputEnabled = true;
    this.smithingScene.overlay.events.onInputUp.addOnce(smithingSequence);
    this.overlay.inputEnabled = true;
    this.overlay.events.onInputUp.add(function() {
        print('clicked');
    });
    game.time.events.add(this.smithingScene.TRANSITION_TIME, function() {
        this.overlay.inputEnabled = false;
    }, this);
};

Crafting.update = function() {
    if (COUNT_TIME)
        DEBUG_TIMER += game.time.physicsElapsed;
    if (DEBUG_TIMER > 4) print(DEBUG_TIMER);
};

module.exports = Crafting;
/* global game, Phaser */
var Scene = require('../Display/Scene');

var Crafting = {};

var STANDBY = 0;
var POWERING_UP = 1;
var AIMING = 2;
var ANIMATING = 3;

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
    var fillTween = null;

    this.smithingScene.transitionIn();

    game.time.events.add(2000, function() {
        
        game.input.onUp.add(function() {
            if (this.state === POWERING_UP) {
                fillTween.stop();
                print("" + fillBar.height / 400 * 100 + "%");
                game.time.events.add(1000, function() {
                    fillTween = null;
                    this.state = STANDBY;
                    fillBar.height = 0;
                    this.smithingScene.transitionOut();
                }, this);
                return;
            }
            this.state = POWERING_UP;
            fillTween = game.add.tween(fillBar);
            fillTween.to({
                height: 400
            }, 1500, Phaser.Easing.Linear.In);
            fillTween.to({
                height: 0
            }, 0, Phaser.Easing.Linear.Out);
            fillTween.onComplete.add(function() {
                this.state = STANDBY;
            });
            fillTween.start();
        }, this);

    }, this);

};

Crafting.update = function() {};

module.exports = Crafting;
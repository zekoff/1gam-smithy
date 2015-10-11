/* global game, Phaser */

var Main = {};

Main.create = function() {
    var fillBarBg = game.add.image(540, 960, 'pix');
    fillBarBg.anchor.set(0.5);
    fillBarBg.height = 400;
    fillBarBg.width = 50;
    var fillBar = game.add.image(540, fillBarBg.bottom, 'pix');
    fillBar.anchor.set(0.5, 1);
    fillBar.height = 0;
    fillBar.width = 50;
    fillBar.tint = 0x00ff00;

    game.input.onUp.add(function() {
        var fillTween = game.add.tween(fillBar);
        fillTween.to({
            height: 400
        }, 1000, Phaser.Easing.Quadratic.In);
        fillTween.to({
            height: 0
        }, 0, Phaser.Easing.Quadratic.Out);
        fillTween.start();
    });
};

Main.update = function() {};

module.exports = Main;
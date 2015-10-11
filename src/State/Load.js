/* global game, Phaser */

var Load = {};

Load.preload = function() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.load.baseURL = './assets/';
};

Load.create = function() {
    game.load.image('pix');
    game.load.start();
};

Load.update = function() {
    if (game.load.hasLoaded) game.state.start('Title');
};

module.exports = Load;
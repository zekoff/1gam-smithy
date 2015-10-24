/* global game, Phaser */

var Load = {};

var image = null;

Load.preload = function() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.load.baseURL = './assets/';
    
    image = game.load.image.bind(game.load);
};

Load.create = function() {
    image('pix');
    image('circle');
    game.load.start();
};

Load.update = function() {
    if (game.load.hasLoaded) game.state.start('Title');
};

module.exports = Load;
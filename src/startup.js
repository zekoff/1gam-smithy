/* global game, Phaser */
global.smithy = {
    GAME_HEIGHT: 1920,
    GAME_WIDTH: 1080
};
global.game = new Phaser.Game(1080, 1920);
global.print = console.log.bind(console);
game.state.add('Load', require('./State/Load'));
game.state.add('Title', require('./State/Title'));
game.state.add('Main', require('./State/Main'));
game.state.add('Crafting', require('./State/Crafting'));
game.state.start('Load');
var assert = require('assert');
var World = require("matter-js").World;
var Engine = require("matter-js").Engine;

//Game
var Game = require("../src/models/Game.js");
var Entity = require("../src/models/Entity/Entity.js");
var Projectile = require("../src/models/Entity/Projectile.js");

var MockGame = new Game(document.createElement("div"));
describe('ObjectManager', function () {
 it('Object is removed on death', function () {

        var world = Game.world;

        for(var i=0;i<10;i++)
        {
            var p = new Projectile();
            MockGame.objects.push(p);
        }
        assert.equal(TestEngine.world.bodies.length,0);
    });
 it('should return first charachter of the string', function () {
        assert.equal("Hello".charAt(0), 'H');
    });
});
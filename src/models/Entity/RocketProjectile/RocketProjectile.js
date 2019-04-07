import Entity from "../Entity.js";
import Projectile from "../Projectile.js";
import RocketExplosionEmitter from "./ExplosionEmitter";
import RocketTrailEmitter from "./TrailEmitter";

export default class RocketProjectile extends Projectile {
	constructor(game,props)
	{
		var projectileType = {
            class: "RocketProjectile",
            maxLifetime: 1200,
			directDamage: 12,
			trailEmitter: RocketTrailEmitter,
			explosionEmitter: RocketExplosionEmitter,
        }
        super(game,Object.assign(projectileType, props));
	}
}
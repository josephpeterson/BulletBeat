import Victor from "victor";

export default class ObjectManager extends Array {
    constructor(game)
    {
        super();
        this.game = game;
    }
  test()
  {
      console.log("test me");
  }
  push(entity)
  {
      entity.game = this.game;
      Array.prototype.push.bind(this)(entity);
  }
  all(cb)
  {
      for(var i=0;i<this.length;i++)
        cb(this[i]);
  }
}
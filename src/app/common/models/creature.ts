import { ICreature } from '../interfaces/creature.interface';
import { TId } from '../types';

export class Creature implements ICreature {
  private readonly _id: TId;
  private readonly _x: number;
  private readonly _y: number;
  private _alive: boolean;

  constructor(x: number, y: number, alive = false) {
    this._id = `${x},${y}`;
    this._alive = alive;
    this._x = x;
    this._y = y;
  }

  public get Id() {
    return this._id;
  }

  public get X() {
    return this._x;
  }

  public get Y() {
    return this._y;
  }

  public get Alive() {
    return this._alive;
  }

  public Kill() {
    this._alive = false;
  }

  public Revive() {
    this._alive = true;
  }
}

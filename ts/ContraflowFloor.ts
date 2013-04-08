/**
 * Created with IntelliJ IDEA.
 * User: Bob_Mk2
 * Date: 13/04/09
 * Time: 1:40
 * To change this template use File | Settings | File Templates.
 */

/**
 * 一方通行の床です
 */
/// <reference path="Floor.ts" />
/// <reference path="Player.ts" />
class CounterflowFloor extends Floor
{
	/**
	 * 北から南
	 * @type {number}
	 */
	static public NORTH_TO_SOUTH:number = 1;

	/**
	 * 南から北
	 * @type {number}
	 */
	static public SOUTH_TO_NORTH:number = 2;

	/**
	 * 西から東
	 * @type {number}
	 */
	static public EAST_TO_WEST:number = 3;

	/**
	 * 東から西
	 * @type {number}
	 */
	static public WEST_TO_EAST:number = 4;

	private _direction:number;

	/*
	constructor()
	{

	}
	*/
	constructor(direction:number)
	{
		super();
		this._direction = direction;
	}

	//床系のイベント
	public onEnterFloor(player:Player):void {
//		player.isBound = true;
		console.log("user on counterflow");
		player.reserveMove(player.turnLeft);
	}

	public onLeaveFloor(player:Player):void
	{
		console.log("* You moved automatically *");
//		player.isBound = false;
	}
}
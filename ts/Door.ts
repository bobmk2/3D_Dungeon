/**
 * Created with IntelliJ IDEA.
 * User: Bob_Mk2
 * Date: 13/04/07
 * Time: 23:52
 * To change this template use File | Settings | File Templates.
 */
/// <reference path="IMapEvent.ts" />
/// <reference path="Player.ts" />
class Door implements IMapEvent {

	constructor() {

	}

	/**
	 * この扉を通過させる
	 * TODO protected化
	 * @param player
	 * @private
	 */
	public _passThrough(player:Player):void
	{
		var posX:number = player.getPosX();
		var posY:number = player.getPosY();

		switch(player.getDirection())
		{
			case Player.DIR_NORTH:
				posY --;
				break;
			case Player.DIR_WEST:
				posX --;
				break;
			case Player.DIR_SOUTH:
				posY ++;
				break;
			case Player.DIR_EAST:
				posX ++;
				break;
		}

		player.warpTo(posX, posY);
	}

	//壁系のイベント
	public onSearchWall (player:Player):void {
		console.log("* this door is opened *");
		this._passThrough(player);
	}

	//床系のイベント
	public onEnterFloor(player:Player):void {

	}

	public onLeaveFloor(player:Player):void {

	}

	public onSearchFloor(player:Player):void
	{
	}
}
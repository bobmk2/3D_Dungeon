/**
 * Created with IntelliJ IDEA.
 * User: Bob_Mk2
 * Date: 13/04/07
 * Time: 3:08
 * To change this template use File | Settings | File Templates.
 */
/// <reference path="Player.ts" />
interface IMapEvent
{
	//壁系のイベント
	onSearchWall(player:Player) : void;

	//床系のイベント
	onEnterFloor(player:Player) : void;
	onLeaveFloor(player:Player) : void;
	onSearchFloor(player:Player) : void;
}
/**
 * Created with IntelliJ IDEA.
 * User: Bob_Mk2
 * Date: 13/04/09
 * Time: 1:28
 * To change this template use File | Settings | File Templates.
 */

/// <reference path="IMapEvent.ts" />
/// <reference path="Player.ts" />
/**
 * ただの床です
 * 床に乗った時・床から去った時・床を探索した時のイベントを子クラスで実装してください
 */
class Floor implements IMapEvent
{
	constructor()
	{

	}

	//壁系のイベント
	public onSearchWall (player:Player):void {
	}

	//床系のイベント
	public onEnterFloor(player:Player):void {

	}

	public onRemoveFloor(player:Player):void {

	}

	public onSearchFloor(player:Player):void
	{
	}
}
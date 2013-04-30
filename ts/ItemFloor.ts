/**
 * Created with IntelliJ IDEA.
 * User: Bob_Mk2
 * Date: 13/04/09
 * Time: 1:40
 * To change this template use File | Settings | File Templates.
 */

/**
 * アイテムが落ちてる床です
 * 一回拾われたら二度と拾えません
 */
/// <reference path="Floor.ts" />
/// <reference path="Player.ts" />
class ItemFloor extends Floor
{
	private _item:any;
	private _isPickedUpItem:bool;

	private _func:Function;

	constructor()
	{
		super();
	}

	public setItem(item:any):void
	{
		this._item = item;
	}

	public setCallback(func:Function):void
	{
		this._func = func;
	}

	//床系のイベント
	public onEnterFloor(player:Player):void {
		if(!this._isPickedUpItem)
		{
			console.log("* You found the item [" + this._item + "] *");
			player.addItem(this._item);
			this._isPickedUpItem = true;
			if(this._func)
			{
				this._func.apply(null, new Array(this._item.toString()));
			}
		}
	}
}
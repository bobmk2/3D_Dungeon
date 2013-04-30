/**
 * Created with IntelliJ IDEA.
 * User: Bob_Mk2
 * Date: 13/04/09
 * Time: 0:47
 * To change this template use File | Settings | File Templates.
 */

/// <reference path="Door.ts" />
// <reference path="Player.ts" />
class LockedDoor extends Door
{
	private _isLocked:bool;
	private _openKey:any;

	constructor(isLocked? : bool = true){
		super();
		this._isLocked = isLocked;
	}

	public setOpenKey(key:any):void
	{
		this._openKey = key;
	}

	/**]
	 * @override
	 * @param player
	 */
	public onSearchWall(player:Player):void
	{
		if(this._isLocked)
		{
			if(player.hasItem(this._openKey))
			{
				//開けられた
				if(this._searchCallback != null)
				{
					this._searchCallback.apply(null, ["You opened the door"]);
				}
				this._isLocked = false;
			}
			else
			{
				//開けられなかった
				if(this._searchCallback != null)
				{
					this._searchCallback.apply(null, ["The door is locked"]);
				}
			}
		}
		else
		{
			super._passThrough(player);
		}
	}
}
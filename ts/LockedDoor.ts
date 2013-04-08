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
			console.log("* this door is locked *");
			if(player.hasItem(this._openKey))
			{
				console.log("* You could open the door *");
				this._isLocked = false;
			}
		}
		else
		{
			super._passThrough(player);
		}
	}
}
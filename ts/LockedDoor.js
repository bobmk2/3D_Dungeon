var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var LockedDoor = (function (_super) {
    __extends(LockedDoor, _super);
    function LockedDoor(isLocked) {
        if (typeof isLocked === "undefined") { isLocked = true; }
        _super.call(this);
        this._isLocked = isLocked;
    }
    LockedDoor.prototype.setOpenKey = function (key) {
        this._openKey = key;
    };
    LockedDoor.prototype.onSearchWall = function (player) {
        if(this._isLocked) {
            console.log("* this door is locked *");
            if(player.hasItem(this._openKey)) {
                console.log("* You could open the door *");
                this._isLocked = false;
            }
        } else {
            _super.prototype._passThrough.call(this, player);
        }
    };
    return LockedDoor;
})(Door);

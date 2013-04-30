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
            if(player.hasItem(this._openKey)) {
                if(this._searchCallback != null) {
                    this._searchCallback.apply(null, [
                        "You opened the door"
                    ]);
                }
                this._isLocked = false;
            } else {
                if(this._searchCallback != null) {
                    this._searchCallback.apply(null, [
                        "The door is locked"
                    ]);
                }
            }
        } else {
            _super.prototype._passThrough.call(this, player);
        }
    };
    return LockedDoor;
})(Door);

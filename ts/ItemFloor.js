var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ItemFloor = (function (_super) {
    __extends(ItemFloor, _super);
    function ItemFloor() {
        _super.call(this);
    }
    ItemFloor.prototype.setItem = function (item) {
        this._item = item;
    };
    ItemFloor.prototype.onEnterFloor = function (player) {
        if(!this._isPickedUpItem) {
            console.log("* You found the item [" + this._item + "] *");
            player.addItem(this._item);
            this._isPickedUpItem = true;
        }
    };
    return ItemFloor;
})(Floor);

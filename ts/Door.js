var Door = (function () {
    function Door() {
    }
    Door.prototype._passThrough = function (player) {
        var posX = player.getPosX();
        var posY = player.getPosY();
        switch(player.getDirection()) {
            case Player.DIR_NORTH:
                posY--;
                break;
            case Player.DIR_WEST:
                posX--;
                break;
            case Player.DIR_SOUTH:
                posY++;
                break;
            case Player.DIR_EAST:
                posX++;
                break;
        }
        player.warpTo(posX, posY);
    };
    Door.prototype.onSearchWall = function (player) {
        console.log("* this door is opened *");
        this._passThrough(player);
    };
    Door.prototype.onEnterFloor = function (player) {
    };
    Door.prototype.onLeaveFloor = function (player) {
    };
    Door.prototype.onSearchFloor = function (player) {
    };
    return Door;
})();

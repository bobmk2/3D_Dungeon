var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var CounterflowFloor = (function (_super) {
    __extends(CounterflowFloor, _super);
    function CounterflowFloor(direction) {
        _super.call(this);
        this._direction = direction;
    }
    CounterflowFloor.NORTH_TO_SOUTH = 1;
    CounterflowFloor.SOUTH_TO_NORTH = 2;
    CounterflowFloor.EAST_TO_WEST = 3;
    CounterflowFloor.WEST_TO_EAST = 4;
    CounterflowFloor.prototype.onEnterFloor = function (player) {
        console.log("user on counterflow");
        player.reserveMove(player.turnLeft);
    };
    CounterflowFloor.prototype.onLeaveFloor = function (player) {
        console.log("* You moved automatically *");
    };
    return CounterflowFloor;
})(Floor);

var Player = (function () {
    function Player(map, eventMap, posX, posY) {
        this.m_map = map;
        this.m_posX = posX;
        this.m_posY = posY;
        this.m_direction = Player.DIR_NORTH;
        this._resetEyesight();
        this.m_keys = {
        };
        this._reservedMoveQueue = new Array();
    }
    Player.DIR_NORTH = 0;
    Player.DIR_WEST = 1;
    Player.DIR_SOUTH = 2;
    Player.DIR_EAST = 3;
    Object.defineProperty(Player.prototype, "isBound", {
        get: function () {
            return this._isBound;
        },
        set: function (value) {
            this._isBound = value;
        },
        enumerable: true,
        configurable: true
    });
    Player.prototype.hasReservedMove = function () {
        if(this._reservedMoveQueue.length > 0) {
            return true;
        }
        return false;
    };
    Player.prototype.reserveMove = function (func) {
        this._reservedMoveQueue.push(0);
    };
    Player.prototype.dequeueReservedMove = function () {
        if(this._reservedMoveQueue.length == 0) {
            return null;
        }
        return this._reservedMoveQueue.shift();
    };
    Player.prototype.getPosX = function () {
        return this.m_posX;
    };
    Player.prototype.getPosY = function () {
        return this.m_posY;
    };
    Player.prototype.getDirection = function () {
        return this.m_direction;
    };
    Player.prototype.getEyesight = function () {
        return this.m_eyesight;
    };
    Player.prototype._resetEyesight = function () {
        this.m_eyesight = [
            [
                -1, 
                -1, 
                -1, 
                -1, 
                -1, 
                -1, 
                -1
            ], 
            [
                -1, 
                -1, 
                -1, 
                -1, 
                -1, 
                -1, 
                -1
            ], 
            [
                -1, 
                -1, 
                -1, 
                -1, 
                -1, 
                -1, 
                -1
            ], 
            [
                -1, 
                -1, 
                -1, 
                -1, 
                -1, 
                -1, 
                -1
            ], 
            [
                -1, 
                -1, 
                -1, 
                -1, 
                -1, 
                -1, 
                -1
            ], 
            [
                -1, 
                -1, 
                -1, 
                -1, 
                -1, 
                -1, 
                -1
            ], 
            [
                -1, 
                -1, 
                -1, 
                -1, 
                -1, 
                -1, 
                -1
            ]
        ];
    };
    Player.prototype.addItem = function (item) {
        console.log("* you got a ney key [" + item + "]*");
        this.m_keys[item] = true;
    };
    Player.prototype.removeItem = function (item) {
        if(!(item in this.m_keys)) {
            return null;
        }
        var result = this.m_keys[item];
        this.m_keys[item] == null;
        delete this.m_keys[item];
        return result;
    };
    Player.prototype.hasItem = function (item) {
        if(item in this.m_keys) {
            return true;
        }
        return false;
    };
    Player.prototype._isMovable = function (indexX, indexY) {
        switch(this.m_map[indexY][indexX]) {
            case 0:
                return true;
            default:
                return false;
        }
    };
    Player.prototype._updateEyesight = function () {
        this._resetEyesight();
        var i, j, cY, cX;
        var mapIdxX = this.m_posX * 2 + 1;
        var mapIdxY = this.m_posY * 2 + 1;
        var startIdxX = 0;
        var startIdxY = 0;
        var endIdxX = 0;
        var endIdxY = 0;
        console.log("DIR > " + this.m_direction);
        switch(this.m_direction) {
            case Player.DIR_NORTH:
                startIdxX = mapIdxX - 3;
                startIdxY = mapIdxY - 5;
                endIdxX = mapIdxX + 3;
                endIdxY = mapIdxY + 1;
                cY = 0;
                cX = 0;
                for(i = startIdxY; i <= endIdxY; i++) {
                    if(i < 0 || i >= this.m_map.length) {
                        cY++;
                        continue;
                    }
                    cX = 0;
                    for(j = startIdxX; j <= endIdxX; j++) {
                        if(j < 0 || j >= this.m_map[0].length) {
                            cX++;
                            continue;
                        }
                        this.m_eyesight[cY][cX] = this.m_map[i][j];
                        cX++;
                    }
                    cY++;
                }
                break;
            case Player.DIR_WEST:
                startIdxX = mapIdxX - 5;
                startIdxY = mapIdxY - 3;
                endIdxX = mapIdxX + 1;
                endIdxY = mapIdxY + 3;
                cY = this.m_eyesight.length - 1;
                cX = 0;
                for(i = startIdxY; i <= endIdxY; i++) {
                    if(i < 0 || i >= this.m_map.length) {
                        cY--;
                        continue;
                    }
                    cX = 0;
                    for(j = startIdxX; j <= endIdxX; j++) {
                        if(j < 0 || j >= this.m_map[0].length) {
                            cX++;
                            continue;
                        }
                        this.m_eyesight[cX][cY] = this.m_map[i][j];
                        cX++;
                    }
                    cY--;
                }
                break;
            case Player.DIR_SOUTH:
                startIdxX = mapIdxX - 3;
                startIdxY = mapIdxY - 1;
                endIdxX = mapIdxX + 3;
                endIdxY = mapIdxY + 5;
                cY = this.m_eyesight.length - 1;
                cX = this.m_eyesight[0].length - 1;
                for(i = startIdxY; i <= endIdxY; i++) {
                    if(i < 0 || i >= this.m_map.length) {
                        cY--;
                        continue;
                    }
                    cX = this.m_eyesight[0].length - 1;
                    for(j = startIdxX; j <= endIdxX; j++) {
                        if(j < 0 || j >= this.m_map[0].length) {
                            cX--;
                            continue;
                        }
                        this.m_eyesight[cY][cX] = this.m_map[i][j];
                        cX--;
                    }
                    cY--;
                }
                break;
            case Player.DIR_EAST:
                startIdxX = mapIdxX - 1;
                startIdxY = mapIdxY - 3;
                endIdxX = mapIdxX + 5;
                endIdxY = mapIdxY + 3;
                cY = 0;
                cX = this.m_eyesight[0].length - 1;
                for(i = startIdxY; i <= endIdxY; i++) {
                    if(i < 0 || i >= this.m_map.length) {
                        cY++;
                        continue;
                    }
                    cX = this.m_eyesight[0].length - 1;
                    for(j = startIdxX; j <= endIdxX; j++) {
                        if(j < 0 || j >= this.m_map[0].length) {
                            cX--;
                            continue;
                        }
                        this.m_eyesight[cX][cY] = this.m_map[i][j];
                        cX--;
                    }
                    cY++;
                }
                break;
        }
    };
    Player.prototype.warpTo = function (posX, posY) {
        this.m_posX = posX;
        this.m_posY = posY;
        this._updateEyesight();
    };
    Player.prototype.moveForward = function () {
        console.log("#moveForward");
        var movePosX = 0;
        var movePosY = 0;
        switch(this.m_direction) {
            case Player.DIR_NORTH:
                movePosY = -1;
                break;
            case Player.DIR_WEST:
                movePosX = -1;
                break;
            case Player.DIR_SOUTH:
                movePosY = 1;
                break;
            case Player.DIR_EAST:
                movePosX = 1;
                break;
            default:
                break;
        }
        if(movePosX == 0 && movePosY == 0) {
            return false;
        }
        var nextIdxX = (this.m_posX * 2 + 1) + movePosX;
        var nextIdxY = (this.m_posY * 2 + 1) + movePosY;
        if(!this._isMovable(nextIdxX, nextIdxY)) {
            return false;
        }
        this.m_posX += movePosX;
        this.m_posY += movePosY;
        this._updateEyesight();
        return true;
    };
    Player.prototype.turnLeft = function () {
        this.m_direction++;
        if(this.m_direction > 3) {
            this.m_direction = Player.DIR_NORTH;
        }
        this._updateEyesight();
    };
    Player.prototype.turnRight = function () {
        this.m_direction--;
        if(this.m_direction < 0) {
            this.m_direction = Player.DIR_EAST;
        }
        this._updateEyesight();
    };
    Player.prototype.turnAround = function () {
        this.m_direction += 2;
        if(this.m_direction >= 4) {
            this.m_direction -= 4;
        }
        this._updateEyesight();
    };
    return Player;
})();

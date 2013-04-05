/**
 * Created with IntelliJ IDEA.
 * User: Bob_Mk2
 * Date: 13/04/06
 * Time: 1:41
 */
var DIR_NORTH = 0;
var DIR_WEST = 1;
var DIR_SOUTH = 2;
var DIR_EAST = 3;

var Player = function(map, eventMap, posX, posY)
{
	this.m_map = map;
	this.m_eventMap = eventMap;
	this.m_eyesight = [
		[9, 9, 9, 9, 9, 9, 9],
		[9, 9, 9, 9, 9, 9, 9],
		[9, 9, 9, 9, 9, 9, 9],
		[9, 9, 9, 9, 9, 9, 9],
		[9, 9, 9, 9, 9, 9, 9],
		[9, 9, 9, 9, 9, 9, 9],
		[9, 9, 9, 9, 9, 9, 9]
	];
	this.m_posX = posX;
	this.m_posY = posY;
	this.m_direction = DIR_NORTH;
	this.havingKeys = new Object();
};

Player.prototype.getDirection = function()
{
	return this.m_direction;
};

Player.prototype.eyesight = function()
{
	return this.m_eyesight;
};

/**
 * 視界情報をリセットします
 * 本当はprivateメソッドにしたい
 */
Player.prototype._resetEyesight = function()
{
	this.m_eyesight = [
		[9, 9, 9, 9, 9, 9, 9],
		[9, 9, 9, 9, 9, 9, 9],
		[9, 9, 9, 9, 9, 9, 9],
		[9, 9, 9, 9, 9, 9, 9],
		[9, 9, 9, 9, 9, 9, 9],
		[9, 9, 9, 9, 9, 9, 9],
		[9, 9, 9, 9, 9, 9, 9]
	];
};

Player.prototype.addKey = function(key)
{
	console.log("* you got a ney key ["+key+"]*");
	this.havingKeys[key] = true;
};

Player.prototype.hasKey = function(key)
{
	if(this.havingKeys[key] == true)
	{
		return true;
	}
	return false;
};

/**
 * 視界情報を更新します
 * 本当はprivateメソッドにしたい
 */
Player.prototype._updateEyesight = function()
{
	this._resetEyesight();

	var i, j, cY, cX;
	var eventInSight = new Array(7);
	for(i = 0;i<eventInSight.length;i++)
	{
		eventInSight[i] = new Array(7);
		for(j = 0;j<eventInSight[i].length;j++)
		{
			eventInSight[i][j] = null;
		}
	}

	//mapの座標に変換する
	var mapIdxX = this.m_posX * 2 + 1;
	var mapIdxY = this.m_posY * 2 + 1;
	console.log("#mapIdxX:" + mapIdxX + " / #mapIdxY:" + mapIdxY);
	var startIdxX = 0;
	var startIdxY = 0;
	var endIdxX = 0;
	var endIdxY = 0;

	switch (this.m_direction) {
		case DIR_NORTH:
			startIdxX = mapIdxX - 3;
			startIdxY = mapIdxY - 5;

			endIdxX = mapIdxX + 3;
			endIdxY = mapIdxY + 1;

			cY = 0;
			cX = 0;
			for (i = startIdxY; i <= endIdxY; i++) {
				if (i < 0 || i >= this.m_map.length) {
					cY++;
					continue;
				}
				cX = 0;
				for (j = startIdxX; j <= endIdxX; j++) {
					if (j < 0 || j >= this.m_map[0].length) {
						cX++;
						continue;
					}
					this.m_eyesight[cY][cX] = this.m_map[i][j];
					eventInSight[cY][cX] = this.m_eventMap[i][j];
					cX++;
				}
				cY++;
			}
			break;
		case DIR_WEST:
			startIdxX = mapIdxX - 5;
			startIdxY = mapIdxY - 3;

			endIdxX = mapIdxX + 1;
			endIdxY = mapIdxY + 3;

			cY = this.m_eyesight.length - 1;
			cX = 0;
			for (i = startIdxY; i <= endIdxY; i++) {
				if (i < 0 || i >= this.m_map.length) {
					cY--;
					continue;
				}
				cX = 0;
				for (j = startIdxX; j <= endIdxX; j++) {
					if (j < 0 || j >= this.m_map[0].length) {
						cX++;
						continue;
					}
					this.m_eyesight[cX][cY] = this.m_map[i][j];
					eventInSight[cX][cY] = this.m_eventMap[i][j];
					cX++;
				}
				cY--;
			}
			break;
		case DIR_SOUTH:
			startIdxX = mapIdxX - 3;
			startIdxY = mapIdxY - 1;

			endIdxX = mapIdxX + 3;
			endIdxY = mapIdxY + 5;

			cY = this.m_eyesight.length - 1;
			cX = this.m_eyesight[0].length - 1;
			for (i = startIdxY; i <= endIdxY; i++) {
				if (i < 0 || i >= this.m_map.length) {
					cY--;
					continue;
				}
				cX = this.m_eyesight[0].length - 1;
				for (j = startIdxX; j <= endIdxX; j++) {
					if (j < 0 || j >= this.m_map[0].length) {
						cX--;
						continue;
					}
					this.m_eyesight[cY][cX] = this.m_map[i][j];
					eventInSight[cY][cX] = this.m_eventMap[i][j];
					cX--;
				}
				cY--;
			}
			break;
		case DIR_EAST:
			startIdxX = mapIdxX - 1;
			startIdxY = mapIdxY - 3;

			endIdxX = mapIdxX + 5;
			endIdxY = mapIdxY + 3;

			cY = 0;
			cX = this.m_eyesight[0].length - 1;
			for (i = startIdxY; i <= endIdxY; i++) {
				if (i < 0 || i >= this.m_map.length) {
					cY++;
					continue;
				}
				cX = this.m_eyesight[0].length - 1;
				for (j = startIdxX; j <= endIdxX; j++) {
					if (j < 0 || j >= this.m_map[0].length) {
						cX--;
						continue;
					}
					this.m_eyesight[cX][cY] = this.m_map[i][j];
					eventInSight[cX][cY] = this.m_eventMap[i][j];
					cX--;
				}
				cY++;
			}
			break;
	}
};

/**
 * 動けるかどうか判定します
 * @param mapX
 * @param mapY
 * @returns {boolean}
 * @private
 */
Player.prototype._isMovable = function(mapX , mapY)
{
	switch(this.m_map[mapY][mapX])
	{
		case 0:
			//何も無い
			return true;
		case 1:
			//壁がある
			return false;
		case 2:
			//扉がある
			if(this.m_eventMap[mapY][mapX] == null || !this.m_eventMap[mapY][mapX].isLocked())
			{
				//ただの扉なので通過
				return true;
			}
			else
			{
				if(this.m_eventMap[mapY][mapX].isLocked())
				{
					console.log(this.m_eventMap[mapY][mapX].getMessage());

					//if(this.hasKey(this.m_eventMap[mapY][mapX].getNeededKey()))
					if(this.m_eventMap[mapY][mapX].openKey(this.havingKeys))
					{
						console.log("* you could open the door *");
						return true;
					}
					else
					{
						console.log("* you don't have a key for the door *");
						return false;
					}
				}
				return true;
			}
		default:
			return false;
	}
};

Player.prototype.move = function(direction)
{
	//壁チェック
	//mapの座標に変換する
	var mapIdxX = this.m_posX * 2 + 1;
	var mapIdxY = this.m_posY * 2 + 1;

	var movePosX = 0;
	var movePosY = 0;
	switch (direction) {
		case DIR_NORTH:
			if(this._isMovable(mapIdxX, mapIdxY - 1))
			{
				movePosY = -1;
			}
			break;
		case DIR_WEST:
			if(this._isMovable(mapIdxX - 1, mapIdxY))
			{
				movePosX = -1;
			}
			break;
		case DIR_SOUTH:
			if (this._isMovable(mapIdxX, mapIdxY + 1))
			{
				movePosY = 1;
			}
			break;
		case DIR_EAST:
			if (this._isMovable(mapIdxX + 1, mapIdxY)){
				movePosX = 1;
			}
			break;
	}

	if (movePosX != 0 || movePosY != 0) {
		this.m_posX += movePosX;
		this.m_posY += movePosY;

		var newMapIdxX =this.m_posX * 2 + 1;
		var newMapIdxY = this.m_posY * 2 + 1;
		if(this.m_eventMap[newMapIdxY][newMapIdxX] != null)
		{
			console.log(this.m_eventMap[newMapIdxY][newMapIdxX].getMessage());
			this.m_eventMap[newMapIdxY][newMapIdxX].onEnterPlayer(this);
		}

		this._updateEyesight();
	}
};
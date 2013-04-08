/**
 * Created with IntelliJ IDEA.
 * User: Bob_Mk2
 * Date: 13/04/06
 * Time: 12:57
 * To change this template use File | Settings | File Templates.
 */
class Player {
	static public DIR_NORTH:number = 0;
	static public DIR_WEST:number = 1;
	static public DIR_SOUTH:number = 2;
	static public DIR_EAST:number = 3;

	private m_map:number[][];
	private m_posX:number;
	private m_posY:number;

	/**
	 * 視界
	 */
	private m_eyesight:number[][];

	/**
	 * 向いている方向
	 */
	private m_direction:number;

	/**
	 * 鍵
	 * TODO もうちょい良い方法あるはず
	 */
	private m_keys:Object;

	constructor(map:number[][], eventMap:any[][], posX:number, posY:number) {
		this.m_map = map;
		this.m_posX = posX;
		this.m_posY = posY;
		this.m_direction = Player.DIR_NORTH;
		this._resetEyesight();
		this.m_keys = {};
	}

	public getPosX():number {
		return this.m_posX;
	}

	public getPosY():number {
		return this.m_posY;
	}

	public getDirection():number {
		return this.m_direction;
	}

	/**
	 * プレイヤーの視界情報を返します
	 * @returns {number[][]}
	 */
	public getEyesight():number[][] {
		return this.m_eyesight;
	}

	/**
	 * 視界を初期化します
	 * @private
	 */
	private _resetEyesight():void {
		this.m_eyesight = [
			[-1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1],
			[-1, -1, -1, -1, -1, -1, -1]
		];
	}

	public addItem(item:any):void {
		console.log("* you got a ney key [" + item + "]*");
		this.m_keys[item] = true;
	}

	public removeItem(item:any):any {
		if (!(item in this.m_keys)) {
			return null;
		}
		var result:any = this.m_keys[item];
		this.m_keys[item] == null;
		delete this.m_keys[item];
		return result;
	}

	/**
	 * 引数のアイテムを持っているかどうか判定します
	 * @param item
	 * @returns {boolean}
	 */
	public hasItem(item:any):bool {
		if (item in this.m_keys) {
			return true;
		}
		return false;
	}

	private _isMovable(indexX:number, indexY:number):bool {
		switch (this.m_map[indexY][indexX]) {
			case 0:
				//壁無し
				return true;
			default:
				//それ以外は衝突
				return false;
		}
	}

	/**
	 * 視界を更新します
	 * TODO リファクタ
	 * @private
	 */
	private _updateEyesight():void {

		//一度視界情報をリセット
		this._resetEyesight();

		var i, j, cY, cX;

		//mapの座標に変換する
		var mapIdxX:number = this.m_posX * 2 + 1;
		var mapIdxY:number = this.m_posY * 2 + 1;
		var startIdxX:number = 0;
		var startIdxY:number = 0;
		var endIdxX:number = 0;
		var endIdxY:number = 0;

		console.log("DIR > " + this.m_direction);
		switch (this.m_direction) {
			case Player.DIR_NORTH:
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
						cX--;
					}
					cY++;
				}
				break;
		}
	}

	public warpTo(posX:number, posY:number):void {
		//座標を更新
		this.m_posX = posX;
		this.m_posY = posY;

		//視界を更新
		this._updateEyesight();
	}

	/**
	 * 向いている方向に移動します
	 * TODO 横スライド移動への対応
	 * @returns {boolean}
	 */
	public moveForward():bool {
		//壁チェック
		var movePosX:number = 0;
		var movePosY:number = 0;
		switch (this.m_direction) {
			case Player.DIR_NORTH:
				//上方向に1動かします
				movePosY = -1;
				break;
			case Player.DIR_WEST:
				//左方向に1動かします
				movePosX = -1;
				break;
			case Player.DIR_SOUTH:
				//下方向に1動かします
				movePosY = 1;
				break;
			case Player.DIR_EAST:
				//右方向に1動かします
				movePosX = 1;
				break;
			default :
				break;
		}

		if (movePosX == 0 && movePosY == 0) {
			//移動する必要無し
			return false;
		}

		//map上の次の座標
		var nextIdxX:number = (this.m_posX * 2 + 1) + movePosX;
		var nextIdxY:number = (this.m_posY * 2 + 1) + movePosY;

		//移動できるかどうか判定する
		if (!this._isMovable(nextIdxX, nextIdxY)) {
			//移動できなかった
			return false;
		}

		//座標を更新
		this.m_posX += movePosX;
		this.m_posY += movePosY;

		//視界を更新
		this._updateEyesight();

		return true;
	}

	/**
	 * 左回転します
	 */
	public turnLeft():void {
		this.m_direction++;
		if (this.m_direction > 3) {
			this.m_direction = Player.DIR_NORTH;
		}
		//視界を更新
		this._updateEyesight();
	}

	/**
	 * 右回転します
	 */
	public turnRight():void {
		this.m_direction--;
		if (this.m_direction < 0) {
			this.m_direction = Player.DIR_EAST;
		}
		//視界を更新
		this._updateEyesight();
	}

	/**
	 * 振り返ります
	 */
	public turnAround():void {
		this.m_direction += 2;
		if (this.m_direction >= 4) {
			this.m_direction -= 4;
		}
		//視界を更新
		this._updateEyesight();
	}
}
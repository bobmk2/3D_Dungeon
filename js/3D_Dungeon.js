/**
 * Created with IntelliJ IDEA.
 * User: Bob_Mk2
 * Date: 13/04/01
 * Time: 0:52
 */
enchant();

var DIR_NORTH = 0;
var DIR_WEST = 1;
var DIR_SOUTH = 2;
var DIR_EAST = 3;
var player;
var map;
var eventmap;

window.onload = function () {
	var game = new Game(320, 320);
	game.fps = 30;

	var mapPath = 'http://enchantjs.com/assets/images/map0.gif';
	var playerImg = 'player.png';
	game.preload(mapPath, playerImg);

	game.onload = function () {
		var bg = new Sprite(320, 320);

		map = [
			//    壁    壁    壁    壁    壁
			[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],//横壁 0
			[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
			[0, 1, 0, 2, 0, 1, 0, 0, 0, 1, 0],//横壁 2
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],//横壁 4
			[1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//横壁 6
			[1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],//横壁 8
			[1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
			[0, 1, 0, 1, 0, 1, 0, 2, 0, 1, 0],//横壁 10
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],//下の区画
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //横壁 12
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//横壁 14
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]//横壁 16
			//    壁    壁    壁    壁    壁
			//     2     4     6     8    10
		];

		var i,j;
		eventmap = new Array(map.length);
		for(i = 0;i<eventmap.length;i++)
		{
			eventmap[i] = new Array(map[i].length);
			for(j=0;j<eventmap[i].length;j++)
			{
				eventmap[i][j] = null;
			}
		}
		eventmap[10][7] = function()
		{
			console.log("This door is locked");
		};
		eventmap[10][7].isLocked = true;

		var maptip = game.assets[mapPath];
		var x = map.length;
		var y = map[0].length;
		var image = new Surface(320, 320);
		for (i = 0; i < x; i++) {
			for (j = 0; j < y; j++) {
				if (i % 2 == 0 && j % 2 == 0) {
					image.draw(maptip, 144, 0, 4, 4, (j / 2) * 20, (i / 2) * 20, 4, 4);
				}
				else if (i % 2 == 1 && j % 2 == 1) {
					if (map[i][j] == 0) {
						image.draw(maptip, 0, 0, 16, 16, ((j - 1) / 2 * 20) + 4, ((i - 1) / 2 * 20) + 4, 16, 16);
					}
					else if (map[i][j] == 1) {
						image.draw(maptip, 112, 0, 16, 16, ((j - 1) / 2 * 20) + 4, ((i - 1) / 2 * 20) + 4, 16, 16);
					}
				}
				else if (i % 2 == 1 && j % 2 == 0) {
					if (map[i][j] == 0) {
						image.draw(maptip, 0, 0, 4, 16, (j / 2 * 20), ((i - 1) / 2 * 20) + 4, 4, 16);
					}
					else if (map[i][j] == 1) {
						image.draw(maptip, 112, 0, 4, 16, (j / 2 * 20), ((i - 1) / 2 * 20) + 4, 4, 16);
					}
				}
				else if (i % 2 == 0 && j % 2 == 1) {
					//壁
					if (map[i][j] == 0) {
						image.draw(maptip, 0, 0, 16, 4, ((j - 1) / 2 * 20) + 4, (i / 2 * 20), 16, 4);
					}
					else if (map[i][j] == 1) {
						image.draw(maptip, 112, 0, 16, 4, ((j - 1) / 2 * 20) + 4, (i / 2 * 20), 16, 4);
					}
				}
			}
		}
		bg.image = image;
		game.rootScene.addChild(bg);

		//プレイヤー生成
		player = new Sprite(16, 16);
		player.image = game.assets[playerImg];
		player.posX = 2;
		player.posY = 2;
		player.x = 20 * player.posX + 4;
		player.y = 20 * player.posY + 4;
		player.direction = DIR_NORTH;//向いてる方向
		player.addEventListener(Event.ENTER_FRAME, function () {
			player.frame = player.direction;
			player.tick++;
		});

		//視界文字列
		var label = new Label("2D視界");
		label.font = "12px monospace";
		label.x = 120;
		label.y = 0;
		game.rootScene.addChild(label);

		//3Dダンジョン文字列
		var sightsceenLabel = new Label("3D視界");
		sightsceenLabel.font = "12px monospace";
		sightsceenLabel.x = 120;
		sightsceenLabel.y = 100;
		game.rootScene.addChild(sightsceenLabel);

		//四角形の壁を描画
		enchant.Surface.prototype.drawSquareWall = function (color, x, y, width, height) {
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.rect(x, y, width, height);
			this.context.closePath();
			this.context.fill();

			this.context.strokeStyle = "rgb(0,0,0)";
			this.context.beginPath();
			this.context.rect(x, y, width, height);
			this.context.closePath();
			this.context.stroke();
		};

		//視界の左側の台形の壁を描画
		enchant.Surface.prototype.drawLeftTrapezoidWall = function (color, x, y, longLen, legLen, shortLen) {
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(x, y);
			this.context.lineTo(x, y + longLen);
			this.context.lineTo(x + legLen, y + longLen - legLen);
			this.context.lineTo(x + legLen, y + legLen);
			this.context.closePath();
			this.context.fill();

			this.context.strokeStyle = "rgb(0,0,0)";
			this.context.beginPath();
			this.context.moveTo(x, y);
			this.context.lineTo(x, y + longLen);
			this.context.lineTo(x + legLen, y + longLen - legLen);
			this.context.lineTo(x + legLen, y + legLen);
			this.context.closePath();
			this.context.stroke();
		};

		//視界の右側の台形の壁を描画
		enchant.Surface.prototype.drawRightTrapezoidWall = function (color, x, y, longLen, legLen, shortLen) {
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(x, y);
			this.context.lineTo(x, y + longLen);
			this.context.lineTo(x - legLen, y + longLen - legLen);
			this.context.lineTo(x - legLen, y + legLen);
			this.context.closePath();
			this.context.fill();

			this.context.strokeStyle = "rgb(0,0,0)";
			this.context.beginPath();
			this.context.moveTo(x, y);
			this.context.lineTo(x, y + longLen);
			this.context.lineTo(x - legLen, y + longLen - legLen);
			this.context.lineTo(x - legLen, y + legLen);
			this.context.closePath();
			this.context.stroke();
		};

		//床を描画(x,yは左下(始点)の座標)
		enchant.Surface.prototype.drawFloor = function (color, x, y, longLen, legLen) {
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(x, y);
			this.context.lineTo(x + longLen, y);
			this.context.lineTo(x + longLen - legLen, y - legLen);
			this.context.lineTo(x + legLen, y - legLen);
			this.context.closePath();
			this.context.fill();

			this.context.strokeStyle = "rgb(0,0,0)";
			this.context.beginPath();
			this.context.moveTo(x, y);
			this.context.lineTo(x + longLen, y);
			this.context.lineTo(x + longLen - legLen, y - legLen);
			this.context.lineTo(x + legLen, y - legLen);
			this.context.closePath();
			this.context.stroke();
		}

		var surface = new Surface(50, 50);
		var sprite = new Sprite(50, 50);
		sprite.image = surface;
		sprite.x = 120;
		sprite.y = 120;
		game.rootScene.addChild(sprite);


		player.updateEyesight = function () {
			var i, j, cY, cX;

			//視界の範囲は3x3
			var eyesight = [
				[9, 9, 9, 9, 9, 9, 9],
				[9, 9, 9, 9, 9, 9, 9],
				[9, 9, 9, 9, 9, 9, 9],
				[9, 9, 9, 9, 9, 9, 9],
				[9, 9, 9, 9, 9, 9, 9],
				[9, 9, 9, 9, 9, 9, 9],
				[9, 9, 9, 9, 9, 9, 9]
			];
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
			var mapIdxX = player.posX * 2 + 1;
			var mapIdxY = player.posY * 2 + 1;
			console.log("mapIdxX:" + mapIdxX + " / mapIdxY:" + mapIdxY);
			var startIdxX = 0;
			var startIdxY = 0;
			var endIdxX = 0;
			var endIdxY = 0;


			//プレイヤーの視界を更新
			switch (player.direction) {
				case DIR_NORTH:
					startIdxX = mapIdxX - 3;
					startIdxY = mapIdxY - 5;

					endIdxX = mapIdxX + 3;
					endIdxY = mapIdxY + 1;

					cY = 0;
					cX = 0;
					for (i = startIdxY; i <= endIdxY; i++) {
						if (i < 0 || i >= map.length) {
							cY++;
							continue;
						}
						cX = 0;
						for (j = startIdxX; j <= endIdxX; j++) {
							if (j < 0 || j >= map[0].length) {
								cX++;
								continue;
							}
							eyesight[cY][cX] = map[i][j];
							eventInSight[cY][cX] = eventmap[i][j];
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

					cY = eyesight.length - 1;
					cX = 0;
					for (i = startIdxY; i <= endIdxY; i++) {
						if (i < 0 || i >= map.length) {
							cY--;
							continue;
						}
						cX = 0;
						for (j = startIdxX; j <= endIdxX; j++) {
							if (j < 0 || j >= map[0].length) {
								cX++;
								continue;
							}
							eyesight[cX][cY] = map[i][j];
							eventInSight[cX][cY] = eventmap[i][j];
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

					cY = eyesight.length - 1;
					cX = eyesight[0].length - 1;
					for (i = startIdxY; i <= endIdxY; i++) {
						if (i < 0 || i >= map.length) {
							cY--;
							continue;
						}
						cX = eyesight[0].length - 1;
						for (j = startIdxX; j <= endIdxX; j++) {
							if (j < 0 || j >= map[0].length) {
								cX--;
								continue;
							}
							eyesight[cY][cX] = map[i][j];
							eventInSight[cY][cX] = eventmap[i][j];
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
					cX = eyesight[0].length - 1;
					for (i = startIdxY; i <= endIdxY; i++) {
						if (i < 0 || i >= map.length) {
							cY++;
							continue;
						}
						cX = eyesight[0].length - 1;
						for (j = startIdxX; j <= endIdxX; j++) {
							if (j < 0 || j >= map[0].length) {
								cX--;
								continue;
							}
							eyesight[cX][cY] = map[i][j];
							eventInSight[cX][cY] = eventmap[i][j];
							cX--;
						}
						cY++;
					}
					break;
			}

			var sX = 120;
			var sY = 20;

			for (i = 0; i < eyesight.length; i++) {
				for (j = 0; j < eyesight[i].length; j++) {
					if (i % 2 == 0 && j % 2 == 0) {
						image.draw(maptip, 144, 0, 4, 4, sX + (j / 2) * 20, sY + (i / 2) * 20, 4, 4);
					}
					else if (i % 2 == 1 && j % 2 == 1) {
						if (eyesight[i][j] == 0) {
							image.draw(maptip, 0, 0, 16, 16, sX + ((j - 1) / 2 * 20) + 4, sY + ((i - 1) / 2 * 20) + 4, 16, 16);
						}
						else if (eyesight[i][j] == 1) {
							image.draw(maptip, 112, 0, 16, 16, sX + ((j - 1) / 2 * 20) + 4, sY + ((i - 1) / 2 * 20) + 4, 16, 16);
						}
						else {
							image.draw(maptip, 144, 0, 16, 16, sX + ((j - 1) / 2 * 20) + 4, sY + ((i - 1) / 2 * 20) + 4, 16, 16);
						}
					}
					else if (i % 2 == 1 && j % 2 == 0) {
						if (eyesight[i][j] == 0) {
							image.draw(maptip, 0, 0, 4, 16, sX + (j / 2 * 20), sY + ((i - 1) / 2 * 20) + 4, 4, 16);
						}
						else if (eyesight[i][j] == 1) {
							image.draw(maptip, 112, 0, 4, 16, sX + (j / 2 * 20), sY + ((i - 1) / 2 * 20) + 4, 4, 16);
						}
						else {
							image.draw(maptip, 144, 0, 4, 16, sX + (j / 2 * 20), sY + ((i - 1) / 2 * 20) + 4, 4, 16);
						}
					}
					else if (i % 2 == 0 && j % 2 == 1) {
						//壁
						if (eyesight[i][j] == 0) {
							image.draw(maptip, 0, 0, 16, 4, sX + ((j - 1) / 2 * 20) + 4, sY + (i / 2 * 20), 16, 4);
						}
						else if (eyesight[i][j] == 1) {
							image.draw(maptip, 112, 0, 16, 4, sX + ((j - 1) / 2 * 20) + 4, sY + (i / 2 * 20), 16, 4);
						}
						else {
							image.draw(maptip, 144, 0, 16, 4, sX + ((j - 1) / 2 * 20) + 4, sY + (i / 2 * 20), 16, 4);
						}
					}
				}
			}

			//eyesightを元に3Dダンジョンを表示
			surface.clear();

			//奥と床を描画します
			surface.drawFloor(createRgbColor(100,200,100), 0, 48, 48, 8);
			surface.drawFloor(createRgbaColor(80,160,180), 8, 40, 32, 6);
			surface.drawFloor(createRgbColor(60,120,60), 14, 34, 20, 4);
			surface.drawSquareWall(createRgbColor(0,0,0), 0, 0, 48, 30)

			//#三番目(一番奥)の壁
			var r = 20, g = 20, b = 20;
			draw3dWalls(surface, eyesight, r, g, b, 0,
				6, 18, 12, 12,		//正面の壁(x, y, width, height)
				14, 14, 20, 4, 12	//左右の壁(x, y, long, side, short)
			);

			//#二番目の壁
			r += 50;
			g += 50;
			b += 50;
			draw3dWalls(surface, eyesight, r, g, b, 2,
				-6, 14, 20, 20,	//正面の壁(x, y, width, height)
				8, 8, 32, 6, 20	//左右の壁(x, y, long, side, short)
			);

			//#一番手前の壁
			r += 50;
			g += 50;
			b += 50;
			draw3dWalls(surface, eyesight, r, g, b, 4,
				-24, 8, 32, 32,	//正面の壁(x, y, width, height)
				0, 0, 48, 8, 32	//左右の壁(x, y, long, side, short)
			);
		};

		player.move = function (dir) {
			//壁チェック
			//mapの座標に変換する
			var mapIdxX = player.posX * 2 + 1;
			var mapIdxY = player.posY * 2 + 1;

			var movePosX = 0;
			var movePosY = 0;
			switch (dir) {
				case DIR_NORTH:
					if(isMovable(mapIdxX, mapIdxY - 1))
					{
						movePosY = -1;
					}
					break;
				case DIR_WEST:
					if(isMovable(mapIdxX - 1, mapIdxY))
					{
						movePosX = -1;
					}
					break;
				case DIR_SOUTH:
					if (isMovable(mapIdxX, mapIdxY + 1))
					{
						movePosY = 1;
					}
					break;
				case DIR_EAST:
					if (isMovable(mapIdxX + 1, mapIdxY)){
						movePosX = 1;
					}
					break;
			}

			if (movePosX != 0 || movePosY != 0) {
				player.posX += movePosX;
				player.posY += movePosY;
				player.x = 20 * player.posX + 4;
				player.y = 20 * player.posY + 4;

				player.updateEyesight();
			}
		};

		game.rootScene.addChild(player);

		listenDirectionKey();
	};

	function isMovable(mapX, mapY)
	{
		switch(map[mapY][mapX])
		{
			case 0:
				//何も無い
				return true;
			case 1:
				//壁がある
				return false;
			case 2:
				//扉がある
				if(eventmap[mapY][mapX] == null)
				{
					//ただの扉なので通過
					return true;
				}
				else
				{
					if(eventmap[mapY][mapX].isLocked)
					{
						eventmap[mapY][mapX]();
						return false;
					}
					return true;
				}
			default:
				return false;
		}
	}

	function listenDirectionKey() {
		game.addEventListener(Event.UP_BUTTON_DOWN, move);
		game.addEventListener(Event.DOWN_BUTTON_DOWN, move);
		game.addEventListener(Event.RIGHT_BUTTON_DOWN, move);
		game.addEventListener(Event.LEFT_BUTTON_DOWN, move);
	}

	function move(e) {
		if (player.tick < 5) {
			return;
		}
		var needUpdateEyesight = false;
		switch (e.type) {
			case Event.UP_BUTTON_DOWN:
				//向いている方向に移動する
				player.move(player.direction);
				needUpdateEyesight = true;
				break;
			case Event.DOWN_BUTTON_DOWN:
				//後ろを向かせる
				player.direction += 2;
				if (player.direction >= 4) {
					player.direction -= 4;
				}
				needUpdateEyesight = true;
				break;
			case Event.RIGHT_BUTTON_DOWN:
				//右回転
				player.direction--;
				if (player.direction < 0) {
					player.direction = 3;
				}
				needUpdateEyesight = true;
				break;
			case Event.LEFT_BUTTON_DOWN:
				//左回転
				player.direction++;
				if (player.direction > 3) {
					player.direction = 0;
				}
				needUpdateEyesight = true;
				break;
			default:
				error("move()に不明なイベント" + e.type + "が渡されました。");
				break;
		}

		if (needUpdateEyesight) {
			//視界の更新を行なう
			player.updateEyesight();
			player.tick = 0;
		}
	}

	function createRgbColor(r, g, b) {
		r = normalizeColor(r);
		g = normalizeColor(g);
		b = normalizeColor(b);
		return "rgb(" + r + "," + g + "," + b + ")"
	}

	function createRgbaColor(r, g, b, a) {
		r = normalizeColor(r);
		g = normalizeColor(g);
		b = normalizeColor(b);
		a = normalizeAlpha(a);
		return "rgba(" + r + "," + g + "," + b + ", " + a + ")"
	}

	function normalizeColor(c) {
		if (c > 255) {
			c = 255;
		}
		if (c < 0) {
			c = 0;
		}
		return c;
	}

	function normalizeAlpha(a) {
		if (a < 0) {
			a = 0;
		}
		if (a > 1.0) {
			a = 1.0;
		}
		return a;
	}

	//邪魔だったのでまとめた
	function draw3dWalls(surface, eyesight, r, g, b, idxX, x, y, width, height, tX, tY, longLen, legLen, shortLen) {
		var color1 = createRgbColor(r, g, b);
		var color2 = createRgbColor(r + 20, g + 20, b + 20);
		var color3 = createRgbColor(r + 40, g + 40, b + 40);
		var door1 = createRgbaColor(r, g + 100, b + 100, 0.7);
		var door2 = createRgbaColor(r + 20, g + 120, b + 120, 0.6);
		var door3 = createRgbaColor(r + 20, g + 140, b + 140, 0.5);

		//正面の壁を描画
		if (eyesight[idxX][1] != 0) {
			//左
			switch (eyesight[idxX][1]) {
				case 1:
					//壁
					surface.drawSquareWall(color1, x, y, width, height);
					break;
				case 2:
					//扉
					surface.drawSquareWall(door1, x, y, width, height);
					break;
			}
		}
		if (eyesight[idxX][3] != 0) {
			//中
			switch (eyesight[idxX][3]) {
				case 1:
					//壁
					surface.drawSquareWall(color2, x + width, y, width, height);
					break;
				case 2:
					//扉
					surface.drawSquareWall(door2, x + width, y, width, height);
					break;
			}
		}
		if (eyesight[idxX][5] != 0) {
			//右
			switch (eyesight[idxX][5]) {
				case 1:
					//壁
					surface.drawSquareWall(color1, x + width * 2, y, width, height);
					break;
				case 2:
					//扉
					surface.drawSquareWall(door1, x + width * 2, y, width, height);
					break;
			}
		}

		//左右の壁を描画
		if (eyesight[idxX + 1][2] != 0) {
			switch (eyesight[idxX + 1][2]) {
				case 1:
					//壁:
					surface.drawLeftTrapezoidWall(color3, tX, tY, longLen, legLen, shortLen);
					break;
				case 2:
					//扉
					surface.drawLeftTrapezoidWall(door3, tX, tY, longLen, legLen, shortLen);
					break;
			}
		}
		if (eyesight[idxX + 1][4] != 0) {
			switch (eyesight[idxX + 1][4])
			{
				case 1:
					//壁
					surface.drawRightTrapezoidWall(color3, tX + longLen, tY, longLen, legLen, shortLen);
					break;
				case 2:
					//扉
					surface.drawRightTrapezoidWall(door3, tX + longLen, tY, longLen, legLen, shortLen);
					break;
			}
		}
	}

	game.start();
};
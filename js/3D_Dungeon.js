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

window.onload = function () {
	var game = new Game(320, 320);
	game.fps = 30;

	var mapPath = 'http://enchantjs.com/assets/images/map0.gif';
	var playerImg = 'player.png';
	game.preload(mapPath, playerImg);

	game.onload = function () {
		var bg = new Sprite(320, 320);

		map = [
		//  壁    壁    壁    壁    壁    壁
			[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],//横壁
			[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
			[0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],//横壁
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],//横壁
			[1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//横壁
			[1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
			[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],//横壁
			[1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
			[0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0], //横壁
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],//下の区画
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //横壁
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],//横壁
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]//横壁

		//  壁    壁    壁    壁    壁    壁
		];

		var maptip = game.assets[mapPath];
		var x = map.length;
		var y = map[0].length;
		var image = new Surface(320, 320);
		for (var i = 0; i < x; i++) {
			for (var j = 0; j < y; j++) {
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
		enchant.Surface.prototype.drawLeftTrapezoidWall = function (color, x, y, long, side, short) {
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(x, y);
			this.context.lineTo(x, y + long);
			this.context.lineTo(x + side, y + long - side);
			this.context.lineTo(x + side, y + side);
			this.context.closePath();
			this.context.fill();

			this.context.strokeStyle = "rgb(0,0,0)";
			this.context.beginPath();
			this.context.moveTo(x, y);
			this.context.lineTo(x, y + long);
			this.context.lineTo(x + side, y + long - side);
			this.context.lineTo(x + side, y + side);
			this.context.closePath();
			this.context.stroke();
		};

		//視界の右側の台形の壁を描画
		enchant.Surface.prototype.drawRightTrapezoidWall = function (color, x, y, long, side, short) {
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(x, y);
			this.context.lineTo(x, y + long);
			this.context.lineTo(x - side, y + long - side);
			this.context.lineTo(x - side, y + side);
			this.context.closePath();
			this.context.fill();

			this.context.strokeStyle = "rgb(0,0,0)";
			this.context.beginPath();
			this.context.moveTo(x, y);
			this.context.lineTo(x, y + long);
			this.context.lineTo(x - side, y + long - side);
			this.context.lineTo(x - side, y + side);
			this.context.closePath();
			this.context.stroke();
		};

		var surface = new Surface(50, 50);
		var sprite = new Sprite(50, 50);
		sprite.image = surface;
		sprite.x = 120;
		sprite.y = 120;
		game.rootScene.addChild(sprite);


		player.updateEyesight = function () {
			var eyesight = [
				[9, 9, 9, 9, 9, 9, 9],
				[9, 9, 9, 9, 9, 9, 9],
				[9, 9, 9, 9, 9, 9, 9],
				[9, 9, 9, 9, 9, 9, 9],
				[9, 9, 9, 9, 9, 9, 9],
				[9, 9, 9, 9, 9, 9, 9],
				[9, 9, 9, 9, 9, 9, 9]
			];

			//mapの座標に変換する
			var mapIdxX = player.posX * 2 + 1;
			var mapIdxY = player.posY * 2 + 1;
			console.log("mapIdxX:" + mapIdxX + " / mapIdxY:" + mapIdxY);
			var startIdxX = 0;
			var startIdxY = 0;
			var endIdxX = 0;
			var endIdxY = 0;

			var i, j,cY, cX;

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


			surface.clear();
			//eyesightを元に3Dダンジョンを表示

			var WALL_COLORS = [
				"rgb(0,0,0)",
				"rgb(30,30,30)",
				"rgb(60,60,60)",
				"rgb(90,90,90)",
				"rgb(120,120,120)",
				"rgb(150,150,150)",
				"rgb(180,180,180)",
				"rgb(210,210,210)",
				"rgb(240,240,240)"];

			//#三番目(一番奥)の壁
			if (eyesight[0][1]) {
				//三番目左正面
				surface.drawSquareWall(WALL_COLORS[0], 6, 18, 12, 12);
			}
			if (eyesight[0][3]) {
				//三番目中正面
				surface.drawSquareWall(WALL_COLORS[1], 18, 18, 12, 12);
			}
			if (eyesight[0][5]) {
				//三番目右正面
				surface.drawSquareWall(WALL_COLORS[0], 30, 18, 12, 12);
			}
//			draw3dDungeon(surface, eyesight, 0, 6, 18, 12, 12, 14, 14, 20, 4, 12);

			//#
			if (eyesight[1][2] == 1) {
				//三番目左壁
				surface.drawLeftTrapezoidWall(WALL_COLORS[2], 14, 14, 20, 4, 12);
			}
			if (eyesight[1][4] == 1) {
				//三番目右壁
				surface.drawRightTrapezoidWall(WALL_COLORS[2], 34, 14, 20, 4, 12);
			}

			//## 二番目に奥の壁
			if (eyesight[2][1] == 1) {
				//二番目左正面
				surface.drawSquareWall(WALL_COLORS[3], -6, 14, 20, 20);
			}
			if (eyesight[2][3] == 1) {
				//二番目中正面
				surface.drawSquareWall(WALL_COLORS[4], 14, 14, 20, 20);
			}
			if (eyesight[2][5] == 1) {
				//二番目右正面
				surface.drawSquareWall(WALL_COLORS[3], 34, 14, 20, 20);
			}
			if (eyesight[3][2] == 1) {
				//二番目左壁
				surface.drawLeftTrapezoidWall(WALL_COLORS[5], 8, 8, 32, 6, 20);
			}

			if (eyesight[3][4] == 1) {
				//二番目右壁
				surface.drawRightTrapezoidWall(WALL_COLORS[5], 40, 8, 32, 6, 20);
			}

			//### 一番手前の壁
			if (eyesight[4][1] == 1) {
				//一番手前左正面
				surface.drawSquareWall(WALL_COLORS[6], -24, 8, 32, 32);
			}
			if (eyesight[4][3] == 1) {
				//一番手前中正面
				surface.drawSquareWall(WALL_COLORS[7], 8, 8, 32, 32);
			}
			if (eyesight[4][5] == 1) {
				//一番手前右正面
				surface.drawSquareWall(WALL_COLORS[6], 40, 8, 32, 32);
			}
			if (eyesight[5][2] == 1) {
				//一番手前左壁
				surface.drawLeftTrapezoidWall(WALL_COLORS[8], 0, 0, 48, 8, 32);
			}
			if (eyesight[5][4] == 1) {
				//一番手前右壁
				surface.drawRightTrapezoidWall(WALL_COLORS[8], 48, 0, 48, 8, 32);
			}
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
					if (map[mapIdxY - 1][mapIdxX] == 0) {
						movePosY = -1;
					}
					break;
				case DIR_WEST:
					if (map[mapIdxY][mapIdxX - 1] == 0) {
						movePosX = -1;
					}
					break;
				case DIR_SOUTH:
					if (map[mapIdxY + 1][mapIdxX] == 0) {
						movePosY = 1;
					}
					break;
				case DIR_EAST:
					if (map[mapIdxY][mapIdxX + 1] == 0) {
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
		switch (e.type) {
			case Event.UP_BUTTON_DOWN:
				player.move(player.direction);
				player.updateEyesight();
				player.tick = 0;
				break;
			case Event.DOWN_BUTTON_DOWN:
				player.direction += 2;
				if (player.direction >= 4) {
					player.direction -= 4;
				}
				player.updateEyesight();
				player.tick = 0;
				break;
			case Event.RIGHT_BUTTON_DOWN:
				player.direction--;
				if (player.direction < 0) {
					player.direction = 3;
				}
				player.updateEyesight();
				player.tick = 0;
				break;
			case Event.LEFT_BUTTON_DOWN:
				player.direction++;
				if (player.direction > 3) {
					player.direction = 0;
				}
				player.updateEyesight();
				player.tick = 0;
				break;
			default:
				error("move()に不明なイベント" + e.type + "が渡されました。");
				break;
		}
	}

	function draw3dDungeon(surface, eyesight, idxX, x, y, width, height, tX, tY, long, side, short)
	{
		var color = "rgb(255,100,100)";
		var sqrX = x;

		//正面の壁を描画
		for(var i=0;i<3;i++)
		{
			if(eyesight[idxX][(i*2)+1] == 1)
			surface.drawSquareWall(color, sqrX, y, width, height);
			sqrX += width;
		}

		//左右の壁を描画
		if (eyesight[idxX + 1][2] == 1) {
			surface.drawLeftTrapezoidWall(color, tX, tY, long, side, short);
		}
		if (eyesight[idX + 1][4] == 1) {
			surface.drawRightTrapezoidWall(color, tX + long, tY, long, side, short);
		}
	};

	game.start();
};
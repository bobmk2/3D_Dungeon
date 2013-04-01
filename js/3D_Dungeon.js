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
			[0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0] //横壁
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

		enchant.Surface.prototype.drawLineA = function (color) {
			var zeroX = 0;
			var zeroY = 0;

			this.context.strokeStyle = color;
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(zeroX, zeroY);
			this.context.lineTo(zeroX, zeroY + 48);
			this.context.lineTo(zeroX + 8, zeroY + 40);
			this.context.lineTo(zeroX + 8, zeroY + 8);
			this.context.closePath();

			this.context.fill();
			this.context.stroke();
		};

		enchant.Surface.prototype.drawLineB = function (color) {
			var zeroX = 48;
			var zeroY = 0;

			this.context.strokeStyle = color;
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(zeroX, zeroY);
			this.context.lineTo(zeroX - 8, zeroY + 8);
			this.context.lineTo(zeroX - 8, zeroY + 40);
			this.context.lineTo(zeroX, zeroY + 48);
			this.context.closePath();

			this.context.fill();
			this.context.stroke();
		};

		enchant.Surface.prototype.drawLineC = function (color) {
			var zeroX = 8;
			var zeroY = 8;

			this.context.strokeStyle = color;
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(zeroX, zeroY);
			this.context.lineTo(zeroX, zeroY + 32);
			this.context.lineTo(zeroX + 6, zeroY + 26);
			this.context.lineTo(zeroX + 6, zeroY + 6);
			this.context.closePath();

			this.context.fill();
			this.context.stroke();
		};


		enchant.Surface.prototype.drawFirstLeftRect = function (color) {
			var zeroX = 8;
			var zeroY = 8;

			this.context.strokeStyle = color;
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(zeroX, zeroY);
			this.context.lineTo(zeroX - 32, zeroY);
			this.context.lineTo(zeroX - 32, zeroY + 32);
			this.context.lineTo(zeroX, zeroY + 32);
			this.context.closePath();

			this.context.fill();
			this.context.stroke();
		};
		enchant.Surface.prototype.drawLineD = function (color) {
			var zeroX = 40;
			var zeroY = 8;

			this.context.strokeStyle = color;
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(zeroX, zeroY);
			this.context.lineTo(zeroX, zeroY + 32);
			this.context.lineTo(zeroX - 6, zeroY + 26);
			this.context.lineTo(zeroX - 6, zeroY + 6);
			this.context.closePath();

			this.context.fill();
			this.context.stroke();
		};

		enchant.Surface.prototype.drawFirstRightRect = function (color) {
			var zeroX = 40;
			var zeroY = 8;

			this.context.strokeStyle = color;
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(zeroX, zeroY);
			this.context.lineTo(zeroX + 32, zeroY);
			this.context.lineTo(zeroX + 32, zeroY + 32);
			this.context.lineTo(zeroX, zeroY + 32);
			this.context.closePath();

			this.context.fill();
			this.context.stroke();
		};

		enchant.Surface.prototype.drawFirstCenterRect = function (color) {
			var zeroX = 8;
			var zeroY = 8;

			this.context.strokeStyle = color;
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(zeroX, zeroY);
			this.context.lineTo(zeroX + 32, zeroY);
			this.context.lineTo(zeroX + 32, zeroY + 32);
			this.context.lineTo(zeroX, zeroY + 32);
			this.context.closePath();

			this.context.fill();
			this.context.stroke();
		};

		enchant.Surface.prototype.drawSecondCenterRect = function (color) {
			var zeroX = 14;
			var zeroY = 14;

			this.context.strokeStyle = color;
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(zeroX, zeroY);
			this.context.lineTo(zeroX + 20, zeroY);
			this.context.lineTo(zeroX + 20, zeroY + 20);
			this.context.lineTo(zeroX, zeroY + 20);
			this.context.closePath();

			this.context.fill();
			this.context.stroke();
		};

		enchant.Surface.prototype.drawLineE = function (color) {
			var zeroX = 14;
			var zeroY = 14;

			this.context.strokeStyle = color;
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(zeroX, zeroY);
			this.context.lineTo(zeroX, zeroY + 20);
			this.context.lineTo(zeroX + 4, zeroY + 16);
			this.context.lineTo(zeroX + 4, zeroY + 4);
			this.context.closePath();

			this.context.fill();
			this.context.stroke();
		};

		enchant.Surface.prototype.drawSecondLeftRect = function (color) {
			var zeroX = 14;
			var zeroY = 14;

			this.context.strokeStyle = color;
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(zeroX, zeroY);
			this.context.lineTo(zeroX, zeroY + 20);
			this.context.lineTo(zeroX - 20, zeroY + 20);
			this.context.lineTo(zeroX - 20, zeroY);
			this.context.closePath();

			this.context.fill();
			this.context.stroke();
		};

		enchant.Surface.prototype.drawLineF = function (color) {
			var zeroX = 34;
			var zeroY = 14;

			this.context.strokeStyle = color;
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(zeroX, zeroY);
			this.context.lineTo(zeroX, zeroY + 20);
			this.context.lineTo(zeroX - 4, zeroY + 16);
			this.context.lineTo(zeroX - 4, zeroY + 4);
			this.context.closePath();

			this.context.fill();
			this.context.stroke();
		};

		enchant.Surface.prototype.drawSecondRightRect = function (color) {
			var zeroX = 34;
			var zeroY = 14;

			this.context.strokeStyle = color;
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(zeroX, zeroY);
			this.context.lineTo(zeroX, zeroY + 20);
			this.context.lineTo(zeroX + 20, zeroY + 20);
			this.context.lineTo(zeroX + 20, zeroY);
			this.context.closePath();

			this.context.fill();
			this.context.stroke();
		};

		enchant.Surface.prototype.drawThirdLeftRect = function (color) {
			var zeroX = 18;
			var zeroY = 18;

			this.context.strokeStyle = color;
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(zeroX, zeroY);
			this.context.lineTo(zeroX, zeroY + 12);
			this.context.lineTo(zeroX - 12, zeroY + 12);
			this.context.lineTo(zeroX - 12, zeroY);
			this.context.closePath();

			this.context.fill();
			this.context.stroke();
		};
		enchant.Surface.prototype.drawThirdCenterRect = function (color) {
			var zeroX = 18;
			var zeroY = 18;

			this.context.strokeStyle = color;
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(zeroX, zeroY);
			this.context.lineTo(zeroX, zeroY + 12);
			this.context.lineTo(zeroX + 12, zeroY + 12);
			this.context.lineTo(zeroX + 12, zeroY);
			this.context.closePath();

			this.context.fill();
			this.context.stroke();
		};
		enchant.Surface.prototype.drawThirdRightRect = function (color) {
			var zeroX = 30;
			var zeroY = 18;

			this.context.strokeStyle = color;
			this.context.fillStyle = color;
			this.context.beginPath();
			this.context.moveTo(zeroX, zeroY);
			this.context.lineTo(zeroX, zeroY + 12);
			this.context.lineTo(zeroX + 12, zeroY + 12);
			this.context.lineTo(zeroX + 12, zeroY);
			this.context.closePath();

			this.context.fill();
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


			//#一番奥の壁
			if (eyesight[0][1]) {
				surface.drawThirdLeftRect("rgb(0,0,0)");
			}
			if (eyesight[0][3]) {
				surface.drawThirdCenterRect("rgb(20,20,20)");
			}
			if (eyesight[0][5]) {
				surface.drawThirdRightRect("rgb(0,0,0)");
			}

			//#
			if (eyesight[1][2] == 1) {
				surface.drawLineE("rgb(40,40,40)");
			}

			if (eyesight[1][4] == 1) {
				surface.drawLineF("rgb(40,40,40)");
			}

			//## 二番目に奥の壁
			if (eyesight[2][1] == 1) {
				surface.drawSecondLeftRect("rgb(60,60,60)");
			}
			if (eyesight[2][3] == 1) {
				surface.drawSecondCenterRect("rgb(100,100,100)");
			}
			if (eyesight[2][5] == 1) {
				surface.drawSecondRightRect("rgb(60,60,60)");
			}


			//##
			if (eyesight[3][2] == 1) {
				surface.drawLineC("rgb(120,120,120)");
			}

			if (eyesight[3][4] == 1) {
				surface.drawLineD("rgb(120,120,120)");
			}

			//### 一番手前の壁
			if (eyesight[4][1] == 1) {
				surface.drawFirstLeftRect("rgb(140,140,140)");
			}

			if (eyesight[4][5] == 1) {
				surface.drawFirstRightRect("rgb(140,140,140)");
			}

			if (eyesight[4][3] == 1) {
				surface.drawFirstCenterRect("rgb(160,160,160)");
			}

			//### 一番前
			if (eyesight[5][2] == 1) {
				surface.drawLineA("rgb(200,200,200)");
			}
			if (eyesight[5][4] == 1) {
				surface.drawLineB("rgb(200,200,200)");
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

	game.start();
};
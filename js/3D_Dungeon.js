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
var playerImage;
var map;
var eventmap;
var player;

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
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],//横壁 0
			[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
			[1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 1],//横壁 2
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],//横壁 4
			[1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
			[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],//横壁 6
			[1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
			[1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],//横壁 8
			[1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
			[1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],//横壁 10
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],//下の区画
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //横壁 12
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],//横壁 14
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]//横壁 16
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
		/*
		eventmap[10][7] = function()
		{
			console.log("This door is locked");
		};
		eventmap[10][7].isLocked = true;
		*/
		/*
		eventmap[10][7] = new Wall(7, 10);
		eventmap[10][7].setIsLocked(true);
		eventmap[10][7].setMessage("* this door is locked * ");

		eventmap[1][1] = new Floor(1,1);
		var key = "afa";
		eventmap[1][1].putKey(key);
		eventmap[10][7].setKey(key);
		*/


		var maptip = game.assets[mapPath];
		var x = map.length;
		var y = map[0].length;
		var image = new Surface(320, 320);
		for (i = 0; i < x; i++) {
			for (j = 0; j < y; j++) {
				if (i % 2 == 0 && j % 2 == 0) {
					if(map[i][j] == 0)
					{
						image.draw(maptip, 0, 0, 4, 4, (j / 2) * 20, (i / 2) * 20, 4, 4);
					}
					else
					{
						image.draw(maptip, 112, 0, 4, 4, (j / 2) * 20, (i / 2) * 20, 4, 4);
					}
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
		playerImage = new Sprite(16, 16);
		playerImage.image = game.assets[playerImg];
		playerImage.x = 20 * playerImage.posX + 4;
		playerImage.y = 20 * playerImage.posY + 4;
		playerImage.addEventListener(Event.ENTER_FRAME, function () {
			playerImage.frame = player.m_direction;
			playerImage.tick++;
		});

		player = new Player(map, eventmap, 2, 2);

		eventmap[2][3] = new Door();
		var lockedDoor = new LockedDoor();
		lockedDoor.setOpenKey("Key:AutumnLeaves");

		var itemFloor = new ItemFloor();
		itemFloor.setItem("Key:AutumnLeaves");

		eventmap[10][7] = lockedDoor;
		eventmap[1][1] = itemFloor;


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
			this.context.strokeStyle = "rgb(0,0,0)";
			this.context.beginPath();
			this.context.rect(x, y, width, height);
			this.context.closePath();
			this.context.fill();
			this.context.stroke();
		};

		//視界の左側の台形の壁を描画
		enchant.Surface.prototype.drawLeftTrapezoidWall = function (color, x, y, longLen, legLen, shortLen) {
			this.context.fillStyle = color;
			this.context.strokeStyle = "rgb(0,0,0)";
			this.context.beginPath();
			this.context.moveTo(x, y);
			this.context.lineTo(x, y + longLen);
			this.context.lineTo(x + legLen, y + longLen - legLen);
			this.context.lineTo(x + legLen, y + legLen);
			this.context.closePath();
			this.context.fill();
			this.context.stroke();
		};

		//視界の右側の台形の壁を描画
		enchant.Surface.prototype.drawRightTrapezoidWall = function (color, x, y, longLen, legLen, shortLen) {
			this.context.fillStyle = color;
			this.context.strokeStyle = "rgb(0,0,0)";
			this.context.beginPath();
			this.context.moveTo(x, y);
			this.context.lineTo(x, y + longLen);
			this.context.lineTo(x - legLen, y + longLen - legLen);
			this.context.lineTo(x - legLen, y + legLen);
			this.context.closePath();
			this.context.fill();
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

		game.rootScene.addChild(playerImage);

		game.keybind(90, 'a');
		game.keybind(88, 'b');
		game.keybind(32, "space");
		listenDirectionKey();

		playerImage.redrawEyesight = function(eyesight)
		{
			var i, j, cY, cX;
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
			surface.drawSquareWall(createRgbColor(0,0,0), 0, 0, 48, 30);

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
	};

	function listenDirectionKey() {
		game.addEventListener(enchant.Event.UP_BUTTON_DOWN, move);
		game.addEventListener(Event.DOWN_BUTTON_DOWN, move);
		game.addEventListener(Event.RIGHT_BUTTON_DOWN, move);
		game.addEventListener(Event.LEFT_BUTTON_DOWN, move);
		game.addEventListener(Event.A_BUTTON_DOWN,onAButtonUp);
	}

	function onAButtonUp(e)
	{
		if (playerImage.tick < 5) {
			return;
		}

		//プレイヤーの正面が壁かどうか調べる
		var posX = player.getPosX();
		var posY = player.getPosY();

		var dir = player.getDirection();

		var mapIdxX = posX * 2 + 1;
		var mapIdxY = posY * 2 + 1;

		var moveIdxX = 0;
		var moveIdxY = 0;
		switch(dir)
		{
			case DIR_NORTH:
				moveIdxY --;
				break;
			case DIR_WEST:
				moveIdxX --;
				break;
			case DIR_SOUTH:
				moveIdxY ++;
				break;
			case DIR_EAST:
				moveIdxX ++;
				break;
		}

		if(map[mapIdxY + moveIdxY][mapIdxX + moveIdxX] == 0)
		{

		}
		else if (map[mapIdxY + moveIdxY][mapIdxX + moveIdxX] == 2)
		{
			eventmap[mapIdxY + moveIdxY][mapIdxX + moveIdxX].onSearchWall(player);
			playerImage.redrawEyesight(player.getEyesight());
			playerImage.x = 20 * player.m_posX + 4;
			playerImage.y = 20 * player.m_posY + 4;
			playerImage.tick = 0;
		}
	}

	function move(e) {
		if (playerImage.tick < 5) {
			return;
		}
		var needUpdateEyesight = false;
		switch (e.type) {
			case Event.UP_BUTTON_DOWN:
				//向いている方向に移動する
				player.moveForward();
				needUpdateEyesight = true;
				break;
			case Event.DOWN_BUTTON_DOWN:
				//後ろを向かせる
				player.turnAround();
				needUpdateEyesight = true;
				break;
			case Event.RIGHT_BUTTON_DOWN:
				//右回転
				player.turnRight();
				needUpdateEyesight = true;
				break;
			case Event.LEFT_BUTTON_DOWN:
				//左回転
				player.turnLeft();
				needUpdateEyesight = true;
				break;
			default:
				error("move()に不明なイベント" + e.type + "が渡されました。");
				break;
		}

		if (needUpdateEyesight) {
			/*
			var eyesight = player.getEyesight();
			var str = "";
			for(var i = 0;i<eyesight.length;i++)
			{
				str = "";
				for(var j =0;j<eyesight[i].length;j++)
				{
					str += "["+eyesight[i][j]+"]";
				}
				console.log(str);
			}
			*/
			var mapX = player.getPosX() * 2 + 1;
			var mapY = player.getPosY() * 2 + 1;
			if(eventmap[mapY][mapX] != null)
			{
				eventmap[mapY][mapX].onEnterFloor(player);
			}

			playerImage.redrawEyesight(player.getEyesight());
			playerImage.x = 20 * player.m_posX + 4;
			playerImage.y = 20 * player.m_posY + 4;
			playerImage.tick = 0;
		}

		/*
		var i, j,str;
		console.log("==========================");
		console.log("> player eyesight");
		for(i = 0;i<player.m_eyesight.length;i++)
		{
			str = "";
			for(j=0;j<player.m_eyesight[i].length;j++)
			{
				str += "["+player.m_eyesight[i][j]+"]";
			}
			console.log(str);
		}
		*/
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
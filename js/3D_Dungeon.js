/**
 * Created with IntelliJ IDEA.
 * User: Bob_Mk2
 * Date: 13/04/01
 * Time: 0:52
 */
enchant();

var DIR_TOP = 0;
var DIR_LEFT = 1;
var DIR_BOTTOM = 2;
var DIR_RIGHT = 3;
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
		player = new Sprite(16,16);
		player.image = game.assets[playerImg];
		player.posX = 2;
		player.posY = 2;
		player.x = 20 * player.posX + 4;
		player.y = 20 * player.posY + 4;
		player.direction = DIR_TOP;//向いてる方向
		player.addEventListener(Event.ENTER_FRAME, function()
		{
			player.frame = player.direction;
			player.tick ++;
		});

		//視界文字列
		var label = new Label("視界");
		label.font = "12px monospace";
		label.x = 140;
		label.y = 0;
		game.rootScene.addChild(label);

		player.updateEyesight = function()
		{
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
			console.log("mapIdxX:"+mapIdxX + " / mapIdxY:"+mapIdxY);
			var startIdxX = 0;
			var startIdxY = 0;
			var endIdxX = 0;
			var endIdxY = 0;

			//プレイヤーの視界を更新
			switch(player.direction)
			{
				case DIR_TOP:
					startIdxX = mapIdxX - 3;
					startIdxY = mapIdxY - 5;

					endIdxX = mapIdxX + 3;
					endIdxY = mapIdxY + 1;

					var cY = 0;
					var cX = 0;
					for(var i =startIdxY;i<=endIdxY;i++)
					{
						if(i < 0 || i >= map.length)
						{
							cY ++;
							continue;
						}
						cX = 0;
						for(var j=startIdxX;j<=endIdxX;j++)
						{
							if(j < 0 || j >= map[0].length)
							{
								cX ++;
								continue;
							}
							eyesight[cY][cX] = map[i][j];
							cX ++;
						}
						cY ++;
					}
					break;
				case DIR_LEFT:
					startIdxX = mapIdxX - 5;
					startIdxY = mapIdxY - 3;

					endIdxX = mapIdxX + 1;
					endIdxY = mapIdxY + 3;

					var cY =eyesight.length - 1;
					var cX = 0;
					for(var i =startIdxY;i<=endIdxY;i++)
					{
						if(i < 0 || i >= map.length)
						{
							cY --;
							continue;
						}
						cX = 0;
						for(var j=startIdxX;j<=endIdxX;j++)
						{
							if(j < 0 || j >= map[0].length)
							{
								cX ++;
								continue;
							}
							eyesight[cX][cY] = map[i][j];
							cX ++;
						}
						cY --;
					}
					break;
				case DIR_BOTTOM:
					startIdxX = mapIdxX - 3;
					startIdxY = mapIdxY - 1;

					endIdxX = mapIdxX + 3;
					endIdxY = mapIdxY + 5;

					var cY = eyesight.length - 1;
					var cX = eyesight[0].length - 1;
					for(var i =startIdxY;i<=endIdxY;i++)
					{
						if(i < 0 || i >= map.length)
						{
							cY --;
							continue;
						}
						cX = eyesight[0].length - 1;
						for(var j=startIdxX;j<=endIdxX;j++)
						{
							if(j < 0 || j >= map[0].length)
							{
								cX --;
								continue;
							}
							eyesight[cY][cX] = map[i][j];
							cX --;
						}
						cY --;
					}
					break;
				case DIR_RIGHT:
					startIdxX = mapIdxX - 1;
					startIdxY = mapIdxY - 3;

					endIdxX = mapIdxX + 5;
					endIdxY = mapIdxY + 3;
					console.log("sX:"+startIdxX+" > eX:"+endIdxX + " / sY:"+startIdxY+" > eY:"+endIdxY);
					var cY = 0;
					var cX = eyesight[0].length - 1;
					for(var i =startIdxY;i<=endIdxY;i++)
					{
						if(i < 0 || i >= map.length)
						{
							cY ++;
							continue;
						}
						cX = eyesight[0].length - 1;
						for(var j=startIdxX;j<=endIdxX;j++)
						{
							if(j < 0 || j >= map[0].length)
							{
								cX --;
								continue;
							}
							eyesight[cX][cY] = map[i][j];
							cX --;
						}
						cY ++;
					}
					break;
			}

			var str = ">";
			var sX = 165;

			for(var i =0;i<eyesight.length;i++)
			{
				for(var j=0;j<eyesight[i].length;j++)
				{
					str += eyesight[i][j] + ","
					if (i % 2 == 0 && j % 2 == 0) {
						image.draw(maptip, 144, 0, 4, 4,sX+ (j / 2) * 20, (i / 2) * 20, 4, 4);
					}
					else if (i % 2 == 1 && j % 2 == 1) {
						if (eyesight[i][j] == 0) {
							image.draw(maptip, 0, 0, 16, 16,sX+ ((j - 1) / 2 * 20) + 4, ((i - 1) / 2 * 20) + 4, 16, 16);
						}
						else if (eyesight[i][j] == 1) {
							image.draw(maptip, 112, 0, 16, 16, sX+((j - 1) / 2 * 20) + 4, ((i - 1) / 2 * 20) + 4, 16, 16);
						}
						else
						{
							image.draw(maptip, 144, 0, 16, 16, sX+((j - 1) / 2 * 20) + 4, ((i - 1) / 2 * 20) + 4, 16, 16);
						}
					}
					else if (i % 2 == 1 && j % 2 == 0) {
						if (eyesight[i][j] == 0) {
							image.draw(maptip, 0, 0, 4, 16,sX+ (j / 2 * 20), ((i - 1) / 2 * 20) + 4, 4, 16);
						}
						else if (eyesight[i][j] == 1) {
							image.draw(maptip, 112, 0, 4, 16,sX+ (j / 2 * 20), ((i - 1) / 2 * 20) + 4, 4, 16);
						}
						else
						{
							image.draw(maptip, 144, 0, 4, 16,sX+ (j / 2 * 20), ((i - 1) / 2 * 20) + 4, 4, 16);
						}
					}
					else if (i % 2 == 0 && j % 2 == 1) {
						//壁
						if (eyesight[i][j] == 0) {
							image.draw(maptip, 0, 0, 16, 4,sX+ ((j - 1) / 2 * 20) + 4, (i / 2 * 20), 16, 4);
						}
						else if (eyesight[i][j] == 1) {
							image.draw(maptip, 112, 0, 16, 4,sX+ ((j - 1) / 2 * 20) + 4, (i / 2 * 20), 16, 4);
						}
						else
						{
							image.draw(maptip, 144, 0, 16, 4,sX+ ((j - 1) / 2 * 20) + 4, (i / 2 * 20), 16, 4);
						}
					}
				}
				console.log(str);
				str = ">";
			}

		};

		player.move = function(dir)
		{
			//壁チェック
			//mapの座標に変換する
			var mapIdxX = player.posX * 2 + 1;
			var mapIdxY = player.posY * 2 + 1;

			var movePosX = 0;
			var movePosY = 0;
			switch(dir)
			{
				case DIR_TOP:
					if(map[mapIdxY-1][mapIdxX] == 0)
					{
						movePosY = -1;
					}
					break;
				case DIR_LEFT:
					if(map[mapIdxY][mapIdxX-1] == 0)
					{
						movePosX = -1;
					}
					break;
				case DIR_BOTTOM:
					if(map[mapIdxY+1][mapIdxX] == 0)
					{
						movePosY = 1;
					}
					break;
				case DIR_RIGHT:
					if(map[mapIdxY][mapIdxX+1] == 0)
					{
						movePosX = 1;
					}
					break;
			}

			if(movePosX != 0 || movePosY != 0)
			{
				player.posX += movePosX;
				player.posY += movePosY;
				player.x = 20 * player.posX + 4;
				player.y = 20 * player.posY + 4;

				player.updateEyesight();
			}
		};

		game.rootScene.addChild(player);

		listenDirectionKey();
	}

	function listenDirectionKey()
	{
		game.addEventListener(Event.UP_BUTTON_DOWN,move);
		game.addEventListener(Event.DOWN_BUTTON_DOWN,move);
		game.addEventListener(Event.RIGHT_BUTTON_DOWN,move);
		game.addEventListener(Event.LEFT_BUTTON_DOWN,move);
	}

	function move(e){
		if(player.tick < 5)
		{
			return;
		}
		switch(e.type){
			case Event.UP_BUTTON_DOWN:
				if(player.direction != DIR_TOP)
				{
					player.direction = DIR_TOP;
				}
				else
				{
					player.move(DIR_TOP);
				}
				player.tick = 0;
				break;
			case Event.DOWN_BUTTON_DOWN:
				if(player.direction != DIR_BOTTOM)
				{
					player.direction = DIR_BOTTOM;
				}
				else
				{
					player.move(DIR_BOTTOM);
				}
				player.tick = 0;
				break;
			case Event.RIGHT_BUTTON_DOWN:
				if(player.direction != DIR_RIGHT)
				{
					player.direction = DIR_RIGHT;
				}
				else
				{
					player.move(DIR_RIGHT);
				}
				player.tick = 0;
				break;
			case Event.LEFT_BUTTON_DOWN:
				if(player.direction != DIR_LEFT)
				{
					player.direction = DIR_LEFT;
				}
				else
				{
					player.move(DIR_LEFT);
				}
				player.tick = 0;
				break;
			default:
				error("move()に不明なイベント" + e.type + "が渡されました。");
				break;
		}
	}

	game.start();
};
/**
 * Created with IntelliJ IDEA.
 * User: Bob_Mk2
 * Date: 13/04/01
 * Time: 0:52
 */
enchant();

window.onload = function () {
	var game = new Game(320, 320);
	game.fps = 30;

	var mapPath = 'http://enchantjs.com/assets/images/map0.gif';
	game.preload(mapPath);

	game.onload = function () {
		var bg = new Sprite(320, 320);

		var map = [
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
	}


	game.start();
};
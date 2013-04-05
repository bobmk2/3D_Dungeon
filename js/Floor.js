/**
 * Created with IntelliJ IDEA.
 * User: Bob_Mk2
 * Date: 13/04/06
 * Time: 3:02
 */
var Floor = function(x, y)
{
	this.m_x = x;
	this.m_y = y;
	this.m_key = null;
}

Floor.prototype.getMessage = function()
{
	return "* this is floor *";
};

Floor.prototype.putKey = function(key)
{
	this.m_key = key;
}

/**
 * プレイヤーがこの床に乗った時の処理
 */
Floor.prototype.onEnterPlayer = function(player)
{
	player.addKey(this.m_key);
};

/**
 * プレイヤーがこの床を離れた時の処理
 */
Floor.prototype.onLeavePlayer = function(player)
{

};
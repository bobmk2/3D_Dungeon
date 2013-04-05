/**
 * Created with IntelliJ IDEA.
 * User: Bob_Mk2
 * Date: 13/04/06
 * Time: 0:13
 */
var Wall = function(x, y) {
	this.m_x = x;
	this.m_y = y;
};

Wall.prototype.x = function () {
	return this.m_x;
};

Wall.prototype.y = function () {
	return this.m_y;
};

Wall.prototype.setIsLocked = function (isLocked) {
	this.m_isLocked = isLocked;
};

Wall.prototype.isLocked = function () {
	return this.m_isLocked;
};

Wall.prototype.setKey = function (key)
{
	this.m_key = key;
};

Wall.prototype.openKey = function (keys)
{
	if(keys[this.m_key] == true)
	{
		console.log("key is match");
		this.m_isLocked = false;
		return true;
	}
	else
	{
		return false;
	}
};

Wall.prototype.setMessage = function (message) {
	this.m_message = message;
};

Wall.prototype.getMessage = function () {
	return this.m_message;
};
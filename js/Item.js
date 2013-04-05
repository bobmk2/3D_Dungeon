/**
 * Created with IntelliJ IDEA.
 * User: Bob_Mk2
 * Date: 13/04/06
 * Time: 1:34
 */
var Item = function(x, y)
{
	this.m_x = x;
	this.m_y = y;
}

Item.prototype.applyEvent = function()
{
	console.log("* event is not found *");
}

Item.prototype.setMessage = function(message)
{
	this.m_message = message;
}

Item.prototype.getMessage = function()
{
	return this.m_message;
}
/**
 * Script made by Goinza.
 * 
 * Adds a bar to the stats of a unit, similar to the GBA FE games.
 * It also makes the number of a maxed stat green, to make it clear that it can't get any higher.
 * 
 * Another feature is having the bonus from weapons, items, skills, etc to be sepparate from the normal stat values.
 * For example, a unit with 10 str and a bonus 3 str normally shows as 13, but with this script it will show as 10 + 3.
 * You can also edit the colors of the plus sign, minus sign, positive bonus number and negative bonus number separately with just editing some variables.
 * 
 * IMPORTANT NOTE: TO EDIT THE VALUES OF THE BARS, NUMBERS, SIGNS, ETC. USE THE editable-values.js FILE
 */

StatusScrollbar._unit = null;


var alias1 = StatusScrollbar.initialize;
StatusScrollbar.initialize = function() {
	alias1.call(this);
	this._pic = root.getMaterialManager().createImage(STAT_BAR_SETTING.Folder, STAT_BAR_SETTING.GaugeImg[0])
}

StatusScrollbar.drawScrollContent = function(x, y, object, isSelect, index) {
    var statusEntry = object;
    var n = statusEntry.param;
    var text = statusEntry.type;
    var textui = this.getParentTextUI();
    var font = textui.getFont();
    var length = this._getTextLength();

    statusEntry.textui = textui;
    if (statusEntry.isRenderable) {
        ParamGroup.drawUnitParameter(x, y, statusEntry, isSelect, statusEntry.index);
    }
    else {      
        //Only draw the stat bar if the stat is not renderable.
        //Usually, a renderable stat doesn't necessary uses number, so the bar is not needed          

        var min = ParamGroup.getMinValue(this._unit, statusEntry.index);
        var max = ParamGroup.getMaxValue(this._unit, statusEntry.index);
        var step;
        if (min==max) {
            step = STAT_BAR_SETTING.PicVersions;
        }
        else {
            step = Math.floor((statusEntry.param - min) * STAT_BAR_SETTING.PicVersions / (max - min));
        }    
        this._pic.drawParts(x + this._getNumberSpace() - 37, y + 10, 0, step * STAT_BAR_SETTING.PicHeight, STAT_BAR_SETTING.PicWidth, STAT_BAR_SETTING.PicHeight);

        TextRenderer.drawKeywordText(x, y, text, length, ColorValue.KEYWORD, font);
        x += this._getNumberSpace() - 10;

        if (n < 0) {
            n = 0;
        }
        if (n==max) {
            NumberRenderer.drawNumberColor(x, y, n, MAX_STAT_COLOR, 255);
        }
        else {
            NumberRenderer.drawNumberColor(x, y, n, NORMAL_STAT_COLOR, 255);
        }
               
    }
    
    if (statusEntry.bonus !== 0) {
        this._drawBonus(x, y, statusEntry);
    }
},

UnitStatusScrollbar._createStatusEntry = function(unit, index, weapon) {
    var statusEntry = StructureBuilder.buildStatusEntry();
    
    statusEntry.type = ParamGroup.getParameterName(index);
    if (BONUS_SETTING.USE_PLUS_MINUS_SIGN) {
        statusEntry.param = ParamGroup.getClassUnitValue(unit, index);
        statusEntry.bonus = ParamGroup.getLastValue(unit, index, weapon) - ParamGroup.getClassUnitValue(unit, index);
    }
    else {
        statusEntry.param = ParamGroup.getLastValue(unit, index, weapon);
        statusEntry.bonus = 0;
    }
    
    statusEntry.index = index;
    statusEntry.isRenderable = ParamGroup.isParameterRenderable(index);
    
    return statusEntry;
},

StatusScrollbar.setStatusFromUnit = function(unit) {
    var i, j;
    var count = ParamGroup.getParameterCount();
    var weapon = ItemControl.getEquippedWeapon(unit);
    
    this._statusArray = [];
    
    for (i = 0, j = 0; i < count; i++) {
        if (this._isParameterDisplayable(i)) {
            this._statusArray[j++] = this._createStatusEntry(unit, i, weapon);
        }
    }
    
    this.setScrollFormation(this.getDefaultCol(), this.getDefaultRow());
    this.setObjectArray(this._statusArray);
    this._unit = unit;
};

StatusScrollbar._drawBonus = function(x, y, statusEntry) {
    var n = statusEntry.bonus;
    
    x += 10;

    if (statusEntry.bonus > 0) {
        TextRenderer.drawKeywordText(x, y, "+", -1, BONUS_SETTING.PLUS_SIGN_COLOR, TextRenderer.getDefaultFont());
        x += 10;
        NumberRenderer.drawNumberColor(x, y, n, BONUS_SETTING.PLUS_NUMBER_COLOR, 255);
    }
    else {
        // Adjust with the following code because the drawNumber cannot be specified minus.
        n = statusEntry.bonus * -1;
        TextRenderer.drawKeywordText(x, y, "-", -1, BONUS_SETTING.MINUS_SIGN_COLOR, TextRenderer.getDefaultFont());
        x += 10;
        NumberRenderer.drawNumberColor(x, y, n, BONUS_SETTING.MINUS_NUMBER_COLOR, 255);
    }
    
    if (this._isCursorDraw) {
        this._drawRiseCursor(x, y, statusEntry.bonus > 0);
    }
}
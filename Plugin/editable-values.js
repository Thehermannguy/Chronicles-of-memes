/**
 * Script made by Goinza.
 * 
 * Here are all the value that you can edit, without having any code knowledge.
 * 
 * Read the commens above each value to know what they do and how to modify them.
 */

/**
 * Here you can change the color of the normal stats and the max stats numbers.
 * Each number has a color associated:
 * 0 White - 1 Blue - 2 Green - 3 Red - 4 Black
 */
NORMAL_STAT_COLOR = 0; //White
MAX_STAT_COLOR = 2;    //Green

/**
 * Here you can choose which bars to use.
 * Each name in GaugeImg is the name of one of the images. All images must be in the Material folder, having a sub-folder called StatBar.
 * You can make your own bars, as long as they are in the right folder, and edit the value of GaugeImg to put your file's name.
 * The requirements for each image is that they must have 25 versions of the bar (from empty to full, being the empty above the others),
 * and the size of each bar must have width of 58 pixels and height of 11 pixels, including all the empty pixels the bar could have above it and at the left side.
 * 
 * If USE_DEFAULT_BAR is true, it will only use the first option on GaugeImg.
 * If you want to change which bars are at every position, consider that, assuming default stats, the first bar is associated with Str, the second with Mag, and so on.
 */
STAT_BAR_SETTING = {
    Folder        : 'StatBar' //Name of the folder where the bar images are in		
    //GaugeImg has the list of each bar available, you can freely edit this adding the names of each bar that you have in the StatBar folder
  , GaugeImg      : ['LyolfBarBlue.png', 'LyolfBarBrown.png', 'LyolfBarCyan.png', 'LyolfBarGreen.png', 'LyolfBarLightYellow.png', 'LyolfBarOrange.png', 'LyolfBarPink.png', 'LyolfBarPurple.png', 'LyolfBarRed.png', 'LyolfBarWhite.png', 'LyolfBarYellow.png']			
  , PicWidth      : 58	//DO NOT EDIT THIS VALUE
  , PicHeight     : 11  //DO NOT EDIT THIS VALUE
  , PicVersions   : 24	//DO NOT EDIT THIS VALUE				    		
};

/**
 * Set this value to false if you want each stat to have a different colored bar
 * If the value is true, the first pic of the GaugeImg array will be used
 */ 
USE_DEFAULT_BAR = true;

/**
 * Here you can edit the values regarding the bonus stats.
 * If you set USE_PLUS_MINUS_SIGN to true, it shows the bonus stats (from items, skill, etc) sepparate from the normal values of each stat.
 * If is set to false, it behaves as normal.
 * 
 * Assuming the first value is set to true, you can edit the other values to change the color of numbers, plus sign and minus sign. 
 * The first two use RGB hex values, so if you want to edit them you need to find which value correspond with which color.
 * The last two use the same value as other numbers, so: 0 White - 1 Blue - 2 Green - 3 Red - 4 Black
 */
BONUS_SETTING = {
    USE_PLUS_MINUS_SIGN : true,
    PLUS_SIGN_COLOR : 0x00ff00,  //Green
    MINUS_SIGN_COLOR : 0xff0000, //Red
    PLUS_NUMBER_COLOR : 2,       //Green
    MINUS_NUMBER_COLOR : 3       //Red
}
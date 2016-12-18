//=============================================================================
// kkdMaxItems.js
// Version: 0.02(2016/5/15)
//=============================================================================
/*:ja
 * @plugindesc アイテムの所持可能数を変更.
 * @author 唐傘ドール
 * @param ITEM_MAX
 * @desc 
 * @default 99
 * @help
 * ■アイテムのメモ欄に表記
 *   <max:n> # 最大所持数
 */

(function() {
    var parameters = PluginManager.parameters('kkdMaxItems');
	// ここで代入、parameters['ALLSkill ID'] が、獲得するための値
    var itemMax = parseInt(parameters['ITEM_MAX'] || 99);

    Game_Party.prototype.maxItems = function(item) {
		return parseInt(item.meta.max || itemMax);
	};
})();


//=============================================================================
// map_create_supplement.js
// by デスポン
// 最終更新: 2016.1.3
//=============================================================================

/*:
 * @plugindesc マップエディタ上で遠景の通行指定を視覚化するプラグイン。
 * @author デスポン
 * @version 1.0
 * 
 * @help
 * マップエディタ上で遠景の通行指定を視覚化するプラグインです。
 * 機能としては指定したタイルが設置されていた場合に
 * ゲーム上でそのタイルを別のタイルに置き換えて表示する機能を実装します。
 *  
 * @param passable tile
 * @desc エディタで表示する通行可能タイルのタイルIDを入力する。
 * Default: 1544
 * @default 1544
 *  
 * @param impassable tile
 * @desc エディタで表示する通行不能タイルのタイルIDを入力する。
 * Default: 1552
 * @default 1552
 */
 
(function() {
    
    //初期値を設定する。
    var parameters = PluginManager.parameters('MapCreateSupplement');
    var passable_tile = parseInt(parameters['passable tile'] || 1544);
    var impassable_tile = parseInt(parameters['impassable tile'] || 1552);
    
    Game_Map.prototype.data = function() {
        //マップデータの配列の確認し該当するIDを探しそのIDに+1する。
        for (tile in $dataMap.data){
            if ($dataMap.data[tile] == passable_tile || $dataMap.data[tile] == impassable_tile) {$dataMap.data[tile] += 1}    
        }
        return $dataMap.data;
    };
    
})();
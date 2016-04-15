//=============================================================================
// change_player_movespeed.js
// by デスポン
// 最終更新: 2016.3.16
//=============================================================================

/*:
 * @plugindesc プレイヤーの移動速度を変更するプラグインです。
 * @author デスポン
 * @version 1.0
 * 
 * @help
 * プレイヤーの移動速度を変更するプラグインです。
 * 通常時の移動速度とダッシュ時の移動速度を変更します。
 * ダッシュ制御は「プレイヤーの移動速度+X」という形で行われており、通常時は「+0」でダッシュ時は「+1」になっています。
 * このプラグインでは「+X」の部分に入るXを変更できるようになるという内容です。
 *  
 * @param normal speed
 * @desc 通常時の移動速度を設定します。
 * Default: 0
 * @default 0
 *  
 * @param dash speed
 * @desc ダッシュ時の移動速度を設定します。
 * Default: 1
 * @default 1
 */
 
(function() {
    
    //初期値を設定する。
    var parameters = PluginManager.parameters('change_player_movespeed');
    var normal_speed = parseInt(parameters['normal speed'] || 0);
    var dash_speed = parseInt(parameters['dash speed'] || 1);
    
    Game_CharacterBase.prototype.realMoveSpeed = function() {
        return this._moveSpeed + (this.isDashing() ? 1.5 : 1);
    };

    
})();
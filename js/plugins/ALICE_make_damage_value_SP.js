//=============================================================================
// makeDamageValue_SP.js
// by デスポン
// 最終更新: 2016.5.22
//=============================================================================

/*:
 * @plugindesc ダメージ計算を好き勝手に弄る。
 * @author デスポン
 * @version 1.0
 * 
 * @help
 * ダメージ計算を弄るんですよ。
 * 分散度がスキル固有のクリティカル率に置き換わり、全スキルの分散度が20%で固定されます。
 * またクリティカルの威力が２倍になります。
 */
 
(function() {

Game_Action.prototype.itemCri = function(target) {
    return this.item().damage.critical ? this.subject().cri + (this.item().damage.variance / 100) * (1 - target.cev) : 0;
};
    
Game_Action.prototype.makeDamageValue = function(target, critical) {
    var item = this.item();
    var baseValue = this.evalDamageFormula(target);
    var value = baseValue * this.calcElementRate(target);
    if (this.isPhysical()) {
        value *= target.pdr;
    }
    if (this.isMagical()) {
        value *= target.mdr;
    }
    if (baseValue < 0) {
        value *= target.rec;
    }
    //if (critical) {
    //    value = this.applyCritical(value);
    //}
    
    //value = this.applyVariance(value, 20);
    value *= $gameVariables.value(33)
    value /= 100
    value = this.applyGuard(value, target);
    value = Math.round(value);
    return value;
};

Game_Action.prototype.applyCritical = function(damage) {
    return damage * 2;
};

})();
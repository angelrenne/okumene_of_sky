/*:
 * @plugindesc キャラクターを指定位置まで移動させる
 * @author 042
 *
 * @help
 * 移動ルートの設定＞スクリプト
 * this.toMove(x, y);
 */
(function() {
    Game_Character.prototype.toMove = function(x, y) {
        var q = setInterval(function() {
            if (!this.isMoving()) {
                var sx = this.deltaXFrom(x),
                    sy = this.deltaYFrom(y);
                if (sx !== 0 && sy !== 0) {
                    this.moveDiagonally(sx > 0 ? 4 : 6, sy > 0 ? 8 : 2);
                } else if (sx !== 0) {
                    this.moveStraight(sx > 0 ? 4 : 6);
                } else if (sy !== 0) {
                    this.moveStraight(sy > 0 ? 8 : 2);
                }
                if (this._moveRouteIndex === 0) clearInterval(q);
            }
        }.bind(this), 0);
    };
})();

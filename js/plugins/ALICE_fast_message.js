//=============================================================================
// fast_message_SP.js
// by デスポン
// 最終更新: 2016.8.20
//=============================================================================

/*:
 * @plugindesc メッセージを瞬間表示
 * @author デスポン
 * @version 1.0
 * 
 * @help
 * \.の外字を無力化し、強制的に全てのメッセージを瞬間表示させます。
 */
 
(function() {

Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    switch (code) {
    case '$':
        this._goldWindow.open();
        break;
    case '.':
        //this.startWait(15); 文字表示にウェィトをかける外字を無力化
        break;
    case '|':
        this.startWait(60);
        break;
    case '!':
        this.startPause();
        break;
    case '>':
        this._lineShowFast = true;
        break;
    case '<':
        this._lineShowFast = false;
        break;
    case '^':
        this._pauseSkip = true;
        break;
    default:
        Window_Base.prototype.processEscapeCharacter.call(this, code, textState);
        break;
    }
};
    
Window_Message.prototype.updateMessage = function() {
    this._lineShowFast = true　//強制的に瞬間表示をtrueにする。
    if (this._textState) {
        while (!this.isEndOfText(this._textState)) {
            if (this.needsNewPage(this._textState)) {
                this.newPage(this._textState);
            }
            this.updateShowFast();
            this.processCharacter(this._textState);
            if (!this._showFast && !this._lineShowFast) {
                break;
            }
            if (this.pause || this._waitCount > 0) {
                break;
            }
        }
        if (this.isEndOfText(this._textState)) {
            this.onEndOfText();
        }
        return true;
    } else {
        return false;
    }
};

})();
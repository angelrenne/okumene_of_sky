//=============================================================================
// call_map_event.js
// by デスポン
// 最終更新: 2016.1.3
//=============================================================================

/*:
 * @plugindesc 同名マップにある指定したイベントを強制的に起動するプラグイン。
 * @author デスポン
 * @version 1.0
 * 
 * @help
 * callmapevent id page_num
 * id イベントのIDを指定します。
 * page_num イベントのページ番号を指定します。省略すると現在のIDになります。
 */
 
(function() {
  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    if (command.toUpperCase() === 'CALLMAPEVENT') {
      subject = this.character(eval(args[0]));
      if (args[1].toUpperCase() === 'CANCEL') {
        subject.clearTarget();
      } else if (args.length > 2) {
        subject.setTarget(null, eval(args[1]), eval(args[2]));
      } else {
        subject.setTarget(this.character(eval(args[1])));
      }
    }
  };

  var _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
  Game_CharacterBase.prototype.initMembers = function() {
    _Game_CharacterBase_initMembers.call(this);
    this._target = null;
    this._targetX = null;
    this._targetY = null;
  };

  Game_CharacterBase.prototype.setTarget = function(target, targetX, targetY) {
    this._target = target;
    if (this._target) {
      this._targetX = this._target.x;
      this._targetY = this._target.y;
    } else {
      this._targetX = targetX;
      this._targetY = targetY;
    }
  };

  Game_CharacterBase.prototype.clearTarget = function() {
    this._target = null;
    this._targetX = null;
    this._targetY = null;
  };

  var _Game_CharacterBase_updateStop = Game_CharacterBase.prototype.updateStop;
  Game_CharacterBase.prototype.updateStop = function() {
    _Game_CharacterBase_updateStop.call(this);

    if (this._target) {
      this._targetX = this._target.x;
      this._targetY = this._target.y;
    }

    if (this._targetX != null) {
      direction = this.findDirectionTo(this._targetX, this._targetY);
      if (direction > 0)
      {
        this.moveStraight(direction);
      }
    }
  };
})();

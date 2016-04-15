//=============================================================================
// TMVplugin - メッセージ制御文字拡張
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.2
// 最終更新日: 2015/12/31
//=============================================================================

/*:
 * @plugindesc 文章の表示に使える制御文字を追加します。
 * 
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @help
 * イベントコマンド『文章の表示』と『選択肢の表示』、
 * データベースの『説明』などで使用できます。
 *
 * \J[n]      # n 番の職業名に置き換えます。
 * \AJ[n]     # n 番のアクターの現在の職業名に置き換えます。
 * \PJ[n]     # n 番目のパーティメンバーの現在の職業名に置き換えます。
 * \IN[n]     # n 番のアイテム名（アイコン付き）に置き換えます。
 * \WN[n]     # n 番の武器名（アイコン付き）に置き換えます。
 * \AN[n]     # n 番の防具名（アイコン付き）に置き換えます。
 * \SN[n]     # n 番のスキル名（アイコン付き）に置き換えます。
 * \ML[n]     # n 番のアクターのレベル上限に置き換えます。
 * \INUM[n]   # n 番のアイテムの所持数に置き換えます。
 *              ただし、0 番を指定した場合は所持金に置き換えます。
 * \WNUM[n]   # n 番の武器の所持数に置き換えます。
 * \ANUM[n]   # n 番の防具の所持数に置き換えます。
 *
 * おまけ機能として、動的な説明が設定されたアイテム（スキル）の
 * 説明文が戦闘中に更新されない場合があるという不都合も修正します。
 *
 */

var Imported = Imported || {};
Imported.TMTextEscape = true;

(function() {

  var _Window_Base_convertEscapeCharacters = 
      Window_Base.prototype.convertEscapeCharacters;
  Window_Base.prototype.convertEscapeCharacters = function(text) {
    text = _Window_Base_convertEscapeCharacters.call(this, text);
    text = text.replace(/\x1bJ\[(\d+)\]/gi, function() {
      return this._className(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bAJ\[(\d+)\]/gi, function() {
      return this.actorClassName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bPJ\[(\d+)\]/gi, function() {
        return this.partyMemberClassName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bIN\[(\d+)\]/gi, function() {
      return this.itemName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bWN\[(\d+)\]/gi, function() {
      return this.weaponName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bAN\[(\d+)\]/gi, function() {
      return this.armorName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bSN\[(\d+)\]/gi, function() {
      return this.skillName(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bML\[(\d+)\]/gi, function() {
      return this.maxLevel(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bINUM\[(\d+)\]/gi, function() {
      return this.itemNumber(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bWNUM\[(\d+)\]/gi, function() {
      return this.weaponNumber(parseInt(arguments[1]));
    }.bind(this));
    text = text.replace(/\x1bANUM\[(\d+)\]/gi, function() {
      return this.armorNumber(parseInt(arguments[1]));
    }.bind(this));
    return text;
  };

  Window_Base.prototype._className = function(n) {
    var _class = n >= 1 ? $dataClasses[n] : null;
    return _class ? _class.name : '';
  };

  Window_Base.prototype.actorClassName = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.currentClass().name : '';
  };

  Window_Base.prototype.partyMemberClassName = function(n) {
    var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.currentClass().name : '';
  };

  Window_Base.prototype.itemName = function(n) {
    var item = n >= 1 ? $dataItems[n] : null;
    if (item) {
      return '\x1bI[' + item.iconIndex + ']' + item.name
    }
    return '';
  };

  Window_Base.prototype.weaponName = function(n) {
    var item = n >= 1 ? $dataWeapons[n] : null;
    if (item) {
      return '\x1bI[' + item.iconIndex + ']' + item.name
    }
    return '';
  };

  Window_Base.prototype.armorName = function(n) {
    var item = n >= 1 ? $dataArmors[n] : null;
    if (item) {
      return '\x1bI[' + item.iconIndex + ']' + item.name
    }
    return '';
  };

  Window_Base.prototype.skillName = function(n) {
    var item = n >= 1 ? $dataSkills[n] : null;
    if (item) {
      return '\x1bI[' + item.iconIndex + ']' + item.name
    }
    return '';
  };

  Window_Base.prototype.maxLevel = function(n) {
    var actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.maxLevel() : '';
  };

  Window_Base.prototype.itemNumber = function(n) {
    if (n === 0) {
      return $gameParty.gold();
    }
    var item = n >= 1 ? $dataItems[n] : null;
    if (item) {
      return $gameParty.numItems(item);
    }
    return '';
  };

  Window_Base.prototype.weaponNumber = function(n) {
    var item = n >= 1 ? $dataWeapons[n] : null;
    if (item) {
      return $gameParty.numItems(item);
    }
    return '';
  };

  Window_Base.prototype.armorNumber = function(n) {
    var item = n >= 1 ? $dataArmors[n] : null;
    if (item) {
      return $gameParty.numItems(item);
    }
    return '';
  };

  //-----------------------------------------------------------------------------
  // Scene_Battle
  //

  var _Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
  Scene_Battle.prototype.commandSkill = function() {
    _Scene_Battle_commandSkill.call(this);
    this._helpWindow.refresh();
  };

})();
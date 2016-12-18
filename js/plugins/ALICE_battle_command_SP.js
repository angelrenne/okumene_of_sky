//=============================================================================
// ALICE_battle_command_SP.js
// by デスポン
// 最終更新: 2016.7.13
//=============================================================================

/*:
 * @plugindesc バトルコマンドでスキル選択を省いて指定したスキルを強制的に発動する。
 * @author デスポン
 * @version 1.0
 * 
 * @help
 * 攻撃・スキルなどを使用したときの挙動を弄ります。
 */
 
(function() {
    Scene_Battle.prototype.createActorCommandWindow = function() {
        this._actorCommandWindow = new Window_ActorCommand();
        this._actorCommandWindow.setHandler('attack', this.commandAttack.bind(this));
        this._actorCommandWindow.setHandler('skill',  this.commandSkill.bind(this));
        this._actorCommandWindow.setHandler('guard',  this.commandGuard.bind(this));
        this._actorCommandWindow.setHandler('item',   this.commandItem.bind(this));
        //this._actorCommandWindow.setHandler('cancel', this.selectPreviousCommand.bind(this));
        this.addWindow(this._actorCommandWindow);
    };
    
    //エネミー選択WINを消す
    Scene_Battle.prototype.createEnemyWindow = function() {
        this._enemyWindow = new Window_BattleEnemy(0, this._statusWindow.y);
        this._enemyWindow.x = Graphics.boxWidth - this._enemyWindow.width;
        this._enemyWindow.opacity = 0;
        this._enemyWindow.setHandler('ok',     this.onEnemyOk.bind(this));
        this._enemyWindow.setHandler('cancel', this.onEnemyCancel.bind(this));
        this.addWindow(this._enemyWindow);
    };
    Scene_Battle.prototype.selectEnemySelection = function() {
        this._enemyWindow.refresh();
        this._enemyWindow.show();
        this._enemyWindow.select(0);
        this._enemyWindow.activate();
    };
    Window_BattleEnemy.prototype.initialize = function(x, y) {
        this._enemies = [];
        var width = this.windowWidth();
        var height = this.windowHeight();
        Window_Selectable.prototype.initialize.call(this, x, y, width, height);
        this.contentsOpacity = 0;
        this.refresh();
        this.hide();
    };


    Scene_Battle.prototype.commandAttack = function() {
        //攻撃を入力すると武器に応じたスキルが自動的に発動します。
        var e_id  = BattleManager.actor()._equips[0]._item._itemId
        //console.log($dataWeapons[e_id].wtypeId)
        if (e_id != 0){
            switch ($dataWeapons[e_id].wtypeId){
            case 1:
              var skill = $dataSkills[13]
              break
            case 2:
              var skill = $dataSkills[14] 
              break
            case 3:
              var skill = $dataSkills[15] 
              break
            case 4:
              var skill = $dataSkills[16] 
              break
            case 5:
              var skill = $dataSkills[17] 
              break
            }
        } else {
            var skill = $dataSkills[13]
        }
        var action = BattleManager.inputtingAction();
        action.setSkill(skill.id);
        BattleManager.actor().setLastBattleSkill(skill);
        this.onSelectAction();
    };

    Scene_Skill.prototype.commandSkill = function() {
        //this._itemWindow.activate();
        //this._itemWindow.selectLast();
    };

    Scene_Battle.prototype.commandSkill = function() {
        //スキルを入力するとクラスに応じたスキルが自動的に発動します。
        //var skill = $dataSkills[47]
        //var action = BattleManager.inputtingAction();
        //action.setSkill(skill.id);
        //BattleManager.actor().setLastBattleSkill(skill);
        //this.onSelectAction();
        AudioManager.playSe(
            {
                name:"Buzzer1",
                volume:100,
                pitch:100,
                pan:0
            }
        );
    };

    Scene_Battle.prototype.onEnemyCancel = function() {
        this._enemyWindow.hide();
        this._actorCommandWindow.activate();
    };

    //テクニカルヒットの判定を追加
    Yanfly.ATB.Scene_Battle_updateWindowPositions = Scene_Battle.prototype.updateWindowPositions;
    Scene_Battle.prototype.updateWindowPositions = function() {
        if (BattleManager.isATB() && !this._atbLockStatusWin) {
          this._atbLockStatusWin = eval(Yanfly.Param.ATBLockStatusWin);
        }
        if (BattleManager.isATB() && this._atbLockStatusWin) {
          this.updateWindowPositionsATB();
        } else {
          Yanfly.ATB.Scene_Battle_updateWindowPositions.call(this);
        }

        //テクニカルヒットの判定用のやつ
        $gameVariables.setValue(32, $gameVariables.value(32) - 1)
        if (Input.isTriggered('ok') || TouchInput.isTriggered()){
            $gameVariables.setValue(32, 20)
        }
        //回復薬の判定用
        if($gameSwitches.value(93)){
            $gameVariables.setValue(38, $gameVariables.value(38) - 1)
            $gameVariables.setValue(39, $gameVariables.value(39) - 1)
            if ($gameParty.numItems($dataItems[37]) >= 1){
                if (Input.isTriggered('pageup')){$gameVariables.setValue(38, 20)}
                if (Input.isTriggered('pagedown')){$gameVariables.setValue(39, 20)}
            }
            if ($gameVariables.value(38) >= 1){
                $gameScreen.startFlash([255,255,0,170], 60)
                AudioManager.playSe({"name":"回復薬","volume":100,"pitch":100,"pan":100})
                $gameParty.gainItem($dataItems[37], -1)
                $gameVariables.setValue(38, 0)
                $gameActors.actor(1).gainHp($gameActors.actor(1).param(0))
            }
            if ($gameVariables.value(39) >= 1){
                $gameScreen.startFlash([0,255,255,170], 60)
                AudioManager.playSe({"name":"回復薬","volume":100,"pitch":100,"pan":100})
                $gameParty.gainItem($dataItems[37], -1)
                $gameVariables.setValue(39, 0)
                $gameActors.actor(2).gainHp($gameActors.actor(2).param(0))
            }
        }


    };

})();
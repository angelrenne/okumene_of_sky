(function(){

	var QuickMode = false;

	var createUpper = Spriteset_Battle.prototype.createUpperLayer;
    Spriteset_Battle.prototype.createUpperLayer = function() {
        createUpper.apply(this, arguments);
        if($gameSwitches.value(93)){
        var hud     = new Sprite();
        var button1 = new Sprite_Button();
        var button2 = new Sprite_Button();
        var num     = new Sprite();
        //背景の設定
        hud.bitmap = ImageManager.loadSystem('b_hud_1');
        hud.x = 980;
        hud.y = 20;
        hud.visible = true;
        //ボタン1の設定
        button1.bitmap = ImageManager.loadSystem('battle_pot_icon');
        button1.x = 1000;
        button1.y = 85;
        button1.visible = true;
        //ボタン2の設定
        button2.bitmap = ImageManager.loadSystem('battle_pot_icon2');
        button2.x = 1000;
        button2.y = 190;
        button2.visible = true;
        //ボタン2の設定
        num.bitmap = ImageManager.loadSystem('battle_hud_num');
        num.x = 1038;
        num.y = 53;
        num.visible = true;
        num.setFrame($gameParty.numItems($dataItems[37]) * 18, 0, 18, 24);
        this.addChild(hud);
        this.addChild(button1);
        this.addChild(button2);
        this.addChild(num);

        var animCount = 0;

        button1.updateFrame = function() {
            num.setFrame($gameParty.numItems($dataItems[37]) * 18, 0, 18, 24);
            if ($gameParty.numItems($dataItems[37]) == 0){
                button1.setFrame(0, 96, 111, 96);
            }else{
                button1.setFrame(0, 0, 111, 96);
            }
        }
        button2.updateFrame = function() {
            if ($gameParty.numItems($dataItems[37]) == 0){
                button2.setFrame(0, 96, 111, 96);
            }else{
                button2.setFrame(0, 0, 111, 96);
            }
        }
        if ($gameParty.numItems($dataItems[37]) >= 1){
            button1.setClickHandler(function () {
                //ボタンが押された時の処理！
                $gameVariables.setValue(38, 20)

            });
            button2.setClickHandler(function () {
                //ボタンが押された時の処理！
                $gameVariables.setValue(39, 20)
            });
        }
        return;
        var launchBattle = Scene_Map.prototype.launchBattle;
        Scene_Map.prototype.launchBattle = function() {
            launchBattle.apply(this, arguments);
            stopQuick();
        }
        }
    }
})();
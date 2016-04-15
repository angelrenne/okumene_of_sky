//=============================================================================
// K_OriginalMenuScreen.js
//=============================================================================

/*:
 * @plugindesc メニュー画面をオリジナルのものに変更します。
 * @author Kota (http://www.nine-yusha.com/)
 *
 * @param Add_LocationInfo
 * @desc 現在のマップ名・プレイ時間の表示設定です。
 * 0: 表示しない、1: 表示する
 * @default 1
 *
 * @param Information_item
 * @desc 「アイテム」コマンドの説明文です。
 * @default 入手したアイテムを使用します。
 *
 * @param Information_skill
 * @desc 「スキル」コマンドの説明文です。
 * @default 習得したスキルを使用します。
 *
 * @param Information_equip
 * @desc 「装備」コマンドの説明文です。
 * @default 装備を変更します。
 *
 * @param Information_status
 * @desc 「ステータス」コマンドの説明文です。
 * @default ステータスを確認します。
 *
 * @param Information_formation
 * @desc 「並べ替え」コマンドの説明文です。
 * @default パーティの並び順を変更します。
 *
 * @param Information_options
 * @desc 「オプション」コマンドの説明文です。
 * @default オプション画面を開きます。
 *
 * @param Information_save
 * @desc 「セーブ」コマンドの説明文です。
 * @default これまでのデータをセーブします。
 *
 * @param Information_gameEnd
 * @desc 「ゲーム終了」コマンドの説明文です。
 * @default ゲームを終了します。
 *
 * @help このプラグインには、プラグインコマンドはありません。

 メニュー画面に、下記の項目を追加します。
 ・インフォメーションウィンドウ
 ・現在のマップ名
 ・現在のプレイ時間

 作者: Kota (http://www.nine-yusha.com/)
 作成日: 2015/11/20
*/

(function() {

	var parameters = PluginManager.parameters('K_OriginalMenuScreen');
	var Add_LocationInfo = Number(parameters['Add_LocationInfo'] || 1);
	var Information_Msg = {
		'item': String(parameters['Information_item'] || '入手したアイテムを使用します。'),
		'skill': String(parameters['Information_skill'] || '習得したスキルを使用します。'),
		'equip': String(parameters['Information_equip'] || '装備を変更します。'),
		'status': String(parameters['Information_status'] || 'ステータスを確認します。'),
		'formation': String(parameters['Information_formation'] || 'パーティの並び順を変更します。'),
		'options': String(parameters['Information_options'] || 'オプション画面を開きます。'),
		'save': String(parameters['Information_save'] || 'これまでのデータをセーブします。'),
		'gameEnd': String(parameters['Information_gameEnd'] || 'ゲームを終了します。')
	}
/*
    ALCIE.AltMenuScreenで一括管理
    
	var _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        _Scene_Menu_create.call(this);
        // インフォメーションウィンドウの追加
        this.createInformationWindow();
        // コマンドウィンドウとステータスウィンドウを下にずらす
        //this._commandWindow.y = this._informationWindow.height;
        //this._statusWindow.y = this._informationWindow.height;
        //this._statusWindow.height -= this._informationWindow.height;
    };
    */
    
    Scene_Menu.prototype.createInformationWindow = function() {
	    this._informationWindow = new Window_Information();
	    this.addWindow(this._informationWindow);
	};
    
    Scene_Menu.prototype.createInformationWindow2 = function() {
	    this._informationWindow2 = new Window_Information2();
	    this.addWindow(this._informationWindow2);
	};
    
    var _Scene_Menu_update = Scene_Menu.prototype.update;
    Scene_Menu.prototype.update = function() {
        _Scene_Menu_update.call(this);
        // インフォメーションウィンドウの更新
        this._informationWindow.setText(Information_Msg[this._commandWindow.currentSymbol()]);
        this._informationWindow2.setText(Information_Msg[this._commandWindow.currentSymbol()]);
    };
    
    //-----------------------------------------------------------------------------
	// Window_Information
	//

	function Window_Information() {
	    this.initialize.apply(this, arguments);
	}

	Window_Information.prototype = Object.create(Window_Base.prototype);
	Window_Information.prototype.constructor = Window_Information;

	Window_Information.prototype.initialize = function() {
	    var width = Graphics.boxWidth;
	    var height = (Add_LocationInfo == 1) ? this.fittingHeight(2) : this.fittingHeight(1);
	    //var height = this.fittingHeight(2);
	    Window_Base.prototype.initialize.call(this, 0, 0, width, height);
	    this._text = '';
	};

	Window_Information.prototype.setText = function(text) {
	    //if (this._text !== text) {
	        this._text = text;
	        this.refresh();
	    //}
	};

	Window_Information.prototype.clear = function() {
	    this.setText('');
	};

	Window_Information.prototype.refresh = function() {
	    this.contents.clear();
        this.drawTextEx(this._text, this.textPadding(), 0);
	};
    
    //-----------------------------------------------------------------------------
	// Window_Information2
	//

	function Window_Information2() {
	    this.initialize.apply(this, arguments);
	}

	Window_Information2.prototype = Object.create(Window_Base.prototype);
	Window_Information2.prototype.constructor = Window_Information;

	Window_Information2.prototype.initialize = function() {
	    var width = Graphics.boxWidth;
	    var height = (Add_LocationInfo == 1) ? this.fittingHeight(2) : this.fittingHeight(1);
	    //var height = this.fittingHeight(2);
	    Window_Base.prototype.initialize.call(this, 0, Graphics.boxHeight - height, width, height);
	    this._text = '';
	};

	Window_Information2.prototype.setText = function(text) {
	    //if (this._text !== text) {
	        this._text = text;
	        this.refresh();
	    //}
	};

	Window_Information2.prototype.clear = function() {
	    this.setText('');
	};

	Window_Information2.prototype.refresh = function() {
	    this.contents.clear();
        // マップ名
        this.changeTextColor(this.systemColor());
        this.drawText('場所', this.textPadding(), 0, 56, 'left');
        this.resetTextColor();
        this.drawText($gameMap.displayName(), 62 + this.standardPadding(), 0, 280, 'left');
        // プレイ時間
        this.changeTextColor(this.systemColor());
        this.drawText('プレイ時間', 360 + this.standardPadding(), 0, 140, 'left');
        this.resetTextColor();
        this.drawText($gameSystem.playtimeText(), 518 + this.standardPadding(), 0, 112, 'left');
        //所持金
        this.changeTextColor(this.systemColor());
        this.drawText('所持金', 720 + this.standardPadding(), 0, 140, 'left');
        this.drawText(TextManager.currencyUnit, 960 + this.standardPadding(), 0, 140, 'left');
        this.resetTextColor();
        this.drawText($gameParty.gold(), 840 + this.standardPadding(), 0, 112, 'right');
	};

})();

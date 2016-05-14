//=============================================================================
// GraniCore.js
//=============================================================================

/*:
 * @plugindesc グラニーコアJS
 * 吹き出しウィンドウなど
 * @author 豆乳
 * @version 1.2
 * 
 * @help
 * プラグインコマンド:
 *   吹き出し name target
 *       # 次に続く「文章の表示」コマンドで表示されるウィンドウを吹き出し表示にする。
 *       #  name : 名前欄に表示する文字。文章に使える制御文字は大体使える。\P[1]とか。
 *       #  target : 吹き出しの発言元イベント名。「プレイヤー」と指定した場合は、プレイヤー位置となる。
 * 
 *   イベント実行 eventName
 *       # 指定のイベントを強制的に起動する
 *       #  eventName : 実行するイベント名
 * 
 * 更新履歴:
 *  ver 1.2
 *      デスポン変更分をマージ。
 *      顔グラ表示位置などをプラグインパラメータで指定できるように変更。
 *      吹き出しモード終了時にアイコンが表示されない不具合等を修正。
 *      表示位置が極端な場合に、吹き出しが画面外にはみ出たり、テールが吹き出しからはみ出てしまう問題を修正。
 *      他イベントを強制起動するプラグインコマンドを追加。
 *  ver 1.1.5(デスポン変更分)
 *      顔グラのサイズを自由に変更できるように変更
 *　　　 それに合わせてイベントコマンドで表示する顔グラとゲームで表示する顔グラを別データにする。
 *  ver 1.1
 *      ターゲットイベントの位置が変化した際に追従していなかった不具合を修正。
 *  ver 1.0
 *      本文に合わせて大きさを自動調整するように変更。
 *  ver 0.3
 *      名前欄のカラーが正常に機能しないことがあるバグを修正。
 *      制御文字で本文の再生を一時停止した際に、SEが再生され続けてしまうバグを修正。
 *  ver 0.2
 *      名前欄にカラーの制御文字などを使えるようにした。
 *      文字表示時にSEを再生するようにした。
 *      ターゲット名を指定しなかった場合に、nameに指定した値がtargetに使用されるように変更。
 *  ver 0.1
 *      吹き出し機能をそれなりに実装
 *
 *
 * @param fuki_faceWidth
 * @desc
 *     フキダシで使用する顔グラ横幅
 *     規定値: 144
 * @default 144
 *  
 * @param fuki_faceHeight
 * @desc
 *     フキダシで使用する顔グラ縦幅
 *     規定値: 144
 * @default 144
 *
 * @param fuki_faceOffsetPosX
 * @desc
 *     フキダシで表示する顔グラの表示位置のオフセット値 X座標
 *     規定値: 0
 * @default 0
 *
 * @param fuki_faceOffsetPosY
 * @desc
 *     フキダシで表示する顔グラの表示位置のオフセット値 Y座標
 *     規定値: 0
 * @default 0
 *
 * @param fuki_seCharFileName
 * @desc
 *     フキダシで文字送り時に再生するSEのファイル名
 *     規定値: 'FukidashiChar'
 * @default 'FukidashiChar'
 *
 * @param fuki_seCharVolume
 * @desc
 *     フキダシで文字送り時に再生するSEのボリューム
 *     規定値: 90
 * @default 90
 */

(function() {
	
	//-----------------------------------------------------------------------------
	
	var FUKIDASI_PADDING = 5;
	var FUKIDASI_NAME_DEFAULT = '';
	var FUKIDASI_TARGET_DEFAULT = 'プレイヤー';

	window.$fukidashiMode = false;
	window.$fukidashiName = FUKIDASI_NAME_DEFAULT;
	window.$fukidashiTarget = FUKIDASI_TARGET_DEFAULT;



	//-----------------------------------------------------------------------------
	// ImageManager
	//
	// 画像管理クラス
	
	/** 吹き出し用の顔アイコンを取得する */
	ImageManager.loadMFace = function(filename) {
		return this.loadBitmap('img/messageface/', filename, 0, true);
	};	
	
	
	//-----------------------------------------------------------------------------
	// Window_Message
	//
	// メッセージウィンドウクラス

	/** [メソッド差し替え] コンストラクタ */
	var _Window_Message_initialize = Window_Message.prototype.initialize;
	Window_Message.prototype.initialize = function() {
		_Window_Message_initialize.call(this);
		
		var pluginParam = PluginManager.parameters('GraniCore');
		this._ppFukiFaceWidth = parseInt(pluginParam['fuki_faceWidth'] || 144);
		this._ppFukiFaceHeight = parseInt(pluginParam['fuki_faceHeight'] || 144);
		this._ppFukiFaceOffsetPosX = parseInt(pluginParam['fuki_faceOffsetPosX'] || 0);
		this._ppFukiFaceOffsetPosY = parseInt(pluginParam['fuki_faceOffsetPosY'] || 0);
		this._ppFukiSeCharFileName = parseInt(pluginParam['fuki_seCharFileName'] || 'FukidashiChar');
		this._ppFukiSeCharVolume = parseInt(pluginParam['fuki_seCharVolume'] || 90);
		
		this._currentFukidashiMode = false;
		this.charFrameCount = 0;
		
		this._fukidashiWidth = 0;
		this._fukidashiLineNum = 0;
	
		this._fukidashiFaceIcon = new Sprite();
		this._fukidashiNameLabel = new Sprite();
		this._fukidashiTail = new Sprite();
		this.addChild(this._fukidashiFaceIcon);
		this.addChild(this._fukidashiNameLabel);
		this.addChild(this._fukidashiTail);
		
		this._fukidashiFaceIcon.bitmap = new Bitmap(
			this._ppFukiFaceWidth, this._ppFukiFaceHeight
		);
		this._fukidashiNameLabel.bitmap = new Bitmap(300, 60);
		this._fukidashiNameLabel.bitmap.fontFace = this.standardFontFace();
		this._fukidashiNameLabel.bitmap.fontSize = 20;
		this._fukidashiNameLabel.bitmap.textColor = '#FFFFFF';
		
		this._defaultWinSkin = this._windowskin;
		this._fukidashiWinSkin = ImageManager.loadSystem('FukidashiWindow');
	};
	
	/** [メソッド差し替え] 顔アイコン読み込み開始 */
	var _Window_Message_loadMessageFace = Window_Message.prototype.loadMessageFace;
	Window_Message.prototype.loadMessageFace = function() {
		if ( this._currentFukidashiMode ) {
			this._faceBitmap = ImageManager.loadMFace($gameMessage.faceName());
		} else {
		    this._faceBitmap = ImageManager.loadFace($gameMessage.faceName());
		}
	};

	/** [メソッド差し替え] Transform更新 */
	var _Window_Message_updateTransform = Window_Message.prototype.updateTransform;
	Window_Message.prototype.updateTransform = function() {
		if (this._currentFukidashiMode) {
			this._fukidashiFaceIcon.visible = this.isOpen();
			this._fukidashiNameLabel.visible = this.isOpen();
			this._fukidashiTail.visible = this.isOpen();
		} else {
			this._fukidashiFaceIcon.visible = false;
			this._fukidashiNameLabel.visible = false;
			this._fukidashiTail.visible = false;
		}
		_Window_Message_updateTransform.call(this);
	};

	/** [メソッド差し替え] 顔アイコン描画 */
	var _Window_Message_drawMessageFace = Window_Message.prototype.drawMessageFace;
	Window_Message.prototype.drawMessageFace = function() {
		if (this._currentFukidashiMode) {
		
			var faceName = $gameMessage.faceName();
			var faceIndex = $gameMessage.faceIndex();
			
			var bitmap = ImageManager.loadMFace(faceName);
			var w = this._ppFukiFaceWidth;
			var h = this._ppFukiFaceHeight
			var sx = faceIndex % 4 * w;
			var sy = Math.floor(faceIndex / 4) * h;
//console.log(this._fukidashiFaceIcon);
//console.log(this._fukidashiFaceIcon.bitmap);
			this._fukidashiFaceIcon.bitmap.blt(bitmap, sx, sy, w, h, 0, 0);
			
		} else {
			_Window_Message_drawMessageFace.call(this);
		}
	};	

	/** [メソッド差し替え] テキスト書き出し開始位置 */
	var _Window_Message_newLineX = Window_Message.prototype.newLineX;
	Window_Message.prototype.newLineX = function() {
		if (this._currentFukidashiMode) {
			return $gameMessage.faceName() === '' ? 10 : 108;
		} else {
			return _Window_Message_newLineX.call(this);
		}
	};
	
	/** [メソッド差し替え] 全スプライト更新 */
	var _Window_Message__refreshAllParts = Window_Message.prototype._refreshAllParts;
	Window_Message.prototype._refreshAllParts = function() {
		_Window_Message__refreshAllParts.call(this);
		
		// オリジナルではここで何もしておらず、スキンが変更された場合にフォント色が更新されていなかった
		if ( this.contents )
			this.resetFontSettings();
		
		if (this._currentFukidashiMode) {
			
			// ポーズカーソル位置を変更。親の_refreshAllPartsで中央に設定されてしまうので、ここで変更
			this._windowPauseSignSprite.move(
				this._width - this._windowPauseSignSprite.width,
				this._height
			);
		}
	};

	/** [メソッド差し替え] メッセージ開始 */
	var _Window_Message_startMessage = Window_Message.prototype.startMessage;
	Window_Message.prototype.startMessage = function() {
		
		// 吹き出しモード切替時の初期化と、吹き出しモードフラグの更新を行う。
		if (this.isClosed() && this._currentFukidashiMode != window.$fukidashiMode) {
			this._currentFukidashiMode = window.$fukidashiMode;
			
			if (this._currentFukidashiMode) {
				this._windowskin = this._fukidashiWinSkin;
				this._padding = FUKIDASI_PADDING;
				this.backOpacity = 255;
			} else {
				this._windowskin = this._defaultWinSkin;
				this._padding = this.standardPadding();
				this.backOpacity = this.standardBackOpacity();
			}
			this._refreshAllParts();
		}
		window.$fukidashiMode = false;
		
		_Window_Message_startMessage.call(this);
	}
		
	/** [メソッド差し替え] ウィンドウオープン */
	var _Window_Message_open = Window_Message.prototype.open;
	Window_Message.prototype.open = function() {
		
		if (this._currentFukidashiMode) {
			
			// 吹き出しテール読み込み
			this._fukidashiTail.bitmap = this._windowskin;
			this._fukidashiTail.anchor.x = 0.5;
			this._fukidashiTail.anchor.y = 0;
			this._fukidashiTail.setFrame(137, 40, 17, 15);
			
			// 吹き出し顔アイコンをクリア
			this._fukidashiFaceIcon.bitmap.clear();
			
			// 名前更新
			{
				var lbl = this._fukidashiNameLabel;
				lbl.bitmap.clear();
				if (window.$fukidashiName != '') {
					lbl.bitmap.fontFace = this.standardFontFace();
					lbl.bitmap.fontSize = 20;
					lbl.bitmap.textColor = this.textColor(5);
					var textState = { index: 0, x: 0, y: 0, left: 0 };
					textState.text = this.convertEscapeCharacters(window.$fukidashiName);
					textState.height = this.calcTextHeight(textState, false);
					while (textState.index < textState.text.length) {
						
						var c = textState.text[textState.index];
						switch (c) {
						case '\n':	textState.index++;	break;
						case '\f':	textState.index++;	break;
						case '\x1b':
							c = this.obtainEscapeCode(textState);
							switch (c) {
							case 'C':
								lbl.bitmap.textColor =
									this.textColor(this.obtainEscapeParam(textState));
								break;
							case 'I':
								break;
							case '{':
								if (lbl.bitmap.fontSize <= 96)
									lbl.bitmap.fontSize += 12;
								break;
							case '}':
								if (lbl.bitmap.fontSize >= 24)
									lbl.bitmap.fontSize -= 12;
								break;
							}
							break;
						default:
							var w = lbl.bitmap.measureTextWidth(c);
							lbl.bitmap.drawText(
								c, textState.x, textState.y, w * 2, textState.height
							);
							textState.x += w;
							textState.index++;
							break;
						}						
					}
				}
			}
		}
		
		_Window_Message_open.call(this);
	};
	
	/** [メソッド差し替え] 通常更新処理 */
	var _Window_Message_update = Window_Message.prototype.update;
	Window_Message.prototype.update = function() {
		
		// 文字再生のSEの重複再生防止カウントを更新しておく
		++this.charFrameCount;
		
		_Window_Message_update.call(this);
	}
	
	/** [メソッド差し替え] 閉じる */
	var _Window_Message_close = Window_Message.prototype.close;
	Window_Message.prototype.close = function() {
		
		this._toCloseF = true;
		
		_Window_Message_close.call(this);
	}
	
	/** [メソッド差し替え] メッセージ更新 */
	var _Window_Message_updateMessage = Window_Message.prototype.updateMessage;
	Window_Message.prototype.updateMessage = function() {
		var ret = _Window_Message_updateMessage.call(this);
		
		if ( ret ) {
			
			if (this._currentFukidashiMode) {
				// 文字再生のSE再生
				if ( 5 < this.charFrameCount ) {
					AudioManager.playSe(
						{
							name:'カーソル1',
							volume:this._ppFukiSeCharVolume,
							pitch:100,
							pan:0
						}
					);
					this.charFrameCount = 0;
				}
			}
			
		}
		return ret;
	}
	
	/** [メソッド差し替え] ウィンドウ位置更新 */
	var _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
	Window_Message.prototype.updatePlacement = function() {
		
		if (this._currentFukidashiMode)
			this.calcFukidashiWidthLineNum();
		
		this.width = this.windowWidth();
		this.height = this.windowHeight();

		_Window_Message_updatePlacement.call(this);

		if (this._currentFukidashiMode) {
			
			this._positionType = $gameMessage.positionType();
			
			// 指定アクタの位置を取得
			var ax = 0;
			var ay = 0;
			if ( window.$fukidashiTarget == 'プレイヤー' ) {
				ax = $gamePlayer._realX;
				ay = $gamePlayer._realY;
			} else {
				for (var i = 0; i < $dataMap.events.length; i++) {
					var src = $dataMap.events[i];
					if (src && src.name == window.$fukidashiTarget) {
						var e = $gameMap.event(src.id);
						ax = e.x;
						ay = e.y;
						break;
					}
				}
			}
			
			// 座標はウィンドウが画面からはみ出ないように補正する。
			// Y座標は指定の方向で作成。
			// Y座標がテール位置方向と逆方向にはみ出した場合は、テールを非表示にする
			var isUp = false;
			var pureX = 0;
			var showTail = true;
			{
				pureX = ( ax - $gameMap.displayX() + 0.5 ) * $gameMap.tileWidth() - this.width / 2;
				this.x = Math.max( 45, Math.min( pureX, Graphics.boxWidth - this.width - 25 ) );
				this.y = ( ay - $gameMap.displayY() + 0.4 ) * $gameMap.tileHeight();
				
				isUp = this._positionType == 0;
				if (this._positionType == 1) {
					isUp = Graphics.boxHeight / 2 - 10 < this.y;
				}
				this.y += isUp ? ( -this.height - 45 ) : 45
				
				var minY = 30;
				var maxY = Graphics.boxHeight - this.height - 30;
				if ( this.y < minY ) {
					if ( isUp && 20 < minY - this.y ) showTail = false;
					this.y = minY;
				} else if ( maxY < this.y ) {
					if ( !isUp && 20 < this.y - maxY ) showTail = false;
					this.y = maxY;
				}
			}
			
			// 顔アイコン位置を設定
			this._fukidashiFaceIcon.move(
				-40 + this._ppFukiFaceOffsetPosX,
				( this.height - this._ppFukiFaceHeight ) / 2 + this._ppFukiFaceOffsetPosY
			);
			
			// 名前ラベル位置を設定
			this._fukidashiNameLabel.move(
				this.newLineX(),
				isUp ? -this._fukidashiNameLabel.bitmap.fontSize - 4 : this.height - 10
			);
			
			// 吹き出しテールが左右端からはみ出そうな場合は非表示にする
			if ( pureX - this.x < -this._width / 2 + 20 || this._width / 2 - 20 < pureX - this.x ) {
				showTail = false;
			}
			
			// 吹き出しテール位置を設定
			if ( showTail ) {
				this._fukidashiTail.move(
					pureX - this.x + this._width / 2 + ( isUp ? 15 : -15 ),
					isUp ? this._height - 2 : 2
				);
			} else {
				this._fukidashiTail.move( -10000, -10000 );
			}
			this._fukidashiTail.rotation = isUp ? 0 : Math.PI;

		} else {
			this.x = 0;
		}
	};
	
	/** [メソッド差し替え] ウィンドウ幅取得 */
	var _Window_Message_windowWidth = Window_Message.prototype.windowWidth;
	Window_Message.prototype.windowWidth = function() {
		if (this._currentFukidashiMode) {
			return this._fukidashiWidth;
		} else {
			return _Window_Message_windowWidth.call(this);
		}
	};
		
	/** [メソッド差し替え] ウィンドウ高さ取得 */
	var _Window_Message_windowHeight = Window_Message.prototype.windowHeight;
	Window_Message.prototype.windowHeight = function() {
		var p = 0;
		if (this._currentFukidashiMode) {
			p = FUKIDASI_PADDING;
		} else {
			p = this.standardPadding();
		}
		return this.numVisibleRows() * this.lineHeight() + p * 2;
	};
	
	/** [メソッド差し替え] 表示可能行数 */
	var _Window_Message_numVisibleRows = Window_Message.prototype.numVisibleRows;
	Window_Message.prototype.numVisibleRows = function() {
		if (this._currentFukidashiMode) {
    		return this._fukidashiLineNum;
		} else {
			return _Window_Message_numVisibleRows.call(this);
		}
	};
	
	
	/** 現在設定されたテキストから、吹き出し用の横幅と行数を計算する */
	Window_Message.prototype.calcFukidashiWidthLineNum = function() {
		
		this._fukidashiLineNum = 0;
		this._fukidashiWidth = 0;
		
		// 全ての文章について繰り返し内包サイズを計算し、最大の内包サイズで決定する。
		for ( var mesIndex = 0; mesIndex < $gameMessage.allallText.length; ++mesIndex ) {
			var textState = { index: 0, x: 0, y: 0, left: 0 };
			
			textState.text = this.convertEscapeCharacters(
				$gameMessage.allallText[mesIndex].reduce(function(previousValue, currentValue) {
					return previousValue + '\n' + currentValue;
				})
			);
	//		textState.height = this.calcTextHeight(textState, false);
			
			this._fukidashiLineNum = Math.max(
				this._fukidashiLineNum,
				textState.text.slice(textState.index).split('\n').length
			);
			
			var maxW = 0;
			var w = 0;
			this.resetFontSettings();
			while (textState.index < textState.text.length) {
				var c = textState.text[textState.index];
				
				switch (c) {
				case '\n':
					maxW = Math.max( w, maxW );
					w = 0;
					++textState.index;
					continue;
				case '\f':
					maxW = Math.max( w, maxW );
					w = 0;
					++textState.index;
					continue;
				case '\x1b':
					c = this.obtainEscapeCode(textState);
					switch (c) {
					case 'C':
						this.obtainEscapeParam(textState);
						break;
					case 'I':
						w += Window_Base._iconWidth + 4;
						this.obtainEscapeParam(textState);
						break;
					case '{':
						this.makeFontBigger();
						break;
					case '}':
						this.makeFontSmaller();
						break;
					}
					break;
				default:
					w += this.textWidth(c);
					++textState.index;
					break;
				}
			}
			maxW = Math.max( w, maxW );
			
			this._fukidashiWidth = Math.max(
				this._fukidashiWidth,
				maxW + 22
			);
		}
		
		
		// 顔アイコンサイズ分幅をとる
		this._fukidashiWidth += this.newLineX();
	}
	
	
	
	//-----------------------------------------------------------------------------
	// Game_Interpreter
	//
	// インタープリタークラス

	// [メソッド差し替え] プラグインコマンド
	var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.call(this, command, args);
		switch (command) {
		case '吹き出し':
			window.$fukidashiMode = true;
/*		    var param = JSON.parse( this._params[0].substring('吹き出し'.length) );
			window.$fukidashiMode = true;
			window.$fukidashiName    = param.Name    ? param.Name    : FUKIDASI_NAME_DEFAULT;
			window.$fukidashiTarget  = param.Target  ? param.Target  : FUKIDASI_TARGET_DEFAULT;//*/
			window.$fukidashiName    = args[0] ? args[0] : FUKIDASI_NAME_DEFAULT;
			window.$fukidashiTarget  = args[1] ? args[1] :
				( window.$fukidashiName == FUKIDASI_NAME_DEFAULT ? FUKIDASI_TARGET_DEFAULT : window.$fukidashiName );
			//*/
			break;
		case 'イベント実行':
			for (var i = 0; i < $dataMap.events.length; i++) {
				var src = $dataMap.events[i];
				if (src && src.name == args[0]) {
					var e = $gameMap.event(src.id);
					e.start();
					break;
				}
			}		
			break;
		}
	};
	
	/** [メソッド差し替え] イベントインタプリタ内の、メッセージイベントが来た時の処理 */
	var _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
	Game_Interpreter.prototype.command101 = function() {
		
		// 連続する「文章の表示イベント」の最初のイベントが来た場合に、
		// 後続するすべての関連イベントを精査して、すべての文章をキャッシュする。
		// 格納サイズ可能サイズについてはここでは判断できないので、ウィンドウ側で判断してもらう
		var isFirstMessage = this._index == 0 || this._list[this._index - 1].code != 401;
		if (!$gameMessage.isBusy() && isFirstMessage) {
			
			var allallText = [];
			
			var i = 0;
			var command = this._list[this._index + i];
			while (command && command.code == 101) {
				
				++i;
				command = this._list[this._index + i];
				var curText = [];
				
				while (command && command.code == 401) {
					curText.push(command.parameters[0]);
					++i;
					command = this._list[this._index + i];
				}
				
				allallText.push(curText);
				
				// アイテム選択などをまたぐ場合はとりあえず未対応
	/*			if ( command ) {
					switch (command.code) {
					case 102:  // Show Choices
					case 103:  // Input Number
					case 104:  // Select Item
						++i;
						command = this._list[this._index + i];
						break;
					}
				}//*/
			}
			
			// とりあえず適当な変数に格納。ウィンドウ側からはこれにアクセスしてね
			$gameMessage.allallText = allallText;
		}
			
	
		return _Game_Interpreter_command101.call(this);
	};

})();

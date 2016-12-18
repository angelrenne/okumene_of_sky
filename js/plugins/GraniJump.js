//=============================================================================
// GraniJump.js
//=============================================================================

var Imported = Imported || {};
Imported.Grani_JumpAction = true;

var Grani = Grani || {};
Grani.JumpAction = Grani.JumpAction || {};


/*:
 * @plugindesc グラニージャンプJS。
 * 崖や穴をジャンプして飛び越えるアクションを出来るようにする。
 * プラグインパラメータで指定した地形リージョンを、同じ高度間の間で飛び越えジャンプ、
 * 一つ違う高度の間で乗り上がり・下りジャンプを行えるようにする。
 * @author 豆乳
 * @version 1.0
 * 
 * 
 * @param RgnIdBegin
 * @desc
 *     ここで指定したリージョンから地形リージョンを開始する
 *     規定値: 150
 * @default 150
 * 
 * @param RgnIdLength
 * @desc
 *     地形リージョンの高度を何段階もつか
 *     規定値: 15
 * @default 15
 * 
 * @param SeName
 * @desc
 *     再生するSE名を指定
 *     規定値: Jump
 * @default Jump
 * 
 * @param SeVolume
 * @desc
 *     再生するSEボリュームを指定
 *     規定値: 100
 * @default 100
 * 
 * @param SePitch
 * @desc
 *     再生するSEのピッチを指定
 *     規定値: 100
 * @default 100
 */

(function() {
	
	if ( !Imported.Grani_CoreEngine )
		console.error( "GraniCoreが未インポート" );
	
	
	//-----------------------------------------------------------------------------
	// JumpActionManager
	//
	Grani.Core.JumpActionManager = function() {
		this.initialize.apply(this, arguments);
	}
	Grani.Core.JumpActionManager.prototype.initialize = function() {
		var pluginParam = PluginManager.parameters('GraniJump');
		this._tuchRgnId = parseInt(pluginParam['RgnIdBegin'] || 150);
		this._tuchRgnIdLength = parseInt(pluginParam['RgnIdLength'] || 15);
		this._seName = pluginParam['SeName'] || "Jump";
		this._seVolume = parseInt(pluginParam['SeVolume'] || 100);
		this._sePitch = parseInt(pluginParam['SePitch'] || 100);

		this._cmd = null;
		this._isWaitingCmnEv = false;
	}
	Grani.Core.JumpActionManager.prototype.checkEventTrigger = function(chara, x, y, direction) {
		var self = this;
		if (!$gameMap.isEventRunning()) {

			var id = $gameMap.regionId(x, y) - this._tuchRgnId; 
			if ( id < 0 || this._tuchRgnIdLength <= id ) return;

			// マップ端の場合は何もしない
			var dx, dy;
			switch (direction) {
			case 1 : dx=-1; dy= 1; break;
			case 2 : dx= 0; dy= 1; break;
			case 3 : dx= 1; dy= 1; break;
			case 4 : dx=-1; dy= 0; break;
			case 6 : dx= 1; dy= 0; break;
			case 7 : dx=-1; dy=-1; break;
			case 8 : dx= 0; dy=-1; break;
			default: dx= 1; dy=-1; break;
			}
			var x2 = $gameMap.roundX(x+dx);
			var y2 = $gameMap.roundY(y+dy);
			if(x2-x!=dx || y2-y!=dy) return;

			// 目の前がキャラクターなどでふさがれている場合は、ジャンプしない
			if (
//				$gamePlayer.isMapPassable(x, y, direction) &&
				$gamePlayer.isCollidedWithCharacters(x2, y2)
			) return;

			// ジャンプできる場合はコマンドを遅延実行予約
			var cmd;
			do {
				// 指定の位置に指定の段差があるかどうかの判定を行う処理
				var c = function(dx,dy,dId) {
					var id2 = $gameMap.regionId(x+dx, y+dy) - self._tuchRgnId;
					if ( 0<=id2 && id2==id+dId ) { cmd=[dx, dy]; return true; }
					return false;
				};
				// 現在の向きによって斜め移動の判定優先度を切り替えて行う処理
				var dg = function(hDx,hDy,hDId,vDx,vDy,vDId) {
					if (chara._direction==4 || chara._direction==6) {
						if (c(hDx,hDy,hDId)) return true;
						if (!c(vDx,vDy,vDId)) return false;
						chara.setDirection(vDy<0?8:2);
					} else {
						if (c(vDx,vDy,vDId)) return true;
						if (!c(hDx,hDy,hDId)) return false;
						chara.setDirection(hDx<0?4:6);
					}
					return true;
				}

				if (direction==1) {							// 左下
					if (dg(-1,1,-1, 0,2,-1)) break;				// 下り
					if (c(-1,2,-1)) break;
					if (dg(-1,-1,1, 0,1,1)) break;				// 上り
					if (c(-1,0,1)) break;
																// 水平高度
//					var id2 = $gameMap.regionId(x-1, y-1) - this._tuchRgnId;
//					if ( id<id2 ) { break; }
					if (c(-1,1,0)) break;
				} else if (direction==2) {					// 下
					if (c(dx,dy,0)) break;						// 目の前
					if (c(0,2,-1)) break;						// 下り
					if (c(0,1,1)) break;						// 上り
					if (c(0,2,0)) break;						// 水平高度
				} else if (direction==3) {					// 右下
					if (dg(1, 1,-1,0,2,-1)) break;				// 下り
					if (c(1,2,-1)) break;
					if (dg(1,-1, 1,0,1, 1)) break;				// 上り
					if (c(1,0,1)) break;
																// 水平高度
//					var id2 = $gameMap.regionId(x+1, y-1)-this._tuchRgnId;
//					if ( id<id2 ) { break; }
					if (c(1,1,0)) break;
				} else if (direction==4) {					// 左
					if (c(dx,dy,0)) break;						// 目の前
					if (c(-1,1,-1)) break;						// 下り
					if (c(-1,-1,1)) break;						// 上り
					if (c(-2,0,0)) break;						// 水平高度
				} else if (direction==6) {					// 右
					if (c(dx,dy,0)) break;						// 目の前
					if (c(1,1,-1)) break;						// 下り
					if (c(1,-1,1)) break;						// 上り
					if (c(2,0,0)) break;						// 水平高度
				} else if (direction==7) {					// 左上
					if (dg(-1, 1,-1,0,-1,-1)) break;			// 下り
					if (c(-1,0,-1)) break;
//					if (c(-1,-1,-1)) break;
					if (dg(-1,-1, 1,0,-2, 1)) break;			// 上り
					if (c(-1,-2,1)) break;
																// 水平高度
//					var id2 = $gameMap.regionId(x, y-2) - this._tuchRgnId;
//					if ( id<id2 ) { break; }
					if (c(-1,-1,0)) break;
				} else if (direction==8) {					// 上
					if (c(dx,dy,0)) break;						// 目の前
					if (c(0,-1,-1)) break;						// 下り
					if (c(0,-2,1)) break;						// 上り
					if (c(0,-2,0)) break;						// 水平高度
				} else {									// 右上
					if (dg(1, 1,-1,0,-1,-1)) break;				// 下り
					if (c(1,0,-1)) break;
//					if (c(1,-1,-1)) break;
					if (dg(1,-1, 1,0,-2, 1)) break;				// 上り
					if (c(1,-2,1)) break;
																// 水平高度
//					var id2 = $gameMap.regionId(x, y-2) - this._tuchRgnId;
//					if ( id<id2 ) { break; }
					if (c(1,-1,0)) break;
				}

				return;
			} while (0);

			// ジャンプ先がキャラクターなどでふさがれている場合も、ジャンプしない
			if (cmd) {
				if ($gamePlayer.isCollidedWithCharacters(x+cmd[0], y+cmd[1])) return;
			}

			this._cmd = cmd;
		}
	}
	// 現在動作待ちか否か
	Grani.Core.JumpActionManager.prototype.isWaitingCmnEv = function() {
		return this._isWaitingCmnEv;
	}
	// キューに積まれたコモンイベントをクリアする
	Grani.Core.JumpActionManager.prototype.terminate = function() {
		this._cmd = null;
		this._isWaitingCmnEv = false;
	}
	// キューに積まれたコモンイベントを実行する。実行するコモンイベントがある場合はtrueを返す
	Grani.Core.JumpActionManager.prototype.execute = function(interpreter) {
		if (this._cmd==null) return false;

		// ジャンプアクションを実行
		AudioManager.playSe({
			name:this._seName,
			volume:this._seVolume,
			pitch:this._sePitch,
			pan:0
		});
		interpreter.character(-1).forceMoveRoute({
			list:[
				{code:35},
				{code:14,parameters:this._cmd},
				{code:36},
				{code:0}
			],
			repeat:false,
			skippable:true,
			wait:true
		});
		
		this._cmd = null;
		this._isWaitingCmnEv = true;
		return true;
	}

	var jam = new Grani.Core.JumpActionManager();
	

	//-----------------------------------------------------------------------------
	// Game_Interpreter
	//
	// インタープリタークラス

	// [メソッド差し替え] 更新処理
	var _Game_Interpreter_update = Game_Interpreter.prototype.update;
	Game_Interpreter.prototype.update = function() {
		// ジャンプアクションの更新処理を行う
		while (true) {
			if (!jam.isWaitingCmnEv()) {
				if (!jam.execute(this)) break;
				return;
			}

			if (this.updateChild() || this.updateWait()) {
				return;
			}

			jam.terminate();
		}

		_Game_Interpreter_update.call(this);
	};
	

	//-----------------------------------------------------------------------------
	// Game_Player
	//

	// [メソッド差し替え] 向いている方向のイベント実行
	var _Game_Player_checkEventTriggerTouchFront = Game_Player.prototype.checkEventTriggerTouchFront;
	Game_Player.prototype.checkEventTriggerTouchFront = function(d) {
		jam.checkEventTrigger(this, this.x, this.y, d);

		_Game_Player_checkEventTriggerTouchFront.call(this, d);
	};

	// [メソッド差し替え] 斜め移動
	var _Game_CharacterBase_moveDiagonally = Game_CharacterBase.prototype.moveDiagonally;
	Game_CharacterBase.prototype.moveDiagonally = function(horz, vert) {
		_Game_CharacterBase_moveDiagonally.call(this, horz, vert);
		
    	if (!this.isMovementSucceeded()) {
			jam.checkEventTrigger(this, this.x, this.y, vert+(horz==4?-1:1));
		}
	};

	
	
})();

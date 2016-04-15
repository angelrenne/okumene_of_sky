//=============================================================================
// TMVplugin - 詳細説明ウィンドウ
// 作者: tomoaky (http://hikimoki.sakura.ne.jp/)
// Version: 1.1
// 最終更新日: 2016/02/27
//=============================================================================

/*:
 * @plugindesc アイテムやスキルの詳細情報を表示する機能を追加します。
 *
 * @author tomoaky (http://hikimoki.sakura.ne.jp/)
 *
 * @param descriptionKeyCode
 * @desc 説明ボタンとして使うキー
 * 初期値: 65
 * @default 65
 *
 * @param leftPaneWidth
 * @desc 左側のパラメータの幅
 * 初期値: 300
 * @default 300
 *
 * @param rightPaneWidth
 * @desc 右側のパラメータの幅
 * 初期値: 400
 * @default 400
 *
 * @param horzLineHeight
 * @desc 横線の余白も含めた高さ
 * 初期値: 28
 * @default 28
 *
 * @param secretItemA
 * @desc 隠しアイテムＡのタイプ名
 * 初期値: 隠しアイテムＡ
 * @default 隠しアイテムＡ
 *
 * @param secretItemB
 * @desc 隠しアイテムＢのタイプ名
 * 初期値: 隠しアイテムＢ
 * @default 隠しアイテムＢ
 *
 * @param consumableText
 * @desc 消耗の項目名
 * 初期値: 消耗
 * @default 消耗
 *
 * @param occasionText
 * @desc 使用可能時の項目名
 * 初期値: 制限
 * @default 制限
 *
 * @param scopeText
 * @desc 範囲の項目名
 * 初期値: 範囲
 * @default 範囲
 *
 * @param speedText
 * @desc 速度補正の項目名
 * 初期値: 速度補正
 * @default 速度補正
 *
 * @param successRateText
 * @desc 成功率の項目名
 * 初期値: 成功率
 * @default 成功率
 *
 * @param repeatsText
 * @desc 連続回数の項目名
 * 初期値: 連続回数
 * @default 連続回数
 *
 * @param tpGainText
 * @desc 得ＴＰの項目名
 * 初期値: 獲得ＴＰ
 * @default 獲得ＴＰ
 *
 * @param hitTypeText
 * @desc 命中タイプの項目名
 * 初期値: 命中判定
 * @default 命中判定
 *
 * @param priceText
 * @desc 価格の項目名
 * 初期値: 売却額
 * @default 売却額
 *
 * @param priceRate
 * @desc 価格の表示倍率
 * 初期値: 0.5
 * @default 0.5
 *
 * @param mpCostText
 * @desc 消費ＭＰの項目名
 * 初期値: 消費ＭＰ
 * @default 消費ＭＰ
 *
 * @param tpCostText
 * @desc 消費ＴＰの項目名
 * 初期値: 消費ＴＰ
 * @default 消費ＴＰ
 *
 * @param requiredWtypeText
 * @desc 必要武器の項目名
 * 初期値: 必要武器
 * @default 必要武器
 *
 * @param effectText
 * @desc 使用効果の項目名
 * 初期値: 効果
 * @default 効果
 *
 * @param traitText
 * @desc 特徴の項目名
 * 初期値: 特徴
 * @default 特徴
 *
 * @param effectTextRecoverHp
 * @desc ＨＰ回復の書式
 * 初期値: ＨＰが%1回復
 * @default ＨＰが%1回復
 *
 * @param effectTextRecoverMp
 * @desc ＭＰ回復の書式
 * 初期値: ＭＰが%1回復
 * @default ＭＰが%1回復
 *
 * @param effectTextGainTp
 * @desc ＴＰ増加の書式
 * 初期値: ＴＰが%1増加
 * @default ＴＰが%1増加
 *
 * @param effectTextAddState
 * @desc ステート付加の書式
 * 初期値: %2%の確率で%1を付加
 * @default %2%の確率で%1を付加
 *
 * @param effectTextRemoveState
 * @desc ステート解除の書式
 * 初期値: %2%の確率で%1を解除
 * @default %2%の確率で%1を解除
 *
 * @param effectTextAddBuff
 * @desc 強化の書式
 * 初期値: %2ターンの間だけ%1アップ
 * @default %2ターンの間だけ%1アップ
 *
 * @param effectTextAddDebuff
 * @desc 弱体の書式
 * 初期値: %2ターンの間だけ%1ダウン
 * @default %2ターンの間だけ%1ダウン
 *
 * @param effectTextRemoveBuff
 * @desc 強化の解除の書式
 * 初期値: %1アップの効果を解除
 * @default %1アップの効果を解除
 *
 * @param effectTextRemoveDebuff
 * @desc 弱体の解除の書式
 * 初期値: %1ダウンの効果を解除
 * @default %1ダウンの効果を解除
 *
 * @param effectTextSpecial
 * @desc 特殊効果の書式
 * 初期値: 戦闘から離脱する
 * @default 戦闘から離脱する
 *
 * @param effectTextGrow
 * @desc 成長の書式
 * 初期値: %1が永続的に%2上がる
 * @default %1が永続的に%2上がる
 *
 * @param effectTextLearnSkill
 * @desc スキル習得の書式
 * 初期値: %1を習得する
 * @default %1を習得する
 *
 * @param damageTextDamageHp
 * @desc ダメージタイプ『ＨＰダメージ』の書式
 * 初期値: ＨＰに%1ダメージを与える
 * @default ＨＰに%1ダメージを与える
 *
 * @param damageTextDamageMp
 * @desc ダメージタイプ『ＭＰダメージ』の書式
 * 初期値: ＭＰに%1ダメージを与える
 * @default ＭＰに%1ダメージを与える
 *
 * @param damageTextRecoverHp
 * @desc ダメージタイプ『ＨＰ回復』の書式
 * 初期値: ＨＰを回復する
 * @default ＨＰを回復する
 *
 * @param damageTextRecoverMp
 * @desc ダメージタイプ『ＭＰ回復』の書式
 * 初期値: ＭＰを回復する
 * @default ＭＰを回復する
 *
 * @param damageTextDrainHp
 * @desc ダメージタイプ『ＨＰ吸収』の書式
 * 初期値: 与えたダメージをＨＰとして吸収する
 * @default 与えたダメージをＨＰとして吸収する
 *
 * @param damageTextDrainMp
 * @desc ダメージタイプ『ＭＰ吸収』の書式
 * 初期値: 与えたダメージをＭＰとして吸収する
 * @default 与えたダメージをＭＰとして吸収する
 *
 * @param traitTextElementRate
 * @desc 属性有効度の書式
 * 初期値: %1耐性%2%
 * @default %1耐性%2%
 *
 * @param traitTextDebuffRate
 * @desc 弱体有効度の書式
 * 初期値: %1ダウン耐性%2%
 * @default %1ダウン耐性%2%
 *
 * @param traitTextStateRate
 * @desc ステート有効度の書式
 * 初期値: %1耐性%2%
 * @default %1耐性%2%
 *
 * @param traitTextStateResist
 * @desc ステート無効化の書式
 * 初期値: %1無効
 * @default %1無効
 *
 * @param traitTextParam
 * @desc 通常能力値の書式
 * 初期値: %1%2%
 * @default %1%2%
 *
 * @param traitTextXparam
 * @desc 追加能力値の書式
 * 初期値: %1%2
 * @default %1%2
 *
 * @param traitTextSparam
 * @desc 特殊能力値の書式
 * 初期値: %1%2%
 * @default %1%2%
 *
 * @param traitTextAttackElement
 * @desc 攻撃時属性の書式
 * 初期値: 攻撃に%1付加
 * @default 攻撃に%1付加
 *
 * @param traitTextAttackState
 * @desc 攻撃時ステートの書式
 * 初期値: 攻撃時に%2%の確率で%1を付加
 * @default 攻撃時に%2%の確率で%1を付加
 *
 * @param traitTextAttackSpeed
 * @desc 攻撃速度補正の書式
 * 初期値: 攻撃速度%1
 * @default 攻撃速度%1
 *
 * @param traitTextAttackTimes
 * @desc 攻撃追加回数の書式
 * 初期値: 攻撃回数%1
 * @default 攻撃回数%1
 *
 * @param traitTextStypeAdd
 * @desc スキルタイプ追加の書式
 * 初期値: %1使用可能
 * @default %1使用可能
 *
 * @param traitTextStypeSeal
 * @desc スキルタイプ封印の書式
 * 初期値: %1使用不可
 * @default %1使用不可
 *
 * @param traitTextSkillAdd
 * @desc スキル追加の書式
 * 初期値: %1使用可能
 * @default %1使用可能
 *
 * @param traitTextSkillSeal
 * @desc スキル封印の書式
 * 初期値: %1使用不可
 * @default %1使用不可
 *
 * @param traitTextEquipWtype
 * @desc 武器タイプ装備の書式
 * 初期値: %1装備可能
 * @default %1装備可能
 *
 * @param traitTextEquipAtype
 * @desc 防具タイプ装備の書式
 * 初期値: %1装備可能
 * @default %1装備可能
 *
 * @param traitTextEquipLock
 * @desc 装備固定の書式
 * 初期値: 
 * @default 
 *
 * @param traitTextEquipSeal
 * @desc 装備封印の書式
 * 初期値: %1装備不可
 * @default %1装備不可
 *
 * @param traitTextActionPlus
 * @desc 行動回数追加の書式
 * 初期値: %1%の確率で連続行動
 * @default %1%の確率で連続行動
 *
 * @param xparamText
 * @desc 追加能力値の項目名（カンマ区切りで１０項目）
 * 初期値: 命中,回避,会心,会心回避,魔法回避,魔法反射,反撃,…
 * @default 命中,回避,会心,会心回避,魔法回避,魔法反射,反撃,ＨＰ再生,ＭＰ再生,ＴＰ再生
 *
 * @param sparamText
 * @desc 特殊能力値の項目名（カンマ区切りで１０項目）
 * 初期値: 狙われ率,防御効果,回復効果,薬の知識,ＭＰ消費,…
 * @default 狙われ率,防御効果,回復効果,薬の知識,ＭＰ消費,ＴＰチャージ,物理ダメージ,魔法ダメージ,床ダメージ,経験値獲得
 *
 * @param consumableValue
 * @desc 消費の値
 * 初期値: する,しない
 * @default する,しない
 *
 * @param occasionValue
 * @desc 使用可能時の値
 * 初期値: なし,バトルのみ,メニューのみ,使用不可
 * @default なし,バトルのみ,メニューのみ,使用不可
 *
 * @param scopeValue
 * @desc 範囲の値（カンマ区切りで１２項目）
 * 初期値: なし,敵単体,敵全体,敵１体,敵２体,敵３体,敵４対,味方単体,…
 * @default なし,敵単体,敵全体,敵１体,敵２体,敵３体,敵４対,味方単体,味方全体,味方単体,味方全体,使用者
 *
 * @param hitTypeValue
 * @desc 命中タイプの値
 * 初期値: 必中,物理,魔法
 * @default 必中,物理,魔法
 *
 * @param slotTypeValue
 * @desc 特殊能力値の値
 * 初期値: 二刀流使用不可,二刀流使用可能
 * @default 二刀流使用不可,二刀流使用可能
 *
 * @param specialFlagValue
 * @desc 特殊フラグの値
 * 初期値: 自動戦闘,防御,身代わり,ＴＰ持ち越し
 * @default 自動戦闘,防御,身代わり,ＴＰ持ち越し
 *
 * @param partyAbilityValue
 * @desc パーティ能力の値（カンマ区切りで６項目）
 * 初期値: エンカウント半減,エンカウント無効,不意打ち無効,…
 * @default エンカウント半減,エンカウント無効,不意打ち無効,先制攻撃率アップ,獲得金額２倍,アイテム入手率２倍
 *
 * @param elementFooter
 * @desc 属性の接尾語
 * 初期値: 属性
 * @default 属性
 *
 * @param costExTextHp
 * @desc 消費ＨＰの書式（ TMSkillCostEx.js が必要）
 * 初期値: ＨＰを%1消費する
 * @default ＨＰを%1消費する
 *
 * @param costExTextItem
 * @desc 消費アイテムの書式（ TMSkillCostEx.js が必要）
 * 初期値: %1を%2個消費する
 * @default %1を%2個消費する
 *
 * @param costExTextExp
 * @desc 消費経験値の書式（ TMSkillCostEx.js が必要）
 * 初期値: 経験値を%1消費する
 * @default 経験値を%1消費する
 *
 * @param costExTextGold
 * @desc 消費金額の書式（ TMSkillCostEx.js が必要）
 * 初期値: お金を%1消費する
 * @default お金を%1消費する
 *
 * @param passiveAlwaysText
 * @desc 常時発動の書式（ TMPassiveSkill.js が必要）
 * 初期値: 常に効果が適用される
 * @default 常に効果が適用される
 *
 * @param passiveTpText
 * @desc ＴＰ○○以上で発動の書式（ TMPassiveSkill.js が必要）
 * 初期値: ＴＰ%1以上で効果が適用される
 * @default ＴＰ%1以上で効果が適用される
 *
 * @param passiveTpText2
 * @desc ＴＰ○○未満で発動の書式（ TMPassiveSkill.js が必要）
 * 初期値: ＴＰ%1未満で効果が適用される
 * @default ＴＰ%1未満で効果が適用される
 *
 * @param passiveStateText
 * @desc ○○状態で発動の書式（ TMPassiveSkill.js が必要）
 * 初期値: %1状態で効果が適用される
 * @default %1状態で効果が適用される
 *
 * @help
 * 使い方:
 *   このプラグインを導入すると、アイテムやスキルを選択中にＡキーを押すことで
 *   詳細説明ウィンドウが開くようになります。
 *   ヘルプウィンドウをクリック（タップ）しても開けます。
 *
 *   使用するキーは descriptionKeyCode の値を変更することで設定できます。
 *   65 ならＡ、66 ならＢ、とアルファベットが順に並んでいます、
 *   ＸやＺなど他の機能に割り当てられていないキーを設定してください。
 *
 * メモ欄タグ（スキル、アイテム、武器、防具）:
 *   <dType:素材>       # タイプ名（右上に表示）を素材にする
 *   <dText:テキスト>   # 右側パラメータの下部にテキストを追加（改行可能）
 *
 * プラグインコマンドはありません。
 * 
 */

var Imported = Imported || {};
Imported.TMDescriptionEx = true;

(function() {

  var parameters = PluginManager.parameters('TMDescriptionEx');
  Input.keyMapper[+parameters['descriptionKeyCode']] = 'description';
  var leftPaneWidth = +parameters['leftPaneWidth'];
  var rightPaneWidth = +parameters['rightPaneWidth'];
  var horzLineHeight = +parameters['horzLineHeight'];
  var secretItemA = parameters['secretItemA'];
  var secretItemB = parameters['secretItemB'];
  var consumableText = parameters['consumableText'];
  var occasionText = parameters['occasionText'];
  var scopeText = parameters['scopeText'];
  var speedText = parameters['speedText'];
  var successRateText = parameters['successRateText'];
  var repeatsText = parameters['repeatsText'];
  var tpGainText = parameters['tpGainText'];
  var hitTypeText = parameters['hitTypeText'];
  var priceText = parameters['priceText'];
  var priceRate = +parameters['priceRate'];
  var mpCostText = parameters['mpCostText'];
  var tpCostText = parameters['tpCostText'];
  var requiredWtypeText = parameters['requiredWtypeText'];
  var effectText = parameters['effectText'];
  var traitText = parameters['traitText'];
  var effectTextRecoverHp = parameters['effectTextRecoverHp'];
  var effectTextRecoverMp = parameters['effectTextRecoverMp'];
  var effectTextGainTp = parameters['effectTextGainTp'];
  var effectTextAddState = parameters['effectTextAddState'];
  var effectTextRemoveState = parameters['effectTextRemoveState'];
  var effectTextAddBuff = parameters['effectTextAddBuff'];
  var effectTextAddDebuff = parameters['effectTextAddDebuff'];
  var effectTextRemoveBuff = parameters['effectTextRemoveBuff'];
  var effectTextRemoveDebuff = parameters['effectTextRemoveDebuff'];
  var effectTextSpecial = parameters['effectTextSpecial'];
  var effectTextGrow = parameters['effectTextGrow'];
  var effectTextLearnSkill = parameters['effectTextLearnSkill'];
  var damageTextDamageHp  = parameters['damageTextDamageHp'];
  var damageTextDamageMp  = parameters['damageTextDamageMp'];
  var damageTextRecoverHp = parameters['damageTextRecoverHp'];
  var damageTextRecoverMp = parameters['damageTextRecoverMp'];
  var damageTextDrainHp   = parameters['damageTextDrainHp'];
  var damageTextDrainMp   = parameters['damageTextDrainMp'];
  var traitTextElementRate = parameters['traitTextElementRate'];
  var traitTextDebuffRate = parameters['traitTextDebuffRate'];
  var traitTextStateRate = parameters['traitTextStateRate'];
  var traitTextStateResist = parameters['traitTextStateResist'];
  var traitTextParam = parameters['traitTextParam'];
  var traitTextXparam = parameters['traitTextXparam'];
  var traitTextSparam = parameters['traitTextSparam'];
  var traitTextAttackElement = parameters['traitTextAttackElement'];
  var traitTextAttackState = parameters['traitTextAttackState'];
  var traitTextAttackSpeed = parameters['traitTextAttackSpeed'];
  var traitTextAttackTimes = parameters['traitTextAttackTimes'];
  var traitTextStypeAdd = parameters['traitTextStypeAdd'];
  var traitTextStypeSeal = parameters['traitTextStypeSeal'];
  var traitTextSkillAdd = parameters['traitTextSkillAdd'];
  var traitTextSkillSeal = parameters['traitTextSkillSeal'];
  var traitTextEquipWtype = parameters['traitTextEquipWtype'];
  var traitTextEquipAtype = parameters['traitTextEquipAtype'];
  var traitTextEquipLock = parameters['traitTextEquipLock'];
  var traitTextEquipSeal = parameters['traitTextEquipSeal'];
  var traitTextActionPlus = parameters['traitTextActionPlus'];
  var xparamText = parameters['xparamText'].split(',');
  var sparamText = parameters['sparamText'].split(',');
  var consumableValue = parameters['consumableValue'].split(',');
  var occasionValue = parameters['occasionValue'].split(',');
  var scopeValue = parameters['scopeValue'].split(',');
  var hitTypeValue = parameters['hitTypeValue'].split(',');
  var slotTypeValue = parameters['slotTypeValue'].split(',');
  var specialFlagValue = parameters['specialFlagValue'].split(',');
  var partyAbilityValue = parameters['partyAbilityValue'].split(',');
  var elementFooter = parameters['elementFooter'];
  var costExTextHp   = parameters['costExTextHp'];
  var costExTextItem = parameters['costExTextItem'];
  var costExTextExp  = parameters['costExTextExp'];
  var costExTextGold = parameters['costExTextGold'];
  var passiveAlwaysText = parameters['passiveAlwaysText'];
  var passiveTpText = parameters['passiveTpText'];
  var passiveTpText2 = parameters['passiveTpText2'];
  var passiveStateText = parameters['passiveStateText'];
  
  //-----------------------------------------------------------------------------
  // Game_Interpreter
  //

  var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
  Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    if (command === '') {
    }
  };
  
  //-----------------------------------------------------------------------------
  // Window_Selectable
  //

  var _Window_Selectable_processHandling = Window_Selectable.prototype.processHandling;
  Window_Selectable.prototype.processHandling = function() {
    if (this.isOpenAndActive() && this.isDescriptionEnabled() &&
        this.isDescriptionTriggered()) {
      this.processDescription();
    } else {
      _Window_Selectable_processHandling.call(this);
    }
  };

  Window_Selectable.prototype.isDescriptionEnabled = function() {
    return this.isHandled('description');
  };

  Window_Selectable.prototype.isDescriptionTriggered = function() {
    if (this._helpWindow && TouchInput.isTriggered()) {
      var wx = (Graphics.width - Graphics.boxWidth) / 2 + this._helpWindow.x;
      var wy = (Graphics.height - Graphics.boxHeight) / 2 + this._helpWindow.y;
      return (TouchInput.x >= wx && TouchInput.x < wx + this._helpWindow.width &&
              TouchInput.y >= wy && TouchInput.y < wy + this._helpWindow.height);
    }
    return Input.isRepeated('description');
  };

  Window_Selectable.prototype.processDescription = function() {
    if (this.isCurrentItemDescriptionEnabled()) {
      SoundManager.playOk();
      this.updateInputData();
      this.deactivate();
      this.callDescriptionHandler();
    } else {
      this.playBuzzerSound();
    }
  };

  Window_Selectable.prototype.isCurrentItemDescriptionEnabled = function() {
    return true;
  };
  
  Window_Selectable.prototype.callDescriptionHandler = function() {
    if (this.isHandled('description')) {
      this._handlers['description'](this);
    }
  };
  
  //-----------------------------------------------------------------------------
  // Window_ItemList
  //

  Window_ItemList.prototype.isCurrentItemDescriptionEnabled = function() {
    return this.item();
  };
  
  //-----------------------------------------------------------------------------
  // Window_SkillList
  //

  Window_SkillList.prototype.isCurrentItemDescriptionEnabled = function() {
    return this.item();
  };
  
  //-----------------------------------------------------------------------------
  // Window_EquipSlot
  //

  Window_EquipSlot.prototype.isCurrentItemDescriptionEnabled = function() {
    return this.item();
  };
  
  //-----------------------------------------------------------------------------
  // Window_ShopBuy
  //

  Window_ShopBuy.prototype.isCurrentItemDescriptionEnabled = function() {
    return this.item();
  };
  
  //-----------------------------------------------------------------------------
  // Window_Message
  //
  
  Window_Message.prototype.setDescriptionExWindow = function(descriptionExWindow) {
    this._descriptionExWindow = descriptionExWindow;
  };

  var _Window_Message_isAnySubWindowActive =
      Window_Message.prototype.isAnySubWindowActive;
  Window_Message.prototype.isAnySubWindowActive = function() {
    return (_Window_Message_isAnySubWindowActive.call(this) ||
            this._descriptionExWindow.active);
  };

  //-----------------------------------------------------------------------------
  // Window_DescriptionEx
  //

  function Window_DescriptionEx() {
    this.initialize.apply(this, arguments);
  }

  Window_DescriptionEx.prototype = Object.create(Window_Selectable.prototype);
  Window_DescriptionEx.prototype.constructor = Window_DescriptionEx;

  Window_DescriptionEx.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
    this.openness = 0;
  };

  Window_DescriptionEx.prototype.setItem = function(item) {
    if (this._item !== item) {
      this._item = item;
      this.refresh();
    }
  };

  Window_DescriptionEx.prototype.refresh = function() {
    this.contents.clear();
    if (this._item) {
      if (DataManager.isItem(this._item)) {
        this.refreshItem();
      } else if (DataManager.isWeapon(this._item)) {
        this.refreshWeapon();
      } else if (DataManager.isArmor(this._item)) {
        this.refreshArmor();
      } else if (DataManager.isSkill(this._item)) {
        this.refreshSkill();
      }
    }
  };

  Window_DescriptionEx.prototype.refreshItem = function() {
    var y = 0;
    this.drawItemName(this._item, 0, y);
    this.drawItemType();
    y = this.drawHorzLine(y + this.lineHeight());
    this.drawItemParameters(this.textPadding(), y);
    this.drawEffects(this.contents.width - this.textPadding() - rightPaneWidth, y);
    var profileY = this.profileY();
    y = this.drawHorzLine(profileY);
    this.drawProfile(0, y);
  };

  Window_DescriptionEx.prototype.refreshWeapon = function() {
    var y = 0;
    this.drawItemName(this._item, 0, y);
    this.drawWeaponType();
    y = this.drawHorzLine(y + this.lineHeight());
    this.drawEquipParameters(this.textPadding(), y);
    this.drawTraits(this.contents.width - this.textPadding() - rightPaneWidth, y);
    var profileY = this.profileY();
    y = this.drawHorzLine(profileY);
    this.drawProfile(0, y);
  };

  Window_DescriptionEx.prototype.refreshArmor = function() {
    var y = 0;
    this.drawItemName(this._item, 0, y);
    this.drawArmorType();
    y = this.drawHorzLine(y + this.lineHeight());
    this.drawEquipParameters(this.textPadding(), y);
    this.drawTraits(this.contents.width - this.textPadding() - rightPaneWidth, y);
    var profileY = this.profileY();
    y = this.drawHorzLine(profileY);
    this.drawProfile(0, y);
  };
  
  Window_DescriptionEx.prototype.refreshSkill = function() {
    var y = 0;
    this.drawItemName(this._item, 0, y);
    this.drawSkillType();
    y = this.drawHorzLine(y + this.lineHeight());
    if (Imported.TMPassiveSkill && this._item.meta.passive) {
      this.drawPassiveSkillParameters(this.textPadding(), y);
    } else {
      this.drawSkillParameters(this.textPadding(), y);
      this.drawEffects(this.contents.width - this.textPadding() - rightPaneWidth, y);
    }
    var profileY = this.profileY();
    y = this.drawHorzLine(profileY);
    this.drawProfile(0, y);
  };

  Window_DescriptionEx.prototype.drawItemType = function() {
    if (this._item.meta.dType) {
      var text = this._item.meta.dType;
    } else if (this._item.itypeId === 1) {
      var text = TextManager.item;
    } else if (this._item.itypeId === 2) {
      var text = TextManager.keyItem;
    } else if (this._item.itypeId === 3) {
      var text = secretItemA;
    } else if (this._item.itypeId === 4) {
      var text = secretItemB;
    }
    this.drawText(text, 0, 0, this.contents.width - this.textPadding(), 'right');
  };
  
  Window_DescriptionEx.prototype.drawWeaponType = function() {
    var text = this._item.meta.dType ? this._item.meta.dType :
               $dataSystem.weaponTypes[this._item.wtypeId];
    this.drawText(text, 0, 0, this.contents.width - this.textPadding(), 'right');
  };
  
  Window_DescriptionEx.prototype.drawArmorType = function() {
    var text = this._item.meta.dType ? this._item.meta.dType :
               $dataSystem.armorTypes[this._item.atypeId];
    this.drawText(text, 0, 0, this.contents.width - this.textPadding(), 'right');
  };
  
  Window_DescriptionEx.prototype.drawSkillType = function() {
    var text = this._item.meta.dType ? this._item.meta.dType :
               $dataSystem.skillTypes[this._item.stypeId];
    this.drawText(text, 0, 0, this.contents.width - this.textPadding(), 'right');
  };
  
  Window_DescriptionEx.prototype.drawItemParameters = function(x, y) {
    var lineHeight = this.lineHeight();
    y = this.drawLeftParameter(x, y, consumableText,
                               consumableValue[this._item.consumable ? 0 : 1]);
    y = this.drawLeftParameter(x, y, occasionText,
                               occasionValue[this._item.occasion]);
    y = this.drawBattleItemParameters(x, y + lineHeight);
    this.drawPrice(x, y + lineHeight);
  };
  
  Window_DescriptionEx.prototype.drawEquipParameters = function(x, y, item) {
    item = item || this._item;
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 8; i++) {
      if (TextManager.param(i)) {
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(i), x, y, leftPaneWidth);
        this.resetTextColor();;
        this.drawText(item.params[i], x, y, leftPaneWidth, 'right');
        y += lineHeight;
      }
    }
    this.drawPrice(x, y + lineHeight);
  };
  
  Window_DescriptionEx.prototype.drawSkillParameters = function(x, y) {
    var lineHeight = this.lineHeight();
    this.changeTextColor(this.systemColor());
    this.drawText(mpCostText,        x, y + lineHeight * 0, leftPaneWidth);
    this.drawText(tpCostText,        x, y + lineHeight * 1, leftPaneWidth);
    this.drawText(occasionText,      x, y + lineHeight * 2, leftPaneWidth);
    this.resetTextColor();;
    var text = this._item.mpCost;
    if (Imported.TMSkillCostEx && this._item.meta.mpRateCost) {
      text = this._item.meta.mpRateCost + '%';
    }
    this.drawText(text, x, y + lineHeight * 0, leftPaneWidth, 'right');
    this.drawText(this._item.tpCost, x, y + lineHeight * 1, leftPaneWidth, 'right');
    text = occasionValue[this._item.occasion];
    this.drawText(text, x, y + lineHeight * 2, leftPaneWidth, 'right');
    this.drawLeftParameter(x, y + lineHeight * 3, requiredWtypeText,
                           this.requiredWtypeValue());
    this.drawBattleItemParameters(x, y + lineHeight * 5);
  };
  
  Window_DescriptionEx.prototype.elementText = function(elementId) {
    if (elementId > 0) {
      return $dataSystem.elements[elementId] + elementFooter;
    } else if (elementId === 0) {
      return '無' + elementFooter;
    } else {
      return '';
    }
  };
  
  Window_DescriptionEx.prototype.requiredWtypeValue = function() {
    if (this._item.requiredWtypeId1 > 0) {
      text = $dataSystem.weaponTypes[this._item.requiredWtypeId1];
      if (this._item.requiredWtypeId2 > 0) {
        text += ' ' + $dataSystem.weaponTypes[this._item.requiredWtypeId2];
      }
    } else if (this._item.requiredWtypeId2 > 0) {
      text = $dataSystem.weaponTypes[this._item.requiredWtypeId2];
    } else {
      text = 'なし';
    }
    return text;
  };
  
  Window_DescriptionEx.prototype.valueToText = function(value) {
    return (value >= 0 ? '+' : '') + value;
  };
  
  Window_DescriptionEx.prototype.rateToText = function(rate, useSign) {
    if (useSign === undefined) useSign = true;
    return (useSign && rate > 1 ? '+' : '') + (rate * 100 - 100);
  };
  
  Window_DescriptionEx.prototype.drawBattleItemParameters = function(x, y) {
    y = this.drawLeftParameter(x, y, scopeText, scopeValue[this._item.scope]);
    y = this.drawLeftParameter(x, y, speedText, this._item.speed);
    y = this.drawLeftParameter(x, y, successRateText, this._item.successRate + '%');
    y = this.drawLeftParameter(x, y, repeatsText, this._item.repeats);
    y = this.drawLeftParameter(x, y, tpGainText, this._item.tpGain);
    y = this.drawLeftParameter(x, y, hitTypeText, hitTypeValue[this._item.hitType]);
    return y;
  };
  
  Window_DescriptionEx.prototype.drawLeftParameter = function(x, y, text, value) {
    if (text === '') return y;
    this.changeTextColor(this.systemColor());
    this.drawText(text, x, y, leftPaneWidth);
    this.resetTextColor();;
    this.drawText(value, x, y, leftPaneWidth, 'right');
    return y + this.lineHeight();
  };
  
  Window_DescriptionEx.prototype.drawRightParameter = function(x, y, text) {
    if (text === '') return y;
    var lineHeight = this.lineHeight();
    y += lineHeight;
    if (y <= this.profileY() - lineHeight) {
      this.resetTextColor();
      this.drawText(text, x, y, rightPaneWidth);
    }
    return y;
  };
  
  Window_DescriptionEx.prototype.drawPrice = function(x, y) {
    if (priceText === '' || this._item.price === undefined) return y;
    this.changeTextColor(this.systemColor());
    this.drawText(priceText, x, y, leftPaneWidth);
    this.drawCurrencyValue((this._item.price * priceRate).toFixed(0),
        TextManager.currencyUnit, x, y, leftPaneWidth);
    return y + this.lineHeight();
  };
  
  Window_DescriptionEx.prototype.drawEffects = function(x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText(effectText, x, y, rightPaneWidth);
    this.resetTextColor();;
    if (Imported.TMSkillCostEx) y = this.drawCostEx(x, y);
    y = this.drawDamage(x, y);
    for (var i = 0; i < this._item.effects.length; i++) {
      var effect = this._item.effects[i];
      var text = '';
      if (effect.code === Game_Action.EFFECT_RECOVER_HP) {
        if (effect.value1 !== 0) {
          text = effectTextRecoverHp.format(effect.value1 + '%');
        } else {
          text = effectTextRecoverHp.format(effect.value2);
        }
      } else if (effect.code === Game_Action.EFFECT_RECOVER_MP) {
        if (effect.value1 !== 0) {
          text = effectTextRecoverMp.format(effect.value1 + '%');
        } else {
          text = effectTextRecoverMp.format(effect.value2);
        }
      } else if (effect.code === Game_Action.EFFECT_GAIN_TP) {
        text = effectTextGainTp.format(effect.value1);
      } else if (effect.code === Game_Action.EFFECT_ADD_STATE) {
        text = effectTextAddState.format($dataStates[effect.dataId].name,
               Math.floor(effect.value1 * 100));
      } else if (effect.code === Game_Action.EFFECT_REMOVE_STATE) {
        text = effectTextRemoveState.format($dataStates[effect.dataId].name,
               Math.floor(effect.value1 * 100));
      } else if (effect.code === Game_Action.EFFECT_ADD_BUFF) {
        text = effectTextAddBuff.format(TextManager.param(effect.dataId), effect.value1);
      } else if (effect.code === Game_Action.EFFECT_ADD_DEBUFF) {
        text = effectTextAddDebuff.format(TextManager.param(effect.dataId), effect.value1);
      } else if (effect.code === Game_Action.EFFECT_REMOVE_BUFF) {
        text = effectTextRemoveBuff.format(TextManager.param(effect.dataId), effect.value1);
      } else if (effect.code === Game_Action.EFFECT_REMOVE_DEBUFF) {
        text = effectTextRemoveDebuff.format(TextManager.param(effect.dataId), effect.value1);
      } else if (effect.code === Game_Action.EFFECT_SPECIAL) {
        text = effectTextSpecial;
      } else if (effect.code === Game_Action.EFFECT_GROW) {
        text = effectTextGrow.format(TextManager.param(effect.dataId), effect.value1);
      } else if (effect.code === Game_Action.EFFECT_LEARN_SKILL) {
        text = effectTextLearnSkill.format($dataSkills[effect.dataId].name);
      }
      y = this.drawRightParameter(x, y, text);
    }
    this.drawOptionText(x, y);
  };
  
  Window_DescriptionEx.prototype.profileY = function() {
    return this.contents.height - this.lineHeight() * 2 - horzLineHeight;
  };
  
  Window_DescriptionEx.prototype.drawDamage = function(x, y) {
    var text = '';
    if (this._item.damage.type === 1 || this._item.damage.type === 5) {
      text = damageTextDamageHp.format(this.elementText(this._item.damage.elementId));
    } else if (this._item.damage.type === 2 || this._item.damage.type === 6) {
      text = damageTextDamageMp.format(this.elementText(this._item.damage.elementId));
    } else if (this._item.damage.type === 3) {
      text = damageTextRecoverHp;
    } else if (this._item.damage.type === 4) {
      text = damageTextRecoverMp;
    }
    y = this.drawRightParameter(x, y, text);
    if (this._item.damage.type >= 5) {
      text = this._item.damage.type === 5 ? damageTextDrainHp : damageTextDrainMp;
      y = this.drawRightParameter(x, y, text);
    }
    return y;
  };
  
  Window_DescriptionEx.prototype.drawTraits = function(x, y, item) {
    item = item || this._item
    this.changeTextColor(this.systemColor());
    this.drawText(traitText, x, y, rightPaneWidth);
    this.resetTextColor();;
    if (Imported.TMPassiveSkill && this._item.meta.passive) {
      y = this.drawPassiveSkillOccasion(x, y);
    }
    for (var i = 0; i < item.traits.length; i++) {
      var trait = item.traits[i];
      var text = '';
      if (trait.code === Game_BattlerBase.TRAIT_ELEMENT_RATE) {
        text = traitTextElementRate.format(this.elementText(trait.dataId),
               this.rateToText(trait.value));
      } else if (trait.code === Game_BattlerBase.TRAIT_DEBUFF_RATE) {
        text = traitTextDebuffRate.format(TextManager.param(trait.dataId),
               this.rateToText(trait.value));
      } else if (trait.code === Game_BattlerBase.TRAIT_STATE_RATE) {
        text = traitTextStateRate.format($dataStates[trait.dataId].name,
               this.rateToText(trait.value));
      } else if (trait.code === Game_BattlerBase.TRAIT_STATE_RESIST) {
        text = traitTextStateResist.format($dataStates[trait.dataId].name);
      } else if (trait.code === Game_BattlerBase.TRAIT_PARAM) {
        text = traitTextParam.format(TextManager.param(trait.dataId),
               this.rateToText(trait.value));
      } else if (trait.code === Game_BattlerBase.TRAIT_XPARAM) {
        text = traitTextXparam.format(xparamText[trait.dataId],
               this.valueToText(trait.value * 100));
      } else if (trait.code === Game_BattlerBase.TRAIT_SPARAM) {
        text = traitTextSparam.format(sparamText[trait.dataId],
               this.rateToText(trait.value));
      } else if (trait.code === Game_BattlerBase.TRAIT_ATTACK_ELEMENT) {
        text = traitTextAttackElement.format(this.elementText(trait.dataId));
      } else if (trait.code === Game_BattlerBase.TRAIT_ATTACK_STATE) {
        text = traitTextAttackState.format($dataStates[trait.dataId].name,
               trait.value * 100);
      } else if (trait.code === Game_BattlerBase.TRAIT_ATTACK_SPEED) {
        text = traitTextAttackSpeed.format(this.valueToText(trait.value));
      } else if (trait.code === Game_BattlerBase.TRAIT_ATTACK_TIMES) {
        text = traitTextAttackTimes.format(this.valueToText(trait.value));
      } else if (trait.code === Game_BattlerBase.TRAIT_STYPE_ADD) {
        text = traitTextStypeAdd.format($dataSystem.skillTypes[trait.dataId]);
      } else if (trait.code === Game_BattlerBase.TRAIT_STYPE_SEAL) {
        text = traitTextStypeSeal.format($dataSystem.skillTypes[trait.dataId]);
      } else if (trait.code === Game_BattlerBase.TRAIT_SKILL_ADD) {
        text = traitTextSkillAdd.format($dataSkills[trait.dataId].name);
      } else if (trait.code === Game_BattlerBase.TRAIT_SKILL_SEAL) {
        text = traitTextSkillSeal.format($dataSkills[trait.dataId].name);
      } else if (trait.code === Game_BattlerBase.TRAIT_EQUIP_WTYPE) {
        text = traitTextEquipWtype.format($dataSystem.weaponTypes[trait.dataId]);
      } else if (trait.code === Game_BattlerBase.TRAIT_EQUIP_ATYPE) {
        text = traitTextEquipAtype.format($dataSystem.armorTypes[trait.dataId]);
      } else if (trait.code === Game_BattlerBase.TRAIT_EQUIP_LOCK) {
        text = traitTextEquipLock.format($dataSystem.equipTypes[trait.dataId]);
      } else if (trait.code === Game_BattlerBase.TRAIT_EQUIP_SEAL) {
        text = traitTextEquipSeal.format($dataSystem.equipTypes[trait.dataId]);
      } else if (trait.code === Game_BattlerBase.TRAIT_SLOT_TYPE) {
        text = slotTypeValue[trait.value];
      } else if (trait.code === Game_BattlerBase.TRAIT_ACTION_PLUS) {
        text = traitTextActionPlus.format(trait.value * 100);
      } else if (trait.code === Game_BattlerBase.TRAIT_SPECIAL_FLAG) {
        text = specialFlagValue[trait.dataId];
      } else if (trait.code === Game_BattlerBase.TRAIT_PARTY_ABILITY) {
        text = partyAbilityValue[trait.dataId];
      }
      y = this.drawRightParameter(x, y, text);
    }
    this.drawOptionText(x, y);
  };
  
  Window_DescriptionEx.prototype.drawOptionText = function(x, y) {
    if (this._item.meta.dText) {
      var textArray = this._item.meta.dText.split(/\r\n|\r|\n/);
      for (var i = 0; i < textArray.length; i++) {
        y = this.drawRightParameter(x, y, textArray[i]);
      }
    }
  };
  
  Window_DescriptionEx.prototype.drawHorzLine = function(y) {
    var lineY = y + horzLineHeight / 2 - 1;
    this.contents.paintOpacity = 48;
    this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
    this.contents.paintOpacity = 255;
    return y + horzLineHeight;
  };

  Window_DescriptionEx.prototype.lineColor = function() {
    return this.normalColor();
  };

  Window_DescriptionEx.prototype.drawProfile = function(x, y) {
    this.drawTextEx(this._item.description, x + this.textPadding(), y);
  };

  Window_DescriptionEx.prototype.drawCostEx = function(x, y) {
    var dummyActor = new Game_Actor(1);
    var text = '';
    if (this._item.meta.hpRateCost) {
      text = costExTextHp.format(this._item.meta.hpRateCost + '%');
    } else if (this._item.meta.hpCost) {
      text = costExTextHp.format(this._item.meta.hpCost);
    }
    y = this.drawRightParameter(x, y, text);
    var cost = dummyActor.skillItemCost(this._item);
    if (cost) {
      text = costExTextItem.format(cost.item.name, cost.num);
      y = this.drawRightParameter(x, y, text);
    }
    if (this._item.meta.expCost) {
      text = costExTextExp.format(this._item.meta.expCost);
      y = this.drawRightParameter(x, y, text);
    }
    if (this._item.meta.goldCost) {
      text = costExTextGold.format(this._item.meta.goldCost + TextManager.currencyUnit);
      y = this.drawRightParameter(x, y, text);
    }
    return y;
  };
  
  Window_DescriptionEx.prototype.drawPassiveSkillParameters = function(x, y) {
    var item = $dataWeapons[+this._item.meta.passive];
    this.drawTraits(this.contents.width - this.textPadding() - rightPaneWidth, y, item);
    this.drawLeftParameter(x, y, requiredWtypeText, this.requiredWtypeValue());
    y += this.lineHeight() * 2;
    this.drawEquipParameters(this.textPadding(), y, item);
  };
  
  Window_DescriptionEx.prototype.drawPassiveSkillOccasion = function(x, y) {
    var lastY = y;
    if (this._item.meta.passiveTp) {
      if (+this._item.meta.passiveTp > 0) {
        var text = passiveTpText.format(this._item.meta.passiveTp);
      } else {
        var text = passiveTpText2.format(-this._item.meta.passiveTp);
      }
      y = this.drawRightParameter(x, y, text);
    }
    if (this._item.meta.passiveState) {
      var text = passiveStateText.format($dataStates[+this._item.meta.passiveState].name);
      y = this.drawRightParameter(x, y, text);
    }
    if (lastY === y) {
      y = this.drawRightParameter(x, y, passiveAlwaysText);
    }
    return y;
  };
  
  //-----------------------------------------------------------------------------
  // Scene_Base
  //

  Scene_Base.prototype.createDescriptionExWindow = function() {
    this._descriptionExWindow = new Window_DescriptionEx();
    this._descriptionExWindow.setHandler('description', this.descriptionClose.bind(this));
    this._descriptionExWindow.setHandler('cancel',      this.descriptionClose.bind(this));
    this.addWindow(this._descriptionExWindow);
  };
  
  Scene_Base.prototype.descriptionOpen = function(mainWindow) {
    this._descriptionMainWindow = mainWindow;
    this._descriptionExWindow.setItem(this._descriptionMainWindow.item());
    this._descriptionExWindow.open();
    this._descriptionExWindow.activate();
  };
  
  Scene_Base.prototype.descriptionClose = function() {
    this._descriptionExWindow.close();
    this._descriptionMainWindow.activate();
  };

  //-----------------------------------------------------------------------------
  // Scene_Map
  //

  var _Scene_Map_createMessageWindow = Scene_Map.prototype.createMessageWindow;
  Scene_Map.prototype.createMessageWindow = function() {
    _Scene_Map_createMessageWindow.call(this);
    this._messageWindow._itemWindow.setHandler('description',
        this.descriptionOpen.bind(this));
    this.createDescriptionExWindow();
    this._messageWindow.setDescriptionExWindow(this._descriptionExWindow);
  };

  //-----------------------------------------------------------------------------
  // Scene_Item
  //

  var _Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
  Scene_Item.prototype.createItemWindow = function() {
    _Scene_Item_createItemWindow.call(this);
    this._itemWindow.setHandler('description', this.descriptionOpen.bind(this));
    this.createDescriptionExWindow();
  };

  //-----------------------------------------------------------------------------
  // Scene_Skill
  //

  var _Scene_Skill_createItemWindow = Scene_Skill.prototype.createItemWindow;
  Scene_Skill.prototype.createItemWindow = function() {
    _Scene_Skill_createItemWindow.call(this);
    this._itemWindow.setHandler('description', this.descriptionOpen.bind(this));
    this.createDescriptionExWindow();
  };

  //-----------------------------------------------------------------------------
  // Scene_Equip
  //

  var _Scene_Equip_createItemWindow = Scene_Equip.prototype.createItemWindow;
  Scene_Equip.prototype.createItemWindow = function() {
    _Scene_Equip_createItemWindow.call(this);
    this._itemWindow.setHandler('description', this.descriptionOpen.bind(this));
    this.createDescriptionExWindow();
  };

  var _Scene_Equip_createSlotWindow = Scene_Equip.prototype.createSlotWindow;
  Scene_Equip.prototype.createSlotWindow = function() {
    _Scene_Equip_createSlotWindow.call(this);
    this._slotWindow.setHandler('description', this.descriptionOpen.bind(this));
  };

  //-----------------------------------------------------------------------------
  // Scene_Shop
  //

  var _Scene_Shop_createBuyWindow = Scene_Shop.prototype.createBuyWindow;
  Scene_Shop.prototype.createBuyWindow = function() {
    _Scene_Shop_createBuyWindow.call(this);
    this._buyWindow.setHandler('description', this.descriptionOpen.bind(this));
  };

  var _Scene_Shop_createSellWindow = Scene_Shop.prototype.createSellWindow;
  Scene_Shop.prototype.createSellWindow = function() {
    _Scene_Shop_createSellWindow.call(this);
    this._sellWindow.setHandler('description', this.descriptionOpen.bind(this));
    this.createDescriptionExWindow();
  };

  //-----------------------------------------------------------------------------
  // Scene_Battle
  //

  var _Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
  Scene_Battle.prototype.isAnyInputWindowActive = function() {
    return _Scene_Battle_isAnyInputWindowActive.call(this) ||
           this._descriptionExWindow.active;
  };

  var _Scene_Battle_createSkillWindow = Scene_Battle.prototype.createSkillWindow;
  Scene_Battle.prototype.createSkillWindow = function() {
    _Scene_Battle_createSkillWindow.call(this);
    this._skillWindow.setHandler('description', this.descriptionOpen.bind(this));
  };

  var _Scene_Battle_createItemWindow = Scene_Battle.prototype.createItemWindow;
  Scene_Battle.prototype.createItemWindow = function() {
    _Scene_Battle_createItemWindow.call(this);
    this._itemWindow.setHandler('description', this.descriptionOpen.bind(this));
  };

  var _Scene_Battle_createMessageWindow = Scene_Battle.prototype.createMessageWindow;
  Scene_Battle.prototype.createMessageWindow = function() {
    _Scene_Battle_createMessageWindow.call(this);
    this._messageWindow._itemWindow.setHandler('description',
        this.descriptionOpen.bind(this));
    this.createDescriptionExWindow();
    this._messageWindow.setDescriptionExWindow(this._descriptionExWindow);
  };

})();

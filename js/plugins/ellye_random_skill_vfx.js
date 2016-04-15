// Place file inside /js/plugins
// Remember to save after adding plugins or changing parameters.
// Made by request.
//=============================================================================
// Skills with multiple possible Visual Effects
//=============================================================================
/*:
 * Version: 2015-11-16-0304
 * 
 * CHANGE LOG:
 * 2015-11-16-0304 - Released.
 * 
 * 
 * @plugindesc Ver.2015-11-16-0304. Skills with multiple possible visual effects.
 * <Ellye Random VFX>
 * @author https://ellyeblog.wordpress.com/ || http://steamcommunity.com/id/Ellye
 * 
 * @help In any skill or activable battle item, you can use type the following text in your note field:
 * <random_vfx:ANIMATION_ID_1,ANIMATION_ID2,ANIMATION_ID3,etc>
 * 
 * For example, a skill with:
 * <random_vfx:14,45,67,32>
 * Will randomly play the animations with ID 14, 45, 67 or 32 when used during battle.
 * Leave the "Aniamtion" field blank, otherwise two animations will be played;
 * Unless you actually want both animation to play at the same time, some cool stuff can be done with that.
 * 
 */

var Imported = Imported || {};
Imported.Ellye_RVFX = true;

(function() {

    _alias_window_batlelog_startaction = Window_BattleLog.prototype.startAction;
    Window_BattleLog.prototype.startAction = function(subject, action, targets) {
        _alias_window_batlelog_startaction.call(this, subject, action, targets);
        var item = action.item();
        if (typeof item.meta !== 'undefined' && typeof item.meta.random_vfx !== 'undefined')
        {
            eval("var random_vfx = [" + item.meta.random_vfx + "]");
            var vfx = random_vfx[Math.floor(Math.random() * random_vfx.length)];
            this.push('showAnimation', subject, targets.clone(), vfx);
        }
    };
})();
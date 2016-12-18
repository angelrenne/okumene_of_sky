//=============================================================================
// meme_table.js
// by デスポン
// 最終更新: 2016.5.15
//=============================================================================

/*:
 * @plugindesc jsonファイルの一部をエクセル対応します。
 * @author デスポン
 * @version 1.0
 * 
 * @help
 * jsonファイルの一部をエクセル対応します。
 * jsonファイルを書き換えて吐き出すのが目的です。普段はOFFにしよう。
 */
 
(function() {
    
DataManager._databaseFiles = [
    { name: '$dataActors',       src: 'Actors.json'       },
    { name: '$dataClasses',      src: 'Classes.json'      },
    { name: '$dataSkills',       src: 'Skills.json'       },
    { name: '$dataItems',        src: 'Items.json'        },
    { name: '$dataWeapons',      src: 'Weapons.json'      },
    { name: '$dataArmors',       src: 'Armors.json'       },
    { name: '$dataEnemies',      src: 'Enemies.json'      },
    { name: '$dataTroops',       src: 'Troops.json'       },
    { name: '$dataStates',       src: 'States.json'       },
    { name: '$dataAnimations',   src: 'Animations.json'   },
    { name: '$dataTilesets',     src: 'Tilesets.json'     },
    { name: '$dataCommonEvents', src: 'CommonEvents.json' },
    { name: '$dataSystem',       src: 'System.json'       },
    { name: '$dataMapInfos',     src: 'MapInfos.json'     },
    //{ name: '$dataSkills_prams', src: 'Skills_prams.json' }
];

DataManager.loadDataFile = function(name, src) {
    var xhr = new XMLHttpRequest();
    var url = 'data/' + src;
    var f   = 0;
    xhr.open('GET', url);
    xhr.overrideMimeType('application/json');
    xhr.onload = function() {
        if (xhr.status < 400) {
            window[name] = JSON.parse(xhr.responseText);
            DataManager.onLoad(window[name]);
            if (name == '$dataArmors'){
                console.log($dataItems);
                for (var i = 20; i < 47; i++) {
                    //console.log($dataSkills_prams[i-19]);
                    //ゲーム起動時にスキル名とスキル説明文をアイテム側と紐付する。
                    $dataArmors[i].name = $dataSkills[i].name;
                    $dataArmors[i].description = $dataSkills[i].description;
                    //$dataArmors[i].traits[0].dataId = $dataSkills[i].id;
                }
                //編集したデータを上書きする。
                //var json_text = JSON.stringify($dataArmors);
                //console.log(json_text);
                //filePath = "C:/Users/despon/Documents/ツクール/RPGMV/虚空のエクメーネ/data/Armors.json"
                //var fs = require('fs');
                //fs.writeFileSync(filePath, json_text);
            }
        }
    };
    xhr.onerror = function() {
        DataManager._errorUrl = DataManager._errorUrl || url;
    };
    window[name] = null;
    xhr.send();
};

})();
/*
 * Generated by BeChicken
 * on 8/23/2019
 * version v1.0
 */
(function () {
    cc.TLMN_PopupView = cc.Class({
        extends: cc.Component,
        properties: {
            wrapPopup: cc.Node,
            notifyHeo: cc.Node,
            notifyBaDoiThong: cc.Node,
            notifyBonDoiThong: cc.Node,
            notifyTuQuyDoiThong: cc.Node

        },
        onLoad: function () {
            cc.TLMN_PopupController.getInstance().getPoupView(this);
        }
    });
}).call(this)
/**
 * Created by Nofear on 6/7/2017.
 */

(function () {
    cc.XocDiaMiniPopupView = cc.Class({
        "extends": cc.PopupViewBase,
        properties: {
            prefabGroupUser: cc.Prefab
        },

        onLoad: function () {
            cc.XocDiaMiniPopupController.getInstance().setXXPopupView(this);
        },
        createGroupUserView: function () {
            this.nodeGroupUser = this.createView(this.prefabGroupUser);
        },
        destroyGroupUserView: function () {
            if (this.nodeGroupUser)
                this.nodeGroupUser.destroy();
        },
		
    });
}).call(this);

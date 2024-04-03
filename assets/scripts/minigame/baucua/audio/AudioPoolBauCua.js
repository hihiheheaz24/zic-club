/*
 * Generated by BeChicken
 * on 10/2/2019
 * version v1.0
 */
(function () {
    cc.AudioPoolBacarat = cc.Class({
        "extends": cc.AudioPool,
        properties: {
            musicBackground: cc.AudioSource,

            moveCard: cc.AudioSource,
            chipBet: cc.AudioSource,
            chipSelect: cc.AudioSource,
        },

        enableMusic: function (enable) {
            if (this.musicBackground) {
                if (enable) {
                    if (!this.musicBackground.isPlaying) {
                        this.musicBackground.play();
                    }
                } else {
                    this.musicBackground.stop();
                }
            }
        },

        enableSound: function (enable) {
            this.chipBet.mute = !enable;
            this.moveCard.mute = !enable;
            this.musicBackground.mute = !enable;
        },

        getAudioClip: function (clipType) {
            let audioClip = null;
            switch (clipType) {
                case cc.AudioTypes.CHIP_SELECT:
                    audioClip = this.chipSelect;
                    break;
                case cc.AudioTypes.CHIP_BET:
                    audioClip = this.chipBet;
                    break;
                case cc.AudioTypes.OPEN_CARD:
                    audioClip = this.moveCard;
                    break;
            }
            return audioClip;
        }
    });

}).call(this);
/*
 * Generated by BeChicken
 * on 6/20/2019
 * version v1.0
 */
(function () {
    cc.DragonTigerAudio = cc.Class({
        "extends": cc.AudioPool,
        properties: {
            backgroundSound: cc.AudioSource,
            betSound: cc.AudioSource,
            cardsSlide: cc.AudioSource,
            cardsSlideBurn: cc.AudioSource,
            cardsSlideRong: cc.AudioSource,
            cardsSlideHo: cc.AudioSource,
            cardBurnMoveToBox: cc.AudioSource,
            cardOpen: cc.AudioSource,
            selectChip: cc.AudioSource,
            getCoin: cc.AudioSource,
        },

        enableMusic: function (enable) {
            if (this.backgroundSound) {
                if (enable) {
                    if (!this.backgroundSound.isPlaying) {
                        this.backgroundSound.play();
                        this.backgroundSound.volume = 0.5;
                    }
                } else {
                    this.backgroundSound.stop();
                }
            }
        },

        enableSound: function (enable) {
            this.betSound.mute = !enable;
            this.cardsSlideBurn.mute = !enable;
            this.cardsSlideHo.mute = !enable;
            this.cardsSlideRong.mute = !enable;
            this.cardBurnMoveToBox.mute = !enable;
            this.cardOpen.mute = !enable;
            this.selectChip.mute = !enable;
            this.getCoin.mute = !enable;
            this.betSound.volume = 0.2;
            this.getCoin.volume = 0.2;
            this.selectChip.volume = 0.2;
        },

        getAudioClip: function (clipType) {
            var audioClip;
            audioClip = null;
            switch (clipType) {
                case cc.DragonTigerAudioTypes.BACKGROUND:
                    audioClip = this.backgroundSound;
                    break;
                case cc.DragonTigerAudioTypes.BET:
                    audioClip = this.betSound;
                    break;
                case cc.DragonTigerAudioTypes.CARD_SLIDE_BURN:
                    audioClip = this.cardsSlideBurn;
                    break;
                case cc.DragonTigerAudioTypes.CARD_SLIDE_RONG:
                    audioClip = this.cardsSlideRong;
                    break;
                case cc.DragonTigerAudioTypes.CARD_SLIDE_HO:
                    audioClip = this.cardsSlideHo;
                    break;
                case cc.DragonTigerAudioTypes.CARD_BURN_MOVE_TO_BOX:
                    audioClip = this.cardBurnMoveToBox;
                    break;
                case cc.DragonTigerAudioTypes.CARD_OPEN:
                    audioClip = this.cardOpen;
                    break;
                case cc.DragonTigerAudioTypes.SELECT_CHIP:
                    audioClip = this.selectChip;
                    break;
                case cc.DragonTigerAudioTypes.GET_COIN:
                    audioClip = this.getCoin;
                    break;
            }
            return audioClip;
        }
    });

}).call(this);

(function($, root) {
    var $scope = $(document.body);

    function audioManage() {
        this.audio = new Audio();
        this.status = "pause";
        this.bindEvent();

    }
    audioManage.prototype = {
        bindEvent: function() {
            $(this.audio).on("ended", function() {
                $scope.find(".next-btn").trigger("click");
            });
        },
        play: function() {
            this.audio.play();
            this.status = "play";
        },
        pause: function() {
            this.audio.pause();
            this.status = "pause";
        },
        setAudioSource: function(src) {
            this.audio.src = src;
            this.audio.load();
        },
        jumpToPlay: function(duration) {
            this.audio.currentTime = duration;
            this.play();
        }
    }
    root.audioManage = audioManage;
})(window.Zepto, window.player)
var $ = window.Zepto;
var $scope = $(document.body);
var root = window.player;
var render = root.render;
var songList;
var controlmanage;
var audiomanage = new root.audioManage();
var processor = root.processor;
var playlist = root.playList;

function bindClick() {
    $scope.on("play:change", function(e, index, flag) {
        render(songList[index]);
        audiomanage.setAudioSource(songList[index].audio);
        if (audiomanage.status == "play" || flag) {
            audiomanage.play();
            processor.start();
        }
        processor.renderAllTime(songList[index].duration)
        processor.update(0);
    });
    $scope.find(".next-btn").on("click", function() {
        var index = controlmanage.next();
        $scope.trigger("play:change", index);
    });
    $scope.find(".prev-btn").on("click", function() {
        var index = controlmanage.prev();
        $scope.trigger("play:change", index);
    });
    $scope.find(".play-btn").on("click", function() {
        if (audiomanage.status == "pause") {
            audiomanage.play();
            $(this).addClass("playing");
            processor.start();
        } else {
            audiomanage.pause();
            $(this).removeClass("playing");
            processor.stop();
        }
    });
    $scope.find(".list-btn").on("click", function() {
        playlist.show(controlmanage);
    });
}

function bindTouch() {
    var $sliderPoint = $scope.find(".slider-point");
    var offset = $scope.find(".processer").offset();
    var left = offset.left;
    var width = offset.width;
    $sliderPoint.on("touchstart", function() {
        processor.stop();
    }).on("touchmove", function(e) {
        var x = e.changedTouches[0].clientX;
        var parcent = (x - left) / width;
        if (parcent < 0) {
            parcent = 0;

        } else if (parcent > 1) {
            parcent = 1;
        }
        processor.update(parcent);
    }).on("touchend", function(e) {
        var x = e.changedTouches[0].clientX;
        var parcent = (x - left) / width;
        var curDuration = songList[controlmanage.index].duration * parcent;
        audiomanage.jumpToPlay(curDuration);
        processor.start(parcent);
        $scope.find(".play-btn").addClass("playing");
    })
}

function getData(url) {
    $.ajax({
        url: url,
        type: "GET",
        success: function(data) {
            playlist.renderList(data);
            controlmanage = new root.controlManage(data.length);
            bindClick();
            bindTouch();
            songList = data;
            $scope.trigger("play:change", 0);
        },
        fail: function() {
            console.log('error');
        }
    });
}
getData("./mock/data.json");
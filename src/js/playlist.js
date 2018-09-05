(function($, root) {
    var $scope = $(document.body);
    var controlmanage;
    var $playList = $("<div class = 'play-list'>" + "<div class = 'list-header'>播放列表</div>" + "<ul class = 'list-wrapper'></ul>" + "<ul class = 'list-close'>关闭</ul>" + "</div>");

    function renderList(data) {
        var html = '';
        for (var i = 0; i < data.length; i++) {
            html += "<li><h3>" + data[i].song + "-<span>" + data[i].singer + "</span>" + "</h3></li>"
        }
        $playList.find(".list-wrapper").html(html);
        $scope.append($playList);
        bindEvent();
    }

    function signIndex(index) {
        $playList.find('li').removeClass("playing");
        $playList.find("li").eq(index).addClass("playing");
    }

    function bindEvent() {
        $playList.find(".list-close").on("click", function() {
            $playList.removeClass("show");
        });
        $playList.find("li").on("click", function() {
            $(".content-wrapper .play-control .play-btn").addClass("playing");
            var index = $(this).index();
            controlmanage.index = index;
            signIndex(index);
            $scope.trigger("play:change", [index, true]);
            setTimeout(function() {
                $playList.removeClass("show");
            }, 500)
        })
    }

    function show(control) {
        $playList.addClass("show");
        controlmanage = control;
        var index = controlmanage.index;
        signIndex(index);
    }
    root.playList = {
        renderList: renderList,
        show: show
    }
})(window.Zepto, window.player)
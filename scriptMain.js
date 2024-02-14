var videoDivHeight;
    var videoPaused = false;
    var btnSoundClick = false;

    $(document).ready(function () {


        $(document).trigger('player.video.play');

        countWrapperHeight();

        $(window).resize(function () {
            countWrapperHeight();
        });

        $('.wistia-video-container').click(function () {
            var that = $(this);
            fullScreenVideo(that);
        });

        $('.video-paused-btn, .continue-text, .yt-thumbnail').on('click', function () {

            var video = $('.wistia-video-container video');
            video.prop('muted', false);
            // video.get(0).play();

            if (typeof player !== 'undefined') {
                player.unMute();
                player.playVideo();
            }

            $('body').addClass('full-body-video');
            countWrapperHeight();
        });

        // Fix for mobile video height
        if ($('body').hasClass('mobile')) {
            var videoBoxHei = $('#video-box').height();
        }

        $(document).on("player.video.loaded", function () {
            videoDivHeight = $('.wistia-video-container').height();
            player.seekTo(0.1, true);
        });

        $(document).on("player.video.started", function () {

            $('#play-button-video').css('background', 'none');
            $('.continue-text').hide();
            videoPaused = false;
        });

        $(document).on("player.video.paused", function () {
            videoPaused = true;
            $('.video-paused-btn').show();

            var videoOffsetBottom = $('.video-absolute').offset().top + $('.video-absolute').height() - 20;

            if ($(window).scrollTop() < videoOffsetBottom)
                $('.continue-text').show();


            $('body').removeClass('full-body-video');
            countWrapperHeight();
        });

        function fullScreenVideo(that) {
            var video = that.find('video').get(0);
            $('.unmute-text').hide();

            if (btnSoundClick === true) {
                $('body').removeClass('full-body-video');
                player.pauseVideo();
                btnSoundClick = false;
            }

            if (videoPaused === true) {

                countWrapperHeight();
                $('.continue-text').show();
            } else {
                $('body').addClass('full-body-video');
                countWrapperHeight();
                $('.video-paused-btn, .btn-sound-on, .continue-text').hide();

                // Fix iOS address bar
                if ($('body').hasClass('mobile')) {
                    $('html, body').animate({
                        scrollTop: -100
                    }, 100);
                } else {
                    window.scroll(0, 0);
                }
            }
        }

        function countWrapperHeight() {
            if ($('body').hasClass('full-body-video')) {
                var videoHei = $('.wistia-video-container').height() - $('#video-box .wrapper').offset().top;
                // Push the content below the video
                $('#video-box .wrapper').height(videoHei);
            } else {
                $('#video-box .wrapper').height('auto');
            }
        }

    });
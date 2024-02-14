$(document).ready(function () {
    setTimeout(() => {
        $('.esconder').fadeIn('slow');
    }, 0 * 1 * 1000) // 30 é a quantidade em segundos do delay
})




var player;
var firstTimePlaying = true;
var isVideoLoaded = false;
var playerState;

(function () {
    $('#video').load(function () {
        player = new YT.Player('video', {
            width: '100%',
            //videoId: '_pu9wCjLXlw',

            events: {
                'onReady': function (event) {
                    $(document).trigger('player.video.loaded');
                    isVideoLoaded = true;

                    //console.log('automute');
                    player.unMute();
                    //$('.video-paused-btn').hide();
                },
                'onStateChange': function (event) {
                    playerState = event;
                    if (event.data === YT.PlayerState.PLAYING) {
                        $(document).trigger('player.video.started');
                        $('.youtube-overlay').attr('style', 'display:block!important');

                        $('.play-text').fadeOut(200);


                        if ($('body, html').width() > 1000 && firstTimePlaying === false) {
                            $('.new-video-container').addClass('new-video-fullscreen');
                        }

                        // Fix iOS YT player muted
                    }
                    if (event.data === YT.PlayerState.PAUSED) {
                        $(document).trigger('player.video.paused');
                        $('.video-pause').show();

                        $('.new-video-container').removeClass('new-video-fullscreen');

                        $('.new-video-container .video-border').height('auto');
                        $('.new-video-container .video-border, .new-video-container, .new-video-container .video, .new-video-container iframe').attr('style', '');

                        console.log('paused');
                    }
                }
            }
        });

        $(document).on('player.video.loaded', function () {
            var playButton = document.getElementById("play-button-video");
            var videoStarted = false;

            //autoPlay
            if (playButton) {
                $("#play-button-video").css('background', 'none');

            }
            videoStarted = true;
            player.playVideo();

            // play button
            if (playButton) {
                playButton.addEventListener("click", function () {
                    if (!videoStarted) {
                        $("#play-button-video").css('background', 'none');
                        videoStarted = true;
                    }

                    if (player.getPlayerState() === 1 && firstTimePlaying === false) {
                        player.pauseVideo();
                        $('.video-paused-btn, .continue-text, .pageBox').fadeIn(400);
                    } else {
                        player.unMute();
                        player.playVideo();
                        $('.pageBox').hide();
                        $('.video-paused-btn, .continue-text').fadeOut(400);
                    }

                    firstTimePlaying = false;
                });
            }
            // every second fire the playing event
            setInterval(function () {
                // broadcast the event
                $(document).trigger('player.video.playing', [{
                    playbackTime: player.getCurrentTime(),
                    videoLength: player.getDuration()
                }]);
            }, 1000);
        });
    })
})();
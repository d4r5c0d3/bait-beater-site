  // Load the YouTube IFrame API
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;
  var scenes = [
    { start: 5, end: 10 }, // scene 1
    { start: 15, end: 25 }, // scene 2
    { start: 40, end: 50 }, // scene 3
  ];
  var currentScene = 0;

  function onYouTubeIframeAPIReady() {
    player = new YT.Player("video-background", {
      height: "100%",
      width: "100%",
      videoId: "R4EBYquF4vQ", // e.g. 'dQw4w9WgXcQ'
      playerVars: {
        autoplay: 1,
        controls: 0,
        showinfo: 0,
        modestbranding: 1,
        mute: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }

  function onPlayerReady() {
    playScene(currentScene);
  }

  function onPlayerStateChange(e) {
    if (e.data === YT.PlayerState.PLAYING) {
      // Check every 200ms if we passed the scene's end
      checkSceneInterval = setInterval(() => {
        var time = player.getCurrentTime();
        if (time >= scenes[currentScene].end) {
          nextScene();
        }
      }, 200);
    }
    if (e.data === YT.PlayerState.PAUSED || e.data === YT.PlayerState.ENDED) {
      clearInterval(checkSceneInterval);
    }
  }

  function playScene(index) {
    var scene = scenes[index];
    player.seekTo(scene.start);
    player.playVideo();
  }

  function nextScene() {
    currentScene++;
    if (currentScene >= scenes.length) {
      currentScene = 0; // loop back
    }
    playScene(currentScene);
  }
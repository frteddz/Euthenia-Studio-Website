let player: YT.Player | null = null;
let apiReady = false;
let pendingStart = false;

function loadAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT && apiReady) { resolve(); return; }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const first = document.getElementsByTagName('script')[0];
    first.parentNode!.insertBefore(tag, first!);
    (window as any).onYouTubeIframeAPIReady = () => {
      apiReady = true;
      resolve();
    };
  });
}

export function setVolume(v: number) {
  if (player && player.setVolume) {
    player.setVolume(Math.round(v));
  }
}

export async function startAmbient(elementId: string) {
  if (player) {
    player.playVideo();
    return;
  }
  pendingStart = true;
  await loadAPI();
  if (!pendingStart) return;
  player = new YT.Player(elementId, {
    videoId: '-YUYLbjl7Sk',
    playerVars: {
      autoplay: 1,
      loop: 1,
      controls: 0,
      disablekb: 1,
      enablejsapi: 1,
      playlist: '-YUYLbjl7Sk',
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      fs: 0,
    },
    events: {
      onReady: (e) => {
        e.target.setVolume(30);
        e.target.playVideo();
      },
      onStateChange: (e) => {
        if (e.data === YT.PlayerState.ENDED) {
          e.target.playVideo();
        }
      },
    },
  });
}

export function stopAmbient() {
  pendingStart = false;
  if (player) {
    player.stopVideo();
  }
}

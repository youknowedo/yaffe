const PLAYBACK_RATE_MAX = 16;
const IS_SKIP_AD = true;

let currentMuted = false;
let currentPlaybackRate = 1;

const movie_player = document.querySelector<HTMLDivElement>('#movie_player');
const video = document.querySelector<HTMLVideoElement>('#movie_player video');

window.addEventListener('load', function () {
  run();
});

function run() {
  if (!movie_player || !video) {
    setTimeout(run, 100);
    return;
  }

  new MutationObserver(adSpeedup).observe(movie_player, {
    attributeFilter: ['class', 'style'],
    attributes: true,
    subtree: true,
  });
}

const adSpeedup: MutationCallback = (mutations) => {
  if (!movie_player || !video) return;

  if (IS_SKIP_AD) {
    mutations.forEach((mutation) => {
      if (mutation.attributeName !== 'style') return;

      clickSkipButton([
        {
          container: '.ytp-ad-skip-button-container',
          button: '.ytp-ad-skip-button-modern',
        },
        { container: '.ytp-skip-ad', button: '.ytp-skip-ad-button' },
      ]);
    });
  }
  if (video.playbackRate !== PLAYBACK_RATE_MAX) {
    currentMuted = video.muted;
    currentPlaybackRate = video.playbackRate;
  }
  const isAdShowing =
    movie_player.classList.contains('ad-showing') ||
    movie_player.classList.contains('ad-interrupting');
  video.muted = isAdShowing ? true : currentMuted;
  video.playbackRate = isAdShowing ? PLAYBACK_RATE_MAX : currentPlaybackRate;
};

const clickSkipButton = (
  classCombinations: {
    container: string;
    button: string;
  }[],
) => {
  for (const { container, button } of classCombinations) {
    const containerElement = document.querySelector<HTMLElement>(container);
    if (containerElement && containerElement.style.display !== 'none') {
      const buttonElement = containerElement.querySelector<HTMLButtonElement>(
        container + ' > ' + button,
      );
      if (buttonElement) {
        buttonElement.click();
      }
    }
  }
};

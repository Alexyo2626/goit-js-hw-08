import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(videoTimeStop, 1000));

function videoTimeStop(timeupdate) {
  let clickPause = timeupdate.seconds;
  localStorage.setItem('videoplayer-current-time', clickPause);
}

const timeLastStop = localStorage.getItem('videoplayer-current-time');

player
  .setCurrentTime(timeLastStop)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });

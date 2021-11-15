import throttle from 'lodash.throttle';
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const onUpdate = data => {
  localStorage.setItem('videoplayer-current-time', data.seconds);
};
const time = localStorage.getItem('videoplayer-current-time');
if (time) {
  player.setCurrentTime(time);
}

player.on('timeupdate', throttle(onUpdate, 1000));

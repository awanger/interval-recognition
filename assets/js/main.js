// test stuff
sample = {
  notes: [
    {pitch: 60, startTime: 0.0, endTime: 2.0},
    {pitch: 61, startTime: 2.0, endTime: 4.0}
  ],
  totalTime: 4,
  code: 'm2'
};

// player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
player = new mm.Player();
function playSample() {
  player.start(sample);
}

playSample();

// ma code goes here
const speakerBtn = document.querySelector('#speaker-btn');
speakerBtn.addEventListener("click", playSample)
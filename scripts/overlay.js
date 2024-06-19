
function focusImage(src) {
  const fullscreenOverlay = document.getElementById('fullscreenOverlay');
  const fullscreenImage = document.getElementById('fullscreenImage');
  fullscreenImage.src = src;
  fullscreenOverlay.style.display = 'flex';
}

function hideFullscreenImage() {
  const fullscreenOverlay = document.getElementById('fullscreenOverlay');
  fullscreenOverlay.style.display = 'none';
}

function buildOverLay(){
  const overlay = `
    <div class="fullscreen-overlay" id="fullscreenOverlay">
      <button class="close-button" id="closeButton">X</button>
      <img id="fullscreenImage" src="" alt="Fullscreen Image"/>
    </div>`;
  
  return overlay;
}

function setupOverylay() {
    const images = document.querySelectorAll('.slides img');

    images.forEach(image => {
        image.addEventListener('click', ()=> focusImage(image.src))
    });

  document.querySelector('main').innerHTML += buildOverLay();

  const overlay = document.querySelector('.fullscreen-overlay');
  overlay.addEventListener('click', hideFullscreenImage);

  document.getElementById('closeButton').addEventListener('click', hideFullscreenImage);
}

setupOverylay();
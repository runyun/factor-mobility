

window.onload = async function () {
  const data = await readJsonByClassification('Extrusion');

  new Slideshow(data[0], document.querySelector('#extrusionSection'));
  new Slideshow(data[1], document.querySelector('#safelockSection'));
  new Slideshow(data[2], document.querySelector('#rehacareSection'));
// setupOverylay();
};
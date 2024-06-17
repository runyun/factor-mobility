
window.onload = async function () {
  const data = await readJsonByClassification('Equipment');

  new Slideshow(data[0], document.querySelector('#sawingSection'));
  new Slideshow(data[1], document.querySelector('#cncSection'));
  new Slideshow(data[2], document.querySelector('#qcSection'));
};
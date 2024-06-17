window.onload = async function () {
    const data = await readJsonByClassification('Forge');
  
    new Slideshow(data[0], document.querySelector('#forgingSection'));
};  
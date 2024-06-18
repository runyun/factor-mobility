window.onload = async function () {
    const data = await readJsonByClassification('Forging');
  
    new Slideshow(data[0], document.querySelector('#forgingSection'));
};  
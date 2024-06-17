
window.onload = async function () {
    const data = await readJsonObjOther();
  
    new Slideshow(data, document.querySelector('#hwhySection'));
};  

window.onload = async function () {
    const data = await readAllProducts();
    let returnData = [];
    data.forEach(products => {
        products.images.forEach(image =>{
            let product = {}
            product.images = image;
            if(products.classification == 'Extrusion'){
                product.url = "./product-extrusion.html";
            }else{
                product.url = "./product-forging.html";
            }
            returnData.push(product);
        })
    });
  
    new Slideshow(returnData, document.querySelector('#productsSection'), true);
};  

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
            product.url += "#" + products.htmlId;
            returnData.push(product);
        })
    });

    let messedData = returnData.sort(() => Math.random() - 0.5);

    new Slideshow(messedData, document.querySelector('#productsSection'), true);
};  
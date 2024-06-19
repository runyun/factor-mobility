class Slideshow {
  constructor(data, parentElement, isHome = false) {
    this.data = data;
    this.currentIndex = 0;
    this.intervalId = null;
    this.parentElement = parentElement;
    this.isHome = isHome;

    this.setupSlideshow();
    this.showFirstSlide();
    this.startSlideshow();
    this.addSwipeListener();
  }

  setupSlideshow() {
    if(!this.data){return;}
    const products = this.data;
    
    const slideShowContainer = document.createElement('div');
    slideShowContainer.classList.add('slideshow-container');

    if(products.name) {
      const title = document.createElement('h3');
      title.textContent = products.name + ' ' + 'Examples';
      this.parentElement.appendChild(title);
    }

    // Slide
    const slideContainer = document.createElement('div');

    if(this.isHome){
      this.buildHomeSlide(products, slideContainer);

    }else{
      this.buildSlide(products, slideContainer)
    }
    slideShowContainer.appendChild(slideContainer);


    // Dot
    const dotCount = this.isHome? products.length :products.images.length;
    const dotContainer = document.createElement('div');
    for (let index = 0; index < dotCount; index++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      dotContainer.appendChild(dot);
    }
    slideShowContainer.appendChild(dotContainer);


    // Buttons
    this.prevButton = document.createElement('button');
    this.prevButton.innerText = '<';
    this.prevButton.classList.add('button', 'prev');
    this.prevButton.addEventListener('click', () => this.nextImage(-1));

    this.nextButton = document.createElement('button');
    this.nextButton.innerText = '>';
    this.nextButton.classList.add('button', 'next');
    this.nextButton.addEventListener('click', () => this.nextImage());

    slideShowContainer.appendChild(this.prevButton);
    slideShowContainer.appendChild(this.nextButton);

    this.parentElement.appendChild(slideShowContainer);
  }

  showFirstSlide() {
    const slides = this.parentElement.querySelectorAll('.slides');
    let dots = this.parentElement.querySelectorAll(".dot");

    if (slides.length > 0) {
      slides[0].classList.add('active');
      slides[0].style.display = "block";
      dots[0].classList.add('active');
    }
  }

  buildHomeSlide(products, slideContainer){
    products.forEach(product => {
      const slideDiv = document.createElement('div');
      slideDiv.classList.add('slides', 'fade');

      const img = document.createElement('img');
      img.src = `/images/${product.images}.jpg`;

      const link = document.createElement('a');
      link.href = product.url;

      link.appendChild(img)

      slideDiv.appendChild(link);
      slideContainer.appendChild(slideDiv);
    });
  }


  buildSlide(products, slideContainer){
    products.images.forEach(productImage => {
      const slideDiv = document.createElement('div');
      slideDiv.classList.add('slides', 'fade');

      const img = document.createElement('img');
      img.src = `/images/${productImage}.jpg`;
      img.addEventListener('click', ()=> focusImage(img.src))

      slideDiv.appendChild(img);
      slideContainer.appendChild(slideDiv);
    });
  }



  startSlideshow() {
    this.intervalId = setInterval(() => this.nextImage(), 2000);
  }

  resetSlideshowTimer() {
    this.stopSlideshow();
    this.startSlideshow();
  }

  nextImage(index = null) {
    let dots = this.parentElement.querySelectorAll(".dot");
    const slides = this.parentElement.querySelectorAll('.slides');

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      slides[i].classList.remove('active');
    }

    for (let i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
    }

    if (index != null) {
      this.currentIndex = (this.currentIndex + index + slides.length) % slides.length;
    } else {
      this.currentIndex = (this.currentIndex + 1) % slides.length;
    }

    slides[this.currentIndex].classList.add('active');
    slides[this.currentIndex].style.display = "block";

    dots[this.currentIndex].classList.add('active');

    this.resetSlideshowTimer();
  }

  stopSlideshow() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  addSwipeListener() {
    let startX, startY, endX, endY;

    this.parentElement.addEventListener('touchstart', (event) => {
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    });

    this.parentElement.addEventListener('touchmove', (event) => {
      endX = event.touches[0].clientX;
      endY = event.touches[0].clientY;
    });

    this.parentElement.addEventListener('touchend', () => {
      const deltaX = endX - startX;
      const deltaY = endY - startY;

      if (endX != 0 && endY !=0 && Math.abs(deltaX) > Math.abs(deltaY)) {
        
        if (deltaX > 0) {
          this.nextImage(-1);

        } else {
          this.nextImage();
        }
        endX = 0;
        endY = 0;
      }
    });
  }
}

async function readJsonByClassification(classification) {
  try {
    const response = await fetch('/data/products.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const filteredData = data.products.filter(products => products.classification == classification);
    return filteredData;
  } catch (error) {
    console.error('Error fetching or parsing JSON file:', error);
  }
}

async function readJsonObjOther() {
  try {
    const response = await fetch('/data/products.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const filteredData = data.Other;
    return filteredData;
  } catch (error) {
    console.error('Error fetching or parsing JSON file:', error);
  }
}

async function readAllProducts() {
  try {
    const response = await fetch('/data/products.json');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.products.filter(products => products.classification == 'Extrusion' || products.classification == 'Forging');


  } catch (error) {
    console.error('Error fetching or parsing JSON file:', error);
  }
}


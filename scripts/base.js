function renderYear(){
    let copyrightYear = document.querySelector('#copyrightYear');
    copyrightYear.textContent = new Date().getFullYear();
}

const companyMail = 'Info@factormobility.com';
function displayMail(){
    let mail = document.querySelectorAll('.mail');
    
    if(mail) {
        mail.forEach(x => x.textContent = companyMail)
    }
}

const companyAddress= 'No.82, Ln. 207, Sec. 2, Liuqiao Rd. Yuanlin City, Changhua County 510037 Taiwan (R.O.C.)';
function displayAddress() {
    let address = document.querySelectorAll('.address');
    if(address) {
        address.forEach(x => x.textContent = companyAddress)
    }
}


function wayfinding(){
    let navItems = document.querySelectorAll('nav a');
    let currentURL = window.location.href;

    navItems.forEach(item => {

        let pageName = getPageName(item.href);

        if(currentURL.indexOf(pageName) != -1){
            item.classList.add('active');
        }
    });
}

function toggleMenu(){

    let menu = document.querySelector('#hamburger');
    let nav = document.querySelector('nav');

    menu.addEventListener('click', () => {
        
        if(menu.textContent == '☰'){
            menu.textContent = '𝗫';
        }else{
            menu.textContent = '☰';
        }

        nav.classList.toggle('show');
    });
}


function switchDarkmode(){
    let body = document.querySelector('body');
    let switcher = document.querySelector('#darkmodeSwitcher');

    switcher.addEventListener('click', () => {
        if (switcher.textContent == '☀'){
            switcher.textContent = '☾'
            localStorage.setItem('isDarkmode', false)

        }else {
            switcher.textContent = '☀'
            localStorage.setItem('isDarkmode', true)
        }

        body.classList.toggle('dark');
    });
}

function setDarkMode() {
    let body = document.querySelector('body');
    let switcher = document.querySelector('#darkmodeSwitcher');
    let isDarkmode = localStorage.getItem('isDarkmode');

    if (isDarkmode == 'true'){
        if(isDarkmode && !body.classList.contains('dark')) {
            body.classList.toggle('dark');
            switcher.textContent = '☀'
        }
    }
}

function getPageName(url){
    if(!url) {
        return '';
    }
    let lastSlash = url.lastIndexOf('/');
    let lastDot = url.lastIndexOf('.');
    let pageName = url.substr(lastSlash + 1, lastDot - lastSlash - 1);

    return pageName;
}

function setPageTitle(url) {
    const title = document.querySelector('title').textContent;
    let pageName = getPageName(url);

    pageName = pageName.replace('-',' ');

    document.querySelector('title').textContent = `${title} - ${pageName}`;
}

async function loadCommonHTMLelement(){
    const head = document.querySelector('head');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    const headTemplate = await loadTemplate('../partial/head.html');
    const headerTemplate = await loadTemplate('../partial/header.html');
    const footerTemplate = await loadTemplate('../partial/footer.html');

    head.insertAdjacentHTML("afterbegin", headTemplate);
    header.insertAdjacentHTML("afterbegin", headerTemplate);
    footer.insertAdjacentHTML("afterbegin", footerTemplate);

    renderYear();
    displayMail();
    toggleMenu();
    wayfinding();
    switchDarkmode();
    setDarkMode();
    displayAddress();
    setPageTitle(window.location.href);
}
loadCommonHTMLelement()

async function loadTemplate(path) {
    const res = await fetch(path);
    const template = await res.text();
    return template;
}

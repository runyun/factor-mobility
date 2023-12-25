function renderYear(){
    let copyrightYear = document.querySelector('#copyrightYear');
    copyrightYear.textContent = new Date().getFullYear();
}
renderYear();


function wayfinding(){
    let navItems = document.querySelectorAll('nav a');
    navItems.forEach(item => {
        
        if(item.href.indexOf('#') != -1){
            item.classList.add('active');
        }
    });
}
wayfinding();

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
toggleMenu();


function darkmode(){
    let body = document.querySelector('body');
    let switcher = document.querySelector('#darkmodeSwitcher')

    switcher.addEventListener('click', () => {
        if (switcher.textContent == '☀'){
            switcher.textContent = '☾'

        }else {
            switcher.textContent = '☀'
        }

        body.classList.toggle('dark');
    });
}
darkmode();

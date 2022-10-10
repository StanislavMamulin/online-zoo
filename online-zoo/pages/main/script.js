const hamburgerMenu = document.querySelector('.hamburger');
const nav = document.querySelector('nav');
const navContent = document.querySelector('#nav-content');
const logoContainer = document.querySelector('#logo-container');
const logoDescription = document.querySelector('#logo-description');
const menu = document.querySelector(".menu");
const closeMenuButton = document.querySelector("#close-menu");
const veil = document.querySelector('#veil')

const menusOpenElements = [hamburgerMenu, nav, navContent, logoContainer, logoDescription, closeMenuButton];
const closeMenuElements = [closeMenuButton, veil];

hamburgerMenu.addEventListener('click', () => {
    menusOpenElements.forEach(el => el.classList.toggle('menu-opened'));
    menu.style.display = 'flex';
    hamburgerMenu.style.display = 'none';
    veil.style.display = 'block';
})

closeMenuElements.forEach(el => {
    el.addEventListener('click', () => {
        menusOpenElements.forEach(el => el.classList.toggle('menu-opened'));
        menu.style.display = 'none';
        hamburgerMenu.style.display = 'block';
        veil.style.display = 'none';
    })
})

import header from './Home.js';
import menu from './Menu.js';
import contact from './Contact.js';

const homeBtn = document.getElementById('home');
const MenuBtn = document.getElementById('about-us');
const ContactBtn = document.getElementById('contact-btn');

const contentArea = document.getElementById('main-area');

function renderContent(content){
    contentArea.innerHTML = '';
    contentArea.appendChild(content);
};

homeBtn.addEventListener('click', () =>{
    renderContent(header)
});

MenuBtn.addEventListener('click', () =>{
    renderContent(menu)
});

ContactBtn.addEventListener('click', () =>{
    renderContent(contact)
});

renderContent(header);
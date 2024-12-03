const menu = document.getElementById('menu');

const menu1 = document.createElement('h3');
menu1.textContent = 'Fufu with groundnut soup';

const menu2 = document.createElement('h3');
menu2.textContent = 'Banku with groundnut soup';

const menu3 = document.createElement('h3');
menu3.textContent = 'Jollof rice with roasted chicken';

const menu4 = document.createElement('h3');
menu4.textContent = 'Wakye with shito';

menu.appendChild(menu1)
menu.appendChild(menu2)
menu.appendChild(menu3)
menu.appendChild(menu4)

export default menu;


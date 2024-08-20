console.dir(document);
console.log(document.URL);
console.log(document);

// document.title = 123;

console.log(document.all);
console.log(document.doctype);
console.log(document.head);
console.log(document.body);
console.log(document.all[10]);
// document.all[10].textCound = 'Hello';
console.log(document.forms);
console.log(document.images);

// GET ELEMENT BY ID
// console.log(document.getElementById('header-title'))
var headerTitle = document.getElementById('header-title');
console.log(headerTitle);
headerTitle.textContent = 'Hello';
headerTitle.innerText = 'Goodbye';

// Diff btn the textContent and innerText is that innerText pays 
// attention to the styling

headerTitle.innerHTML = '<h3>Hello</h3>';
headerTitle.style.borderBottom = 'solid 3px #000';

// GET ELEMENTS BY CLASS NAME
var items = document.getElementsByClassName('list-group-item');
console.log(items);
console.log(items[1]);
items[1].textContent = 'Hey';

// Note that items.style.backgroundColor = '#000' 
// gives an error cos you have to loop through the elements first

for(var i = 0; i < items.length; i++ ){
    items[i].style.backgroundColor = '#f4f4f4';
}

// GET ELEMENT BY TAG NAME
var li = document.getElementsByTagName('li');
console.log(li);
console.log(li[1]);
li[1].textContent = 'Hey';

for(var i = 0; i < li.length; i++ ){
    li[i].style.backgroundColor = '#f4f4f4';
}

// QUERY SELECTOR
var header = document.querySelector('main-header');
header.style.borderBottom = 'solid 4px #ccc';

var input = document.querySelector('input');
input.value = 'Hello World';

var submit = document.querySelector('input[type="submit"]');
submit.value = "SEND"

// CSS Psuedo selectors can also be used

// QUERYSELECTORALL
var titles = document.querySelectorAll('.title');

console.log(titles);
titles[0].textContent = 'Hello';



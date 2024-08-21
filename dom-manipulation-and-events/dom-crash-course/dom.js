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
// header.style.borderBottom = 'solid 4px #ccc';

var input = document.querySelector('input');
input.value = 'Hello World';

var submit = document.querySelector('input[type="submit"]');
submit.value = "SEND"

// CSS Psuedo selectors can also be used

// QUERYSELECTORALL
var titles = document.querySelectorAll('.title');

console.log(titles);
titles[0].textContent = 'Hello';


// JS DOM PART 2
// TRAVERSING THE DOM
var itemList = document.querySelector("#items");

// parentNode - same as parentElement
console.log(itemList.parentNode);
itemList.parentNode.style.backgroundColor = "#f4f4f4";

// childNodes / children
console.log(itemList.childNodes);
console.log(itemList.children);
itemList.children[1].style.backgroundColor = 'pink';

// firstElementChild
console.log(itemList.firstElementChild);

// lastElementChild
console.log(itemList.lastElementChild);

// siblings - null since there is no next element
console.log(itemList.nextElementSibling);

// prev sibling
console.log(itemList.previousElementSibling);

// createElement
var newDiv = document.createElement('div');
console.log(newDiv);

// add id
newDiv.id = 'div-id';

// add className
newDiv.className = 'hello';

// add attr
newDiv.setAttribute('title', 'Hello Div');

var newDivText = document.createTextNode('Hello World');

// add text to newDiv
newDiv.appendChild(newDivText);

var container = document.querySelector('header .container');
var h1 = document.querySelector('header h1');

container.insertBefore(newDiv, h1);
 
newDiv.style.fontSize = '20px';


// EVENTS
var button = document.getElementById("button");
button.addEventListener('click', buttonClick);

function buttonClick(e){
    // console.log('Button Clicked')
    // document.getElementById('header-title').textContent = 'Changed';
    console.log(e);
    console.log(e.target.id);
    console.log(e.target.className);
    console.log(e.type);
    console.log(e.clientX);

    console.log(e.altKey);
    console.log(e.ctrKey);
    console.log(e.shiftKey);

    console.log('EVENT TYPE: ' +e.type);
}

// event types - click, dbclick, mousedown, mouseup, etc

var box = document.getElementById('box');
box.addEventListener('mouseenter', runEvent);
box.addEventListener('mouseleave', runEvent);
box.addEventListener('mousemove', runEvent);

var itemInput = document.querySelector('input[type="text"]');
var form = document.querySelector('form');

form.addEventListener('submit', runEvent);

itemInput.addEventListener('keydown', runEvent);
// itemInput.addEventListener('keyup', runEvent);
// itemInput.addEventListener('keypress', runEvent);
// Others incluce - focus, blur, cut, paste, etc

function runEvent(e){
    e.preventDefault();
    console.log('EVENT TYPE:' +e.type);
    console.log(e.target.value);
    box.style.backgroundColor = "rgb("+e.offsetX+", "+e.offsetY+", 40)";
}



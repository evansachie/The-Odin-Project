// your JavaScript file
const container = document.querySelector("#container");

const content = document.createElement("div");
content.classList.add("content");
content.textContent = "This is the glorious text-content!";

container.appendChild(content);

// red paragraph text
const pContent = document.createElement("p");
pContent.textContent = "Hey I’m red!";
pContent.style.color = "red";
container.appendChild(pContent);

// blue h3 text
const h3Content = document.createElement("h3");
h3Content.textContent = "I’m a blue h3!";
h3Content.style.color = "red";
h3Content.style.color = "blue";
container.appendChild(h3Content);

// div with block border and pink background
const newDiv = document.createElement("div");
newDiv.style.border = '1px solid black';
newDiv.style.backgroundColor = 'pink';


// h1 inside newDiv
const h1Content = document.createElement("h1");
h1InDiv.textContent = "I'm in a div";
newDiv.appendChild(h1InDiv);

// p inside the new div
const pInDiv = document.createElement("p");
pInDiv.textContent = "ME TOO!";
newDiv.appendChild(pInDiv);

// Add the newDiv to the container
container.appendChild(newDiv);
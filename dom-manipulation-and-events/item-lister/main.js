var form = document.getElementById("addForm");
var itemList = document.getElementById("items");
var filter = document.getElementById('filter');

//form submit event
form.addEventListener('submit', addItem);

// item event
itemList.addEventListener('click', deleteItem);

// filter event
filter.addEventListener('keyup', filterItems);

// add item
function addItem(e){
    e.preventDefault();

    var newItem = document.getElementById("item").value;

    // Create new li element
    var li = document.createElement('li');
    li.className = 'list-group-item';
    li.appendChild(document.createTextNode(newItem));

    // delete button
    var deleteBtn = document.createElement('button');

    // Add class to del btn
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';

    // Append text node
    deleteBtn.appendChild(document.createTextNode('X'));

    // Appebd button to li
    li.appendChild(deleteBtn);

    // Add li to item list
    itemList.appendChild(li)
}

// function to delete item
function deleteItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are You Sure you want the delete the item?')){
            var li = e.target.parentElement;
            itemList.removeChild(li);
        }
    }
}

// function to filter items
function filterItems(e){
    var text = e.target.value.toLowerCase();
    var items = document.getElementsByTagName('li');

    // convert to an array
    Array.from(items).forEach(function(item){
        var itemName = item.firstChild.textContent.toLowerCase();
        if(itemName.indexOf(text) !== -1){
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
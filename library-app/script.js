const mylibrary = [];

class Book{
  constructor(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead(){
    this.read = !this.read;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  mylibrary.push(book);
  displayBooks();
}

function displayBooks(book, index){
  const container = document.getElementById("libraryContainer");
  container.innerHTML = '';

  mylibrary.forEach((book, index) =>{
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.setAttribute('data-index', index);

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>by ${book.author}</p>
      <p>${book.pages} pages</p>
      <p class="${book.read ? 'read' : 'unread'}">
          ${book.read ? 'Read' : 'Not read yet'}
      </p>
      <div class="book-actions">
          <button class="toggle-read-btn" onclick="toggleReadStatus(${index})">
              Toggle Read
          </button>
          <button class="delete-btn" onclick="removeBook(${index})">
              Delete
          </button>
      </div>
  `;

  container.appendChild(bookCard);
  });
}

function removeBook(index){
  mylibrary.splice(index, 1);
  displayBooks();
}

function toggleReadStatus(index){
  mylibrary[index].toggleRead();
  displayBooks();
}

// Dialog handling
const dialog = document.getElementById('bookDialog');
const showButton = document.getElementById('newBookBtn');
const form = document.getElementById('bookForm');

showButton.addEventListener('click', () => {
  dialog.showModal();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = parseInt(document.getElementById('pages').value);
  const read = document.getElementById('read').checked;

  addBookToLibrary(title, author, pages, read);

  form.reset();
  dialog.close();
});


addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, true);
addBookToLibrary('The Catcher in the Rye', 'J.D. Salinger', 277, false);

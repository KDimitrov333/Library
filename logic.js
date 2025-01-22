const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return title + " by " + author + ", " + pages + ", " + read;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBookFromLibrary(book) {
    const index = myLibrary.indexOf(book);
    myLibrary.splice(index, 1);
}

function displayLibrary() {
    const table = document.querySelector("#library");
    const existingRows = document.querySelectorAll(".book_row");
    existingRows.forEach(row => row.remove());

    myLibrary.forEach(book => {
        const bookRow = document.createElement("tr");
        bookRow.classList.add("book_row");

        const titleCell = document.createElement("td");
        titleCell.textContent = book.title;
        bookRow.appendChild(titleCell);

        const authorCell = document.createElement("td");
        authorCell.textContent = book.author;
        bookRow.appendChild(authorCell);

        const pagesCell = document.createElement("td");
        pagesCell.textContent = book.pages;
        bookRow.appendChild(pagesCell);

        const readCell = document.createElement("td");
        readCell.textContent = book.read;
        bookRow.appendChild(readCell);

        const removeBtnCell = document.createElement("td");
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove from Library";
        removeBtn.addEventListener("click", () => {
            removeBookFromLibrary(book);
            displayLibrary();
        });
        removeBtnCell.appendChild(removeBtn);
        bookRow.appendChild(removeBtnCell);

        table.appendChild(bookRow);
    });
}

function addBookFromForm(evt) {
    evt.preventDefault(); // Prevent form submission from refreshing the page

    // Get input values
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.value;

    // Validate form inputs (optional)
    if (title === "" || author === "" || pages === "" || read === "") {
        alert("Please fill out all fields!");
        return;
    }

    // Create a new Book object and add it to the library
    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    // Refresh the table display
    displayLibrary();

    // Clear the form inputs
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.value = "";

    // Close the dialog
    dialog.close();
}

const table = document.querySelector("#library");

const book1 = new Book("Dune", "Frank Herbert", "864", "already read");
const book2 = new Book("The Witcher: The Last Wish", "Andrzej Sapkowski", "450", "already read");

addBookToLibrary(book1);
addBookToLibrary(book2);
displayLibrary();

const dialog = document.querySelector("dialog");

const showButton = document.querySelector("#new_book");
showButton.addEventListener("click", () => {
    dialog.showModal();
});

const closeButton = document.querySelector("dialog button");
closeButton.addEventListener("click", () => {
    dialog.close();
});

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", addBookFromForm, false);
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

        const updateCell = document.createElement("td");
        const updateBtn = document.createElement("button");
        updateBtn.textContent = "Update read status";
        updateBtn.addEventListener("click", () => {
            const dialogUpdate = document.createElement("dialog");

            const closeUpdateButton = document.createElement("button");
            closeUpdateButton.textContent = "Close";
            closeUpdateButton.classList.add("close-update-button");
            closeUpdateButton.addEventListener("click", () => {
                dialogUpdate.close();
                dialogUpdate.remove();
            });
            dialogUpdate.appendChild(closeUpdateButton);

            const labelUpdate = document.createElement("p");
            labelUpdate.textContent = "Update your read status for the book!";
            dialogUpdate.appendChild(labelUpdate);

            const updateForm = document.createElement("form");
            updateForm.method = "dialog";

            const updateInput = document.createElement("input");
            updateInput.type = "text";
            updateInput.placeholder = "Enter new read status";
            updateForm.appendChild(updateInput);

            const updateConfirmBtn = document.createElement("button");
            updateConfirmBtn.textContent = "Update";
            updateConfirmBtn.type = "submit";
            updateConfirmBtn.addEventListener("click", () => {
                book.read = updateInput.value;
                displayLibrary();
                dialogUpdate.close();
                dialogUpdate.remove();
            });
            updateForm.appendChild(updateConfirmBtn);

            dialogUpdate.appendChild(updateForm);

            document.body.appendChild(dialogUpdate);
            dialogUpdate.showModal();
        });
        updateCell.appendChild(updateBtn);

        bookRow.appendChild(updateCell);

        const removeCell = document.createElement("td");
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove from Library";
        removeBtn.addEventListener("click", () => {
            removeBookFromLibrary(book);
            displayLibrary();
        });
        removeCell.appendChild(removeBtn);
        bookRow.appendChild(removeCell);

        table.appendChild(bookRow);
    });
}

function addBookFromForm(evt) {
    evt.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.value;

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
    dialogNewBook.close();
}

const table = document.querySelector("#library");

const book1 = new Book("Dune", "Frank Herbert", "864", "already read");
const book2 = new Book("The Witcher: The Last Wish", "Andrzej Sapkowski", "450", "already read");

addBookToLibrary(book1);
addBookToLibrary(book2);
displayLibrary();

const dialogNewBook = document.querySelector("#dialogNewBook");

const showButton = document.querySelector("#new_book");
showButton.addEventListener("click", () => {
    dialogNewBook.showModal();
});

const closeButton = document.querySelector("dialog button");
closeButton.addEventListener("click", () => {
    dialogNewBook.close();
});

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

const submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", addBookFromForm, false);
const myLibrary = [];

function Book(title, author, pages, isRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.info = function() {
        if(this.isRead){
            return this.title + " by " + this.author + ", " + this.pages + ", already read";
        }
        else{
            return this.title + " by " + this.author + ", " + this.pages + " Pages" + ", not read yet";
        }
    };
}

function displayLibrary(){
    const libraryDiv = document.getElementById("library");
    libraryDiv.innerHTML = '';

    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const title = document.createElement("h2");
        title.textContent = book.title;
        card.appendChild(title);

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;
        card.appendChild(author);

        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;
        card.appendChild(pages);

        const readStatus = document.createElement("p");
        readStatus.textContent = book.isRead ? 'Read' : 'Not read';
        readStatus.classList.add('read-status');
        if(!book.isRead) {
            readStatus.classList.add('unread');
        }
        card.appendChild(readStatus);


        libraryDiv.appendChild(card);
    });
}


myLibrary.push(new Book("The Hobbit", "J.R.R Tolien", 295, false));
myLibrary.push(new Book("1984", "George Orwell", 328, false));
myLibrary.push(new Book("Die Verwandlung", "Franz Kafka", 201, true));

window.onload = displayLibrary;
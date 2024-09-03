const myLibrary = [];

function Book(title, author, pages, isRead, rating = 0){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.rating = rating;

    this.info = function() {
        if(this.isRead){
            return this.title + " by " + this.author + ", " + this.pages + ", already read";
        }
        else{
            return this.title + " by " + this.author + ", " + this.pages + " Pages" + ", not read yet";
        }
    };
}

Book.prototype.changeReadStatus = function() {
    this.isRead = !this.isRead;
    if(!this.isRead){
        this.rating = 0;
    }
    displayLibrary();
};

function addBookToLibrary(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const isRead = document.getElementById('isRead').checked;

    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);

    displayLibrary();
    clearForm();
    toggleFormVisibility();
}

function displayHeader(){
    
    

    const statsDiv = document.getElementById("stats");
    statsDiv.innerHTML = '';

    const statsTitle = document.createElement("h2");
    statsTitle.textContent = 'Stats'
    statsDiv.appendChild(statsTitle);
    
    statsDiv.appendChild(document.createElement('hr'));
    
    const booksOwned = document.createElement("p");
    booksOwned.textContent = (`${myLibrary.length} Books owned`);
    statsDiv.appendChild(booksOwned);

    const booksRead = myLibrary.filter(p => p.isRead === true);

    const booksReadP = document.createElement("p");
    booksReadP.textContent = (`${booksRead.length} Books read (${(( 100* booksRead.length ) / myLibrary.length).toFixed(2)} %)`);
    statsDiv.appendChild(booksReadP);

    const avgRating = document.createElement("p");
    avgRating.textContent = `Average Rating: ${ calculateAverageRating().toFixed(2) }`;
    statsDiv.appendChild(avgRating);

    statsDiv.appendChild(document.createElement('hr'));

}

function displayLibrary(){
    const libraryDiv = document.getElementById("library");
    libraryDiv.innerHTML = '';

    myLibrary.forEach((book, index) => {
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

        const buttonDiv = document.createElement("div");
        buttonDiv.classList.add('button-div');
        card.appendChild(buttonDiv);

        const toggleReadButton = document.createElement('button');
        toggleReadButton.innerHTML = book.isRead ? '<span class="iconify" data-icon="mdi-bookmark-remove-outline"></span>Mark as unread' : '<span class="iconify" data-icon="mdi-bookmark-check-outline"></span>Mark as read';
        toggleReadButton.classList.add('toggle-read-button');
        toggleReadButton.addEventListener('click', () => {
            book.changeReadStatus();
        });
        buttonDiv.appendChild(toggleReadButton);

        const removeButton = document.createElement('button');
        removeButton.innerHTML = '<span class="iconify" data-icon="mdi-trash-can-outline"></span>Remove';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            displayLibrary();
        });
        buttonDiv.appendChild(removeButton);

        if(book.isRead){
            const starRatingDiv = document.createElement('div');
            starRatingDiv.classList.add('star-rating');

            for (let i = 1; i <= 5; i++) {
                const starDiv = document.createElement('div');
                const star = document.createElement('span');
                star.classList.add('iconify');
                star.setAttribute('data-icon','mdi-star')
                star.classList.add('star');
                if(i <= book.rating){
                    star.classList.add('selected');
                }
                starDiv.addEventListener('click', () => {
                    book.rating = i;
                    updateStarRating(starRatingDiv, book.rating);
                });
                starDiv.appendChild(star);
                starRatingDiv.appendChild(starDiv);
            }
            card.appendChild(starRatingDiv);
        }

        libraryDiv.appendChild(card);
    });
    displayHeader();
}

function calculateAverageRating() {
    let totalRatingValue = 0;
    let bookNumber = 0;
    myLibrary.forEach(book => {
        if (book.isRead === true && book.rating != 0)
        {
            totalRatingValue += book.rating;
            bookNumber++;
        }
        
    });
    if(bookNumber != 0) {
        return totalRatingValue / bookNumber
    } else {
        return 0;
    }
    
}

function updateStarRating(starRatingDiv, rating) {
    const stars = starRatingDiv.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if(index < rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
        displayHeader();
    });
}

function clearForm() {
    document.getElementById('bookForm').reset();
}

function toggleFormVisibility() {
    const form = document.getElementById('bookForm');
    form.style.display = form.style.display === 'none' ? 'flex' : 'none';
}


document.getElementById('toggleFormButton').addEventListener('click', toggleFormVisibility);
document.getElementById('bookForm').addEventListener('submit', addBookToLibrary);


myLibrary.push(new Book("Der Hobbit", "J.R.R. Tolkien", 310, true));
myLibrary.push(new Book("1984", "George Orwell", 328, false));
myLibrary.push(new Book("Die Verwandlung", "Franz Kafka", 201, true));

displayHeader();
displayLibrary();

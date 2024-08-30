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

const book1 = new Book("The Hobbit", "J.R.R Tolien", 295, false);

console.log(book1.info());
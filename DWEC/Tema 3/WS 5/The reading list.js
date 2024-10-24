//Primera clase BookList:
class BookList {
    constructor() {
        this.books = [];
        this.currentBook = null;
        this.lastBook = null;
        this.nextBook = null;
    }

    get numberOfBooksRead() {
        return this.books.filter(book => book.read).length;
    }

    get numberOfBooksNotRead() {
        return this.books.filter(book => !book.read).length;
    }

    add(book) {
        this.books.push(book);
        if (!this.currentBook) {
            this.currentBook = book;
        }
        this.updateNextBook();
    }

    finishCurrentBook() {
        if (this.currentBook) {
            this.currentBook.read = true;
            this.currentBook.readDate = new Date(Date.now());
            this.lastBook = this.currentBook;
            this.currentBook = this.nextBook;
            this.updateNextBook();
        }
    }

    updateNextBook() {
        this.nextBook = this.books.find(book => !book.read && book !== this.currentBook);
    }
}

//Segunda clase Book:
class Book {
    constructor(title, genre, author, read = false, readDate = null) {
        this.title = title;
        this.genre = genre;
        this.author = author;
        this.read = read;
        this.readDate = readDate;
    }
}

const book1 = new Book("The Hobbit", "Fantasy", "J.R.R. Tolkien");
const book2 = new Book("1984", "Dystopian", "George Orwell");
const book3 = new Book("To Kill a Mockingbird", "Fiction", "Harper Lee");

const myBookList = new BookList();
myBookList.add(book1);
myBookList.add(book2);
myBookList.add(book3);

console.log(myBookList.numberOfBooksRead); 
console.log(myBookList.numberOfBooksNotRead);  

myBookList.finishCurrentBook();
console.log(myBookList.lastBook.title);  
console.log(myBookList.currentBook.title);  
console.log(myBookList.nextBook.title);  
console.log(myBookList.numberOfBooksRead);  
console.log(myBookList.numberOfBooksNotRead);
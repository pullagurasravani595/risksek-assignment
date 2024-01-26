const express = require("express");
const app = express();
app.use(express.json());

let books = [];

class Book {
    constructor(title, author, ISBN) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN
    }
    displayInfo() {
        console.log(`Title: ${this.title}`);
        console.log(`Author: ${this.author}`);
        console.log(`ISBN: ${this.ISBN}`);
    }
}
class EBook extends Book {
    constructor(title, author, ISBN, fileFormat) {
        super(title, author, ISBN);
        this.fileFormat = fileFormat;
    }
    displayInfo() {
        super.displayInfo();
        console.log(this.fileFormat);
    }
}
class Library {
    constructor(books) {
        this.books = books;
    }
    addBook(book) {
        if (!(book instanceof Book)) {
            throw new Error("Invalid book object")
        }
        this.books.push(book)
        console.log("Book is added to Library");
    }
    displayBooks() {
        if (this.books.length === 0) {
            console.log("No books in the library");
            return;
        }
        console.log("Books in the library");
        this.books.forEach(book => {
            book.displayInfo();
        });
    }
    searchByTitle(title) {
        const searchBooks = this.books.filter(eachBook => (eachBook.title.toLowerCase() === title.toLowerCase()));
        if (searchBooks.length === 0) {
            console.log("Book not found");
            return;
        }
        console.log("books found");
        searchBooks.forEach(eachBook => {
            eachBook.displayInfo();
        });
    }

}


try {
    const library = new Library(books);

    const book1 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565');
    const book2 = new EBook('The Catcher in the Rye', 'J.D. Salinger', '9780316769488', 'PDF');

    library.addBook(book1);
    library.addBook(book2);

    library.displayBooks();

    library.searchByTitle('The Great Gatsby');
    library.searchByTitle('To Kill a Mockingbird');
    console.log(library);
} catch (error) {
    console.error('An error occurred:', error.message);
}

app.post('/addBook', (request, response) => {
    const {title, author, ISBN} = request.body;
    if ((title !== undefined) && (author !== undefined) && (ISBN !== undefined)) {
        const newBookDetails = {title, author, ISBN};
        books.push(newBookDetails);
        response.send("Book add successfully");
    }else {
        response.status(400);
        response.send("Invalid book data");
    }
});

app.get('/listBooks', (request, response) => {
    response.send(books);
})


app.delete("/deleteBook:isbn", (request, response) => {
    const {isbn} = request.params;
    books = books.filter(book => book.ISBN !== isbn)
    response.send(books)
})

app.listen(3000, () => {
    console.log("server run at 3000 port")
});

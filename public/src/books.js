function findAuthorById(authors, id) {
  // return the author object with the matching ID
  const author = authors.find((author) =>
  author.id === id);
  return author;
}

function findBookById(books, id) {
  // return the book object with the matching ID
  const book = books.find((book) =>
  book.id === id);
  return book;
}

function partitionBooksByBorrowedStatus(books) {
 // First array that contains book objects that are checked out
 const checkedOutBooks = books.filter((book) => book.borrows[0].returned === false);
 // Second array that contains book objects that have been returned
 const returnedBooks = books.filter((book) => book.borrows[0].returned === true);

 // Return the combined arrays
 return [checkedOutBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  // Map through the borrows array and find corresponding account for each ID
  const borrowers = book.borrows.map(borrow => {
    // Find the account that matches the borrow ID
    const account = accounts.find(account => account.id === borrow.id);
    // Return a new object combining the account info and the returned status
    return { ...account, returned: borrow.returned };
  });

  // Limit the number of results to 10
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

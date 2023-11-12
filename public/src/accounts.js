function findAccountById(accounts, id) {
  // Use the find method to locate the account with the matching id
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  // return sorted array (by last name) of the provided account objects
  return accounts.sort((account1, account2) => {
    return account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1 : -1;
  });
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((total, book) => {
    // Use filter to find borrows that match the account ID
    const borrowCount = book.borrows.filter(borrow => borrow.id === account.id).length;
    // Add the number of borrows for this book to the total accumulator
    return total + borrowCount;
  }, 0); // Start the total accumulator at 0
}

function getBooksPossessedByAccount(account, books, authors) {
  // Filter through the array of books
  const borrowedBooks = books.filter(book => {
    // Check each book's 'borrows' array to find if the account has borrowed the book and not returned it
    // The 'some()' method returns true if the condition is met for at least one element in the 'borrows' array
    return book.borrows.some(borrow => 
      borrow.id === account.id && !borrow.returned // Check if the account ID matches and the book is not returned
    );
  });

  // Add author details to book objects
  const borrowedBooksWithAuthors = borrowedBooks.map(book => {
    // Find the author who wrote the book
    const author = authors.find(author => 
      author.id === book.authorId);
    // Combine book and author details
    return { ...book, author };
  })
  // Return the array of books that are currently borrowed by the account
  return borrowedBooksWithAuthors;
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

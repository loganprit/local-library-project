// Helper function 1: counts items for the first three functions
function countItems(array, predicate) {
  /* If predicate(item) is true, increment the counter
  else return the counter
  0 is the initial value */
  return array.reduce((count, item) => predicate(item) ? count + 1 : count, 0);
}

// Helper function 2: aggregates and sorts data
function sortAndLimitData(importedObjects) {
  // Convert the imported objects into an array of key-value pairs
  const arrayToSort = Object.entries(importedObjects).map(([key, count]) => ({ name: key, count }));
  // Sort the array from most occurrences to least occurrences
  const sortedArray = arrayToSort.sort((a, b) => b.count - a.count);
  // Limit the number of items
  return sortedArray.slice(0, 5);
}

function getTotalBooksCount(books) {
  /* return the number of book objects inside the array
  or in other words, where (item) is true */
  return countItems(books, () => true);
}

function getTotalAccountsCount(accounts) {
  /* return the number of account objects inside the array
  or in other words, where (item) is true */
  return countItems(accounts, () => true);
}

function getBooksBorrowedCount(books) {
  // return the number of books borrowed, but not returned
  return countItems(books, book => book.borrows[0] && !book.borrows[0].returned);
}

function getMostCommonGenres(books) {
  // Create an object for each genre and the count of books in the genre
  const genres = books.reduce((count, book) => {
    // If genre exists already, increase count
    if (count[book.genre]) {
      count[book.genre] += 1;
    // Otherwise, start the counter
    } else {
      count[book.genre] = 1;
    }
    return count;
    }, {});

  // Return an array of the top 5 (or less) genres, sorted from most to least popular
  return sortAndLimitData(genres)
}

function getMostPopularBooks(books) {
  // Create an object for each book and the amount of transactions
  const borrowCount = books.reduce((count, book) => {
    // If the book title is in the borrowCount array, increment the count
    if (count[book.title]) {
      count[book.title] += book.borrows.length;
    // Otherwise, start the counter
    } else {
      count[book.title] = book.borrows.length;
    }
    return count;
    }, {});

  // Return an array of the top 5 (or less) books, sorted from most to least popular
  return sortAndLimitData(borrowCount)
}

function getMostPopularAuthors(books, authors) {
  // Create a mapping of book IDs to their borrow counts
  const bookBorrowCounts = books.reduce((count, book) => {
    count[book.id] = book.borrows.length;
    return count;
  }, {});

  const authorBorrows = authors.reduce((count, author) => {
    // Initial count of books by author borrowed
    let authorBorrowCount = 0;

    // Sum the borrows for each of the author's books
    books.forEach(book => {
      if (book.authorId === author.id) {
        authorBorrowCount += bookBorrowCounts[book.id];
      }
    });

    // Use the author's full name as the key
    const authorName = `${author.name.first} ${author.name.last}`;
    count[authorName] = authorBorrowCount;

    return count
  }, {});

  // Return an array of the top 5 (or less) authors, sorted from most to least popular
  return sortAndLimitData(authorBorrows);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

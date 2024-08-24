const express = require("express");
const router = express.Router();
const { books } = require("../Books.json");
const { users } = require("../Users.json");

/* 
    Route: /getBooks
    method: GET
    desc: get all books
    access: public
    params: none
*/

router.get("/getBooks", (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

/* 
    Route: /getBook/:id
    method: GET
    desc: get a book by their id
    access: public
    params: id
*/

router.get("/getBook/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((book) => book.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "book not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "book found",
    data: book,
  });
});

/* 
      Route: /newBook
      method: POST
      desc: add a new book
      access: public
      params: none
*/

router.post("/newBook", (req, res) => {
  const { id, name, genre, price } = req.body;
  const book = books.find((book) => book.id === id);

  if (book) {
    return res.status(404).json({
      success: false,
      message: "book already exist !",
    });
  }
  books.push({
    id,
    name,
    genre,
    price,
  });
  return res.status(200).json({
    success: true,
    message: "book added successfully",
    data: books,
  });
});

/* 
      Route: /updateBook/:id
      method: PUT
      desc: updating a book by their id
      access: public
      params: id
  */

router.put("/updateBook/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  if(!data){
    return res.status(404).json({
      success: false,
      message: "data not available"
    })
  }

  const book = books.find((book) => book.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "book not found",
    });
  }
  const updateBookData = books.map((book) => {
    if (book.id === id) {
      return {
        ...book,
        ...data,
      };
    }
    return book;
  });
  return res.status(201).json({
    success: true,
    message: "book updated successfully",
    data: updateBookData,
  });
});

/* 
      Route: /deleteBook/:id
      method: DELETE
      desc: deleting a book by their id
      access: public
      params: id
  */

router.delete("/deleteBook/:id", (req, res) => {
  const { id } = req.params;

  const book = books.find((book) => book.id === id);
  if (!book) {
    res.status(404).json({
      success: false,
      message: "book doesn't exist",
    });
  }
  // delete logic need to be built
  const index = books.indexOf(book);
  books.splice(index, 1);
  return res.status(200).json({
    success: true,
    message: "deleted book",
    data: books,
  });
});

/*
  Route: /issuedBooks
  method: get
  desc: get all issued books
  access: public
  params: none
*/

router.get("/issuedBooks", (req, res) => {
  const usersWithTheIssuedBook = users.filter((person) => {
    if (person.issuedBooks) {
      return person;
    }
  });
  const issuedBooks = [];
  usersWithTheIssuedBook.forEach((person) => {
    const book = books.find((book) => book.id === person.issuedBooks);
    book.issuedBy = person.name;
    book.issuedDate = person.issuedDate;
    book.returnDate = person.returnDate;

    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: "no book have been issued yet",
    });
  }
  return res.status(200).json({
    success: true,
    message: "users with the issued books",
    data: issuedBooks,
  });
});

module.exports = router;

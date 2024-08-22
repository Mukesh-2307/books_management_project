# books_management_project
A books record management application or a library management application using Express.Js

### The fine system :
* User's subscription : 06/09/2024 to 06/10/2024 and
* User returns book on : 10/10/2024 then fine will be 50*4 = 200
* if user miss the renewal then fine will be Rs.50 / day
* if user miss the renewal and the subscription is expired then fine will be Rs.100 (single time) + Rs.50 /day

### subscription type
* 3 months (basice)
* 6 months (standard)
* 12 months (premium)

# Routes and Endpoints

### /users
* POST: create a new user (done)
* GET: get all the user's info (done)

### /users/{id}
* GET: get a user by his/her id (done)
* PUT: update a user by their id (done)
* DELETE: delete a user by id (check if he/she still have an issued book) & (is there any fine to be paid) (pending)

### /users/subscription-details/{id}
* GET: get user's subscription details
1. date of subscription
2. valid till
3. is there any fine

### /books
* GET: get all the books
* POST: create/add a new book

###  /books/{id}
* GET: get a book by id
* PUT: update a book by id

### /books/issued
* GET: get all issued books

### /books/issued/withFine
* GET: get all issued books with their fine

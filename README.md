# books_management_project
A books record management application or a library management application using Express.Js

### The fine system :
> User's subscription : 06/09/2024 to 06/10/2024 and
> User returns book on : 10/10/2024 then fine will be 50*4 = 200

# Routes and Endpoints

## /users
> POST: create a new user
> GET: get all the user's info

## /users/{id}
> GET: get a user by his/her id
> PUT: update a user by their id
> DELETE: delete a user by id (check if he/she still have an issued book) & (is there any fine to be paid)

## /users/subscription-details/{id}
> GET: get user's subscription details
      >> date of subscription
      >> valid till
      >> is there any fine

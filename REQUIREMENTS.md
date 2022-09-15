# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints
#### Products
- Index
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

Table: Books (id:varchar, title:varchar, author:varchar, published_year:varchar, publisher_id:string[foreign key to publishers table], pages:number)

Routes:
  A CREATE route: 'users/' [POST]
  A SHOW route: 'users/:id' [GET]
  An INDEX route: 'users/' [GET]
  A DELETE route: 'users/:id' [DELETE]
  A CREATE route: 'orders/' [POST]
  A DELETE route: 'orders/:id' [DELETE]
  A SHOW route: 'orders/:id' [GET] (shows the user orders where the id is the id of user)
  A CREATE route: 'products/' [POST]
  A SHOW route: 'products/:id' [GET]
  An INDEX route: 'products/' [GET]
  A DELETE route: 'products/:id' [DELETE]


Tables:
  Table: users (id :SERIAL PRIMARY KEY,
  firstname :VARCHAR(100),
  lastname :VARCHAR(100),
  password: VARCHAR(100)
  )

  Table: products (
    id: SERIAL PRIMARY KEY,
    name: VARCHAR(100),
    price: integer
  )

  Table: orders (id: SERIAL PRIMARY KEY,
  user_id[foreign key to users table] :INTEGER,
  status:complete/active [Represented as enum])

  Table: order_product (id: SERIAL PRIMARY KEY,
  order_id[foreign key to orders table]: integer ,
  product_id[foreign key to products table]: integer,
  quantity:integer)

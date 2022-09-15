/* Replace with your SQL commands */
CREATE TABLE order_product (
  id SERIAL PRIMARY KEY,
  order_id integer REFERENCES orders(id) ON DELETE SET NULL,
  product_id integer REFERENCES products(id) ON DELETE SET NULL,
  quantity integer
);

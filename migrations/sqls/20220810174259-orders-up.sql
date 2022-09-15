/* Replace with your SQL commands */
CREATE TYPE state AS ENUM ('active','complete');
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  status state
);

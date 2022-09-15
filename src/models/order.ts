import client from '../database';
export enum state {
  active = "active",
  complete = "complete"
}
export type Order = {
  id: Number,
  user_id: Number,
  status: state
}

export class OrderTable {
  async ordersByUser(userId: Number):Promise<Order[]> {
    const connection = await client.connect();
    const query = 'SELECT * FROM orders WHERE user_id = ($1) ';
    const result = await connection.query(query,[userId]);
    connection.release();
    return result.rows;
  }
  async create(order:{user_id: Number,
  status: state}): Promise<Order>{
    const userId = order.user_id;
    const status = order.status;
    const connection = await client.connect();
    const query = 'INSERT INTO orders (user_id,status) VALUES (($1),($2)) RETURNING *'
    const result =await connection.query(query,[userId,status]);
    connection.release();
    return result.rows[0];
  }
  async destroy(id:Number):Promise<Order>{
    const conn = await client.connect();
    const sql = 'DELETE FROM orders WHERE id = ($1) RETURNING *';
    const result = await conn.query(sql,[id]);
    conn.release();
    return result.rows[0];
  }

  async addProduct (info:{order_id:Number,product_id:Number,quantity:Number}):Promise<{order_id:Number,product_id:Number,quantity:Number}>{
    const sql = 'INSERT INTO order_product (order_id,product_id,quantity) VALUES (($1),($2),($3)) RETURNING *';
    const conn = await client.connect();
    const result = await conn.query(sql,[info.order_id,info.product_id,info.quantity]);
    conn.release();
    return result.rows[0];
  }

  async displayAllproducts(){
    const sql = 'SELECT order_product.order_id,products.name,order_product.quantity INNER JOIN order_product ON order_product.product_id = '
  }
}

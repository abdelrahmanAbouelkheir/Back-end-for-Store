import client from '../database';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;

export type User = {
  id: Number,
  firstname: string,
  lastname: string,
  password: string
}

export class UserTable {
  async index(): Promise<User[]> {
    const connection = await client.connect();
    const query = 'SELECT * FROM users';
    const result = await connection.query(query);
    connection.release();
    return result.rows;
  }

  async show(id: Number): Promise<User> {
    const connection = await client.connect();
    const query = 'SELECT * FROM users WHERE id = ($1)';
    const result = await connection.query(query,[id]);
    connection.release();
    return result.rows[0];
  }

  async create(user: {firstname: string,
  lastname: string,
  password: string}): Promise<User>{
    const firstName = user.firstname;
    const lastName = user.lastname;
    const pass = user.password;
    const hash = bcrypt.hashSync(pass+pepper,parseInt(saltRounds))
    const connection = await client.connect();
    const query = 'INSERT INTO users (firstname,lastname,password) VALUES (($1),($2),($3)) RETURNING *'
    const result =await connection.query(query,[firstName,lastName,hash]);
    connection.release();
    return result.rows[0];
  }

  async getUserProducts(id:Number):Promise<{name:string,quantity:Number}[]>{
    const sql = 'SELECT id FROM orders WHERE user_id = ($1)'
    const conn = await client.connect();
    const result = await conn.query(sql,[id]);
    const orderId = result.rows[0].id;
    const sql2 = 'SELECT products.name,order_product.quantity FROM products INNER JOIN order_product ON products.id = order_product.product_id WHERE order_product.order_id = ($1)';
    const result2 = await conn.query(sql2,[orderId]);
    conn.release();
    return result2.rows;
  }

  async destroy(id:Number):Promise<User>{
      const conn = await client.connect();
      const sql = 'DELETE FROM users WHERE id = ($1) RETURNING *';
      const result = await conn.query(sql,[id]);
      conn.release();
      return result.rows[0];
    }


}
// const users = new UserTable();
// const test = async()=>{
//   await users.getUserProducts(1);
// }
// test();

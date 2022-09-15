import client from '../database';
export type Product = {
  id: Number,
  name: string,
  price: number,
}
export class ProductTable {
  async index(): Promise<Product[]> {
    const connection = await client.connect();
    const query = 'SELECT * FROM products';
    const result = await connection.query(query);
    connection.release();
    return result.rows;
  }

  async show(id: Number): Promise<Product> {
    const connection = await client.connect();
    const query = 'SELECT * FROM products WHERE id = ($1)';
    const result = await connection.query(query,[id]);
    connection.release();
    return result.rows[0];
  }

  async create(product:{name: string,
  price: Number}): Promise<Product>{
    const name = product.name;
    const price = product.price;
    const connection = await client.connect();
    const query = 'INSERT INTO products (name,price) VALUES (($1),($2)) RETURNING *'
    const result =await connection.query(query,[name,price]);
    connection.release();
    return result.rows[0];
  }

  async destroy(id:Number):Promise<Product>{
        const conn = await client.connect();
        const sql = 'DELETE FROM products WHERE id = ($1) RETURNING *';
        const result = await conn.query(sql,[id]);
        conn.release();
        return result.rows[0];
    }
}
// const products = new ProductTable();
// const test = async()=>{
//   const r = await (products.create({name: 'milk',price: 22}));
//   console.log(r)
// }
// test();

import supertest from 'supertest';
import app from '../index';
import client from '../database'
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJhaG1lZCIsImxhc3RuYW1lIjoibW9oYW1lZCIsInBhc3N3b3JkIjoiJDJiJDEwJG40ZkhMWTByLy5henZtaU1wVS5CTi5PcWhTbEtNWmlMWVBVbUNrQnNMdkJzSGFOZTlxTnFhIn0sImlhdCI6MTY2MDI0NDc4N30.-60akRJ98tFqFC3xygZm9727sD3vPOFq_vVQKWEyuaE";
const request = supertest(app);
describe('Test user endpoints', () => {

  it('Create Endpoint', async () => {
    const user = {
      "firstname":"ahmed",
      "lastname":"mohamed",
      "password":"laaa"
    }
    await request.post("/users").send(user).expect(response => {
        expect(response.status).toBe(200)
      });
  });

  it('Index Endpoint', async () => {
    await request.get("/users").set('Authorization', 'Bearer '+token).expect(response => {
        expect(response.status).toBe(200)
      });
  });

 it('Show Endpoint', async () => {
    await request.get("/users/1").set('Authorization', 'Bearer '+token).expect(response => {
        expect(response.status).toBe(200)
    });
  });

});
describe('Test product endpoints', () => {

  it('Create Endpoint', async () => {
    const product = {
      "name":"pepsi",
      "price":"6",
    }
    await request.post("/products").set('Authorization', 'Bearer '+token).send(product).expect(response => {
        expect(response.status).toBe(200)
      });
  });

  it('Index Endpoint', async () => {
    await request.get("/products").expect(response => {
        expect(response.status).toBe(200)
      });
  });

 it('Show Endpoint', async () => {
    await request.get("/products/1").expect(response => {
        expect(response.status).toBe(200)
    });
  });

  it('Delete Endpoint', async () => {
      await request.delete("/products/1").expect(response => {
          expect(response.status).toBe(200)
      });
      const connection = await client.connect();
      const sql = 'ALTER SEQUENCE products_id_seq RESTART WITH 1'
      await connection.query(sql);
      const sql2 = 'UPDATE products SET id = DEFAULT'
      await connection.query(sql2);
  });

});

describe('Test orders endpoints', () => {

  it('Create Endpoint', async () => {
    const order = {
      "user_id":"1",
      status: "complete"
    }
    await request.post("/orders").send(order).expect(response => {
        expect(response.status).toBe(200)
      });
  });

  it('Orders By User', async () => {
    await request.get("/orders/1").set('Authorization', 'Bearer '+token).expect(response => {
        expect(response.status).toBe(200)
      });
  });

 it('Delete Endpoint', async () => {
    await request.delete("/orders/1").expect(response => {
        expect(response.status).toBe(200)
    });
    const connection = await client.connect();
    const sql = 'ALTER SEQUENCE orders_id_seq RESTART WITH 1'
    await connection.query(sql);
    const sql2 = 'UPDATE orders SET id = DEFAULT'
    await connection.query(sql2);
  });


});
describe('delete user endpoint',()=>{
  it('', async () => {
    await request.delete("/users/1").expect(response => {
        expect(response.status).toBe(200)
    });
    const connection = await client.connect();
    const sql = 'ALTER SEQUENCE users_id_seq RESTART WITH 1'
    await connection.query(sql);
    const sql2 = 'UPDATE users SET id = DEFAULT'
    await connection.query(sql2);
  });
});

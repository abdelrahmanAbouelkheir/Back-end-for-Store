"use strict";
// import client from '../database';
// import dotenv from 'dotenv';
// import bcrypt from 'bcrypt';
//
// dotenv.config();
//
// const pepper = process.env.BCRYPT_PASSWORD as string;
// const saltRounds = process.env.SALT_ROUNDS as string;
// export type Book = {
//   id: Number,
//   title: string,
//   total_pages: Number,
//   author: string,
//   type: string,
//   summary: string
// };
//
// export class BookStore{
//   async display(): Promise<Book[]>{
//   //  try{
//
//         const conn = await client.connect();
//         const sql = 'SELECT * FROM books';
//         const result =await conn.query(sql);
//          conn.release();
//         return result.rows;
//     //}
//     //catch(error){
//       //throw new Error("something went wrong");
//     //}
//
//   }
//
//   async add(book:Book): Promise<Book>{
//     try{
//       const conn = await client.connect();
//       const sql = 'INSERT INTO books (title,total_pages,author,type,summary) VALUES ($1,$2,$3,$4,$5) RETURNING *';
//      const hash = bcrypt.hashSync(book.title+pepper,parseInt(saltRounds))
//     //  const result =await  conn.query(sql,[hash,book.total_pages,book.author,book.type,book.summary]);
//       const result =await  conn.query(sql,[book.title,book.total_pages,book.author,book.type,book.summary]);
//        conn.release();
//       return result.rows[0];
//     }
//     catch(error){
//       throw new Error("something went wrong");
//     }
//   }
//   async deleteByTitleAndPages(title:string,total_pages:Number):Promise<void>{
//     try{
//       const conn = await client.connect();
//       const sql = 'DELETE FROM books WHERE title =($1) AND total_pages = ($2) RETURNING *';
//       const result = await conn.query(sql,[title,total_pages]);
//       conn.release();
//       return result.rows[0];
//       console.log("DELETED ya bro");
//     }
//     catch(error){
//       throw new Error("Something went wrong");
//     }
//   }
// }
// // const newB :Book =
// // const a = new BookStore();
// // a.add({
// //   id:1,
// //   title:'man',
// //   total_pages:200,
// //   author:'abdo',
// //   type:'action',
// //   summary:'an unsed book'
// // });
// //  const foo = async()=>{
// //   await a.deleteByTitleAndPages('man',200);
// //   // const re = await a.display();
// //   // console.log(re);
// // }
// // foo();

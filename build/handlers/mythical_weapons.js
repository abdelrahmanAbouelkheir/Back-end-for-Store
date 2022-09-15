"use strict";
// import express,{Response,Request} from 'express';
// import {Book,BookStore} from '../models/mythical_weapon';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';
// dotenv.config();
// const store = new BookStore();
//
// const index = async (req:Request,res:Response)=>{
//   const result =await store.display();
//   try{
//     jwt.verify(req.body.token,process.env.TOKEN_SECRET as string)
//   }
//   catch(error){
//     res.send('wrong jwt');
//   }
//   res.json(result)
// }
//
// const create = async (req:Request,res:Response)=>{
//   const book = {
//     id: req.body.id,
//     title: req.body.title,
//     total_pages: req.body.total_pages,
//     author: req.body.author,
//     type: req.body.type,
//     summary: req.body.summary
//   }
//   const result = await store.add(book);
//   const token = jwt.sign({user:result},process.env.TOKEN_SECRET as string );
//   res.json(token);
// }
// const destroy = async (req: Request,res: Response)=>{
// const a=req.body.title;
// const b=parseInt(req.body.total_pages);
//
//   // const b =
//   // const a = (req.body.title);
//   // console.log(a);
//     const result = await store.deleteByTitleAndPages( a,b);
//    res.json(result);
// }
// export const mythical_weapons_routes = (app: express.Application)=>{
//   app.get('/weapons',index);
//   app.post('/weapons',create);
//   app.delete('/weapons', destroy);
// }

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretToken = process.env.TOKEN_SECRET;

import {Product,ProductTable} from '../models/product';

import express,{Response,Request} from 'express';
const products = new ProductTable();
const create = async(req:Request,res:Response):Promise<void>=>{
  const productName =req.body.name;
  const productPrice = parseInt(req.body.price)
  const authorizationHeader = req.headers.authorization
    //@ts-ignore
  const token = authorizationHeader.split(' ')[1]
  const product = {
    name: productName,
    price: productPrice
  }
  try{
    jwt.verify(token,secretToken as string);
    const result = await products.create(product);
    res.json(result);
  }catch(error){
    res.send('wrong jwt');
  }
}

const index = async(req:Request,res:Response):Promise<void>=>{
  try{
  const result = await products.index();
  res.json(result);
  }
  catch(error){
    res.send('cannot display products')
  }
}

const destroy = async(req:Request,res:Response):Promise<void>=>{
    const id = parseInt(req.params.id);
    try{
    const result = await products.destroy(id);
     res.json(result);
   }catch(error){
     res.send('cannot delete product')
   }
}

const show = async(req:Request,res:Response):Promise<void>=>{
  const id = parseInt(req.params.id);
  try{
  const result = await products.show(id);
  res.json(result);
  }catch(error){
    res.send('cannot display product')
  }

}
const productsRoutes =(app:express.Application)=>{
  app.post('/products',create);
  app.get('/products',index);
  app.get('/products/:id',show);
  app.delete('/products/:id',destroy);
}
export default productsRoutes

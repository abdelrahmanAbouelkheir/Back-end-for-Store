import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretToken = process.env.TOKEN_SECRET;

import {Order,OrderTable} from '../models/order';
import express,{Response,Request} from 'express';
const orders = new OrderTable();
const ordersByUser = async(req:Request,res:Response):Promise<void>=>{
  const id = parseInt(req.params.id);
  const authorizationHeader = req.headers.authorization
    //@ts-ignore
  const token = authorizationHeader.split(' ')[1]
  try{
    jwt.verify(token,secretToken as string);
    const result = await orders.ordersByUser(id);
    res.json(result);
  }catch(error){
    res.send('wrong jwt');
  }
}

const destroy = async(req:Request,res:Response):Promise<void>=>{
    const id = parseInt(req.params.id);
    try{
      const result = await orders.destroy(id);
      res.json(result);
    }catch(error){
      res.send('cannot delete order')
    }
}
const addProduct = async(req:Request,res:Response):Promise<void>=>{
  const productId = parseInt(req.body.product_id)
  const orderId = parseInt(req.params.id)
  const quantity = parseInt(req.body.quantity)
  const info ={
    order_id: orderId ,
    product_id: productId,
    quantity: quantity
  }
  try{
    const result = await orders.addProduct(info)
    res.json(result);
  }catch(erorr){
    res.send('cannot add product')
  }
}

const create = async(req:Request,res:Response):Promise<void>=>{
  const userId =parseInt(req.body.user_id);
  const statuss = req.body.status
  const product = {
    user_id : userId,
    status: statuss
  }
  try{
    const result = await orders.create(product);
    res.json(result);
  }catch(error){
    res.send('cannot create order')
  }
}
const ordersRoutes =(app:express.Application)=>{
  app.get('/orders/:id',ordersByUser);
  app.post('/orders/:id/product',addProduct);
  app.post('/orders',create);
  app.delete('/orders/:id',destroy);
}
export default ordersRoutes

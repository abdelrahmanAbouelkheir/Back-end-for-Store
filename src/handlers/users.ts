import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretToken = process.env.TOKEN_SECRET;

import {User,UserTable} from '../models/user';

import express,{Response,Request} from 'express';
const users = new UserTable();
const create = async(req:Request,res:Response):Promise<void>=>{
  const userFirstName =req.body.firstname;
  const userLastName = req.body.lastname;
  const pass = req.body.password
  const user = {
    firstname: userFirstName,
    lastname: userLastName,
    password: pass
  }
  const result = await users.create(user);
  const token =jwt.sign({user:result},process.env.TOKEN_SECRET as string );
  res.json(token);
}

const index = async(req:Request,res:Response):Promise<void>=>{
  const authorizationHeader = req.headers.authorization
  //@ts-ignore
  const token = authorizationHeader.split(' ')[1]
  try{
    jwt.verify(token,secretToken as string);
    const result = await users.index();
    res.json(result);
  }catch(error){
    res.send('wrong jwt');
  }
}

const destroy = async(req:Request,res:Response):Promise<void>=>{
    const id = parseInt(req.params.id);
    try{
      const result = await users.destroy(id);
      res.json(result);
    }catch(error){
      res.send('cannot delete user')
    }
}

const showUserProducts = async(req:Request,res:Response):Promise<void>=>{
   const userId = parseInt(req.params.id);
   try{
     const result = await users.getUserProducts(userId)
     res.json(result)
   }catch(error){
     res.send('cannot show products')
   }

}

const show = async(req:Request,res:Response):Promise<void>=>{
  const authorizationHeader = req.headers.authorization
    //@ts-ignore
  const token = authorizationHeader.split(' ')[1]
  const id = parseInt(req.params.id);
  try{
    jwt.verify(token,secretToken as string);
    const result = await users.show(id);
    res.json(result);
  }catch(error){
    res.send('wrong jwt');
  }
}
const usersRoutes =(app:express.Application)=>{
  app.post('/users',create);
  app.get('/users',index);
  app.get('/users/:id',show);
  app.delete('/users/:id',destroy);
  app.get('/users/:id/products',showUserProducts);
}
export default usersRoutes

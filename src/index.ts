import express,{Request, Response} from 'express';
import bodyParser from 'body-parser';
//import cors from 'cors';
//import {mythical_weapons_routes} from '../src/handlers/mythical_weapons';
import usersRoutes from './handlers/users';
import productsRoutes from './handlers/products';
import ordersRoutes from './handlers/orders';
const app = express();

// const corsOptions = {
//   origin:"http://someotherdomain.com",
//   optionsSuccessStatus: 200
// }

//app.use(cors(corsOptions));
app.use(bodyParser.json());
app.get('/',(req: Request, res: Response)=>{
  res.send('connected');
});

//mythical_weapons_routes(app);
usersRoutes(app);
productsRoutes(app);
ordersRoutes(app);

app.listen(3000,()=>{
  console.log('connected to http://localhost:3000');
});
export default app;

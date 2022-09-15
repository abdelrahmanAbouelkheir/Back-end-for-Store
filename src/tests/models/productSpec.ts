import {Product,ProductTable} from '../../models/product';
const products = new ProductTable();
describe('Tests for products table',()=>{
  it('Create',async()=>{
    const result  = await products.create({
        name: 'milk',
        price: 22
    });
    expect(result).toEqual({
        id:1,
        name: 'milk',
        price: 22
    })
  });

  it('index',async()=>{
    const result = await products.index();
    expect(result).toEqual([{
      id:1,
      name: 'milk',
      price: 22
    }]);
  });
  it('show',async()=>{
    const result = await products.show(1);
    expect(result).toEqual({
      id:1,
      name: 'milk',
      price: 22
    });
  });
  it('delete',async()=>{
    const result = await products.destroy(1);
    expect(result).toEqual({
      id:1,
      name: 'milk',
      price: 22
    });
  });
});

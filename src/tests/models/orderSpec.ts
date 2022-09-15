import {state,Order,OrderTable} from '../../models/order';
const orders = new OrderTable();
describe('Tests for orders table',()=>{
  it('Create',async()=>{
    const result = await orders.create({
      user_id:1,
      status: state.complete
    });
    expect(result).toEqual({
      id:1,
      user_id:1,
      status:state.complete
    })
  })
  it('Get all Orders by certain user',async()=>{
    const result = await orders.ordersByUser(1);
    expect(result).toEqual([{
      id:1,
      user_id:1,
      status:state.complete
    }])
  })
  it('delete',async()=>{
    const result = await orders.destroy(1);
    expect(result).toEqual({
      id:1,
      user_id:1,
      status:state.complete
    });
  });

})

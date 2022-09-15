import {User,UserTable} from '../../models/user';
const users = new UserTable();
describe('Tests for users table',()=>{
  it('Create',async()=>{
    const result  = await users.create({
        firstname: 'ahmed',
        lastname: 'mohamed',
        password: 'laaa'
    });
    const pass = result.password
    expect(result).toEqual({
        id:1,
        firstname: 'ahmed',
        lastname: 'mohamed',
        password: pass
    })
  });

  it('index',async()=>{
    const result = await users.index();
    const pass = result[0].password
    expect(result).toEqual([{
      id:1,
      firstname: 'ahmed',
      lastname: 'mohamed',
      password: pass
    }]);
  });
  it('show',async()=>{
    const result = await users.show(1);
    const pass = result.password
    expect(result).toEqual({
      id:1,
      firstname: 'ahmed',
      lastname: 'mohamed',
      password: pass
    });
  });
  
});

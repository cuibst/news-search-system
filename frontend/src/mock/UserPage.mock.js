import * as Mock from 'mockjs'

Mock.mock('/api/user', 'get', (rqst) => {
  console.log(rqst)
  return {
    code: 200,
    user: {
      username: '1',
      phonenumber: '13333333333',
      email: 'a@at.com'
    }
  }
})

import * as Mock from 'mockjs'

Mock.mock('/api/user/', 'get', (rqst) => {
  console.log(rqst)
  return {
    code: 200,
    user: {
      username: 'ryy-test',
      phonenumber: '13333233333',
      email: 'b@bat.com'
    }
  }
})

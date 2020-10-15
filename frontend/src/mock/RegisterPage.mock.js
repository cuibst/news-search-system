import * as Mock from 'mockjs'

Mock.mock('api/register/', 'post', (rqst) => {
  console.log(rqst)
  if (JSON.parse(rqst.body).username === '1') {
    return {
      code: 401
    }
  } else {
    return {
      code: 200
    }
  }
})

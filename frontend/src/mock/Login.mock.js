import * as Mock from 'mockjs'

// Mock.setup({ timeout: '200-400' })

Mock.mock('/api/login/', 'post', (rqst) => {
  console.log(rqst)
  const info = JSON.parse(rqst.body)
  console.log(info)
  if (info.username === '1' && info.password === '123') {
    console.log('success')
    return ({
      code: 200,
      Token: '332460EFB'
    })
  } else {
    console.log('fail')
    return (401, {
      code: 401,
      Token: 'NONE'
    })
  }
})

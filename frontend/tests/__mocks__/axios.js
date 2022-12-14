'use strict'
exports.__esModule = true
var mockAxios = jest.genMockFromModule('axios')
mockAxios.create = jest.fn(function () { return mockAxios })
mockAxios.get = jest.fn(function () { return Promise.reject(Error('Network Failure')) })
mockAxios.post = jest.fn(function () { return Promise.resolve({ data: {} }) })
mockAxios.put = jest.fn(function () { return Promise.resolve({ data: {} }) })
mockAxios.delete = jest.fn(function () { return Promise.resolve({ data: {} }) })
mockAxios.all = jest.fn(function () { return Promise.resolve() })
exports.default = mockAxios

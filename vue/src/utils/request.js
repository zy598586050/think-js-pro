import axios from 'axios'
import config from '../config'
import storage from './localStorage'

const service = axios.create({
    baseURL: config.baseUrl,
    timeout: 8000
})

// 请求拦截
service.interceptors.request.use(config => {
    const headers = config.headers
    const token = storage.getItem('userInfo')
    if(!headers.Authorization) headers.Authorization = `Bearer ${token}`
    return config
},error => {
    return Promise.reject(error)
})

// 响应拦截
service.interceptors.response.use(response => {
    const data = response.data
    return data
},error => {
    return Promise.reject(error)
})

/**
 * 请求核心
 */
const request = (options) => {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() === 'get') {
        options.params = options.data;
    }
    let isMock = config.mock;
    if (typeof options.mock != 'undefined') {
        isMock = options.mock;
    }
    if (config.env === 'production') {
        service.defaults.baseURL = config.baseUrl
    } else {
        service.defaults.baseURL = isMock ? config.mockUrl : config.baseUrl
    }
    return service(options)
}

['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
    request[item] = (url, data, options) => {
        return request({
            url,
            data,
            method: item,
            ...options
        })
    }
})

export default request
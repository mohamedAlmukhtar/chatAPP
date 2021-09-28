import axios from 'axios'

console.log('url:')
console.log(process.env.baseURL)

const instance = axios.create({
    baseURL: ''
})

export default instance
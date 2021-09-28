import axios from 'axios'

const instance = axios.create({
    baseURL: 'react-chat-app-m.herokuapp.com'
})

export default instance
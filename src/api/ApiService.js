import Axios from 'axios';

class ApiService {

    static get(url, callback) {
        Axios.get(url)
            .then( res => callback({ success: true, data: res.data }))
            .catch( err => callback({success: false, error: err}))
    }

    static post(url, data, callback) {
        Axios.post(url, data)
            .then( res => callback({ success: true, data: res.data }))
            .catch( err => callback({ success: false, error: err }))
    }

    static put(url, data, callback) {
        Axios.put(url, data, callback)
            .then( res => callback({ success: true, data: res.data }))
            .catch( err => callback({ success: false, error: err }))
    }

    static delete(url, callback) {
        Axios.delete(url)
            .then( res => callback({ success: true }))
            .catch( err => callback({ success: false, error: err }))
    }

}

export default ApiService;
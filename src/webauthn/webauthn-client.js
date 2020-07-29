import axios from 'axios'

const WEBAUTHN = 'http://didonfido.cafe24.com'
//const WEBAUTHN = 'https://webauthn.io'

const checkUserExists = async (userid) => {
    if (typeof userid !== 'string') {
        console.log('typeof userid = ', typeof userid)
        return false
    }
    
    try {
        const response = await axios.get(WEBAUTHN + '/user/' + userid + '/exists')
        console.log('response = ', response)
        console.log('response.data.exists = ', response.data.exists)
        return response.data.exists;
    } catch (error) {
        console.warn(error)
        return false;
    }
}

export default {
    checkUserExists
}
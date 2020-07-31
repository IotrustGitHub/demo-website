import axios from 'axios'
import base64js from './base64'

const WEBAUTHN = 'https://didonfido.cafe24.com'
//const WEBAUTHN = 'https://webauthn.io'

const bufferDecode = (value) => {
    return Uint8Array.from(atob(value), c => c.charCodeAt(0));
}

const bufferEncode = (value) => {
    return base64js.fromByteArray(value)
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "");
}

const checkUserExists = async (userid) => {
    if (typeof userid !== 'string') {
        console.log('typeof userid = ', typeof userid)
        return false
    }
    
    try {
        const response = await axios.get(WEBAUTHN + '/user/' + userid + '/exists')
        console.log('response = ', response)
        console.log('response.data.exists = ', response.data.exists)
        if (response.data.exists) {
            const response = await axios.get(WEBAUTHN + '/user/' + userid + '/credentials')
            console.log('response.data = ', response.data)
            if (response.data.length > 0) {
                return true
            }
        }
        return false;
    } catch (error) {
        console.warn(error)
        return false;
    }
}

const makeCredential = async (userid) => {
    var attestation_type = 'none'
    var authenticator_attachment = ''
    
    var user_verification = 'discouraged'
    var resident_key_requirement = 'false'
    var txAuthSimple_extension = ''

    try {
        const response = await axios.get(WEBAUTHN + '/makeCredential/' + userid, {
            params: {
                attType: attestation_type,
                authType: authenticator_attachment,
                userVerification: user_verification,
                residentKeyRequirement: resident_key_requirement,
                txAuthExtension: txAuthSimple_extension,
            },
            withCredentials: true
        })
        console.log('response = ', response)
        const makeCredentialOptions = response.data

        makeCredentialOptions.publicKey.challenge = bufferDecode(makeCredentialOptions.publicKey.challenge);
        makeCredentialOptions.publicKey.user.id = bufferDecode(makeCredentialOptions.publicKey.user.id);
        if (makeCredentialOptions.publicKey.excludeCredentials) {
            for (var i = 0; i < makeCredentialOptions.publicKey.excludeCredentials.length; i++) {
                makeCredentialOptions.publicKey.excludeCredentials[i].id = bufferDecode(makeCredentialOptions.publicKey.excludeCredentials[i].id);
            }
        }
        makeCredentialOptions.publicKey.rp.name = window.location.hostname
        makeCredentialOptions.publicKey.rp.id = window.location.hostname

        console.log("Credential Creation Options");
        console.log('makeCredentialOptions =', makeCredentialOptions);
        const newCredential = await navigator.credentials.create({
                publicKey: makeCredentialOptions.publicKey
            })
        console.log("PublicKeyCredential Created");
        console.log('newCredential =', newCredential);
        //state.createResponse = newCredential;
        const isSuccess = await registerNewCredential(newCredential);
        return isSuccess
    } catch (error) {
        console.warn(error)
        return false
    }
}

// This should be used to verify the auth data with the server
const registerNewCredential = async (newCredential) => {
    // Move data into Arrays incase it is super long
    let attestationObject = new Uint8Array(newCredential.response.attestationObject);
    let clientDataJSON = new Uint8Array(newCredential.response.clientDataJSON);
    let rawId = new Uint8Array(newCredential.rawId);

    try {
        await axios.post(WEBAUTHN + '/makeCredential',{
            id: newCredential.id,
            rawId: bufferEncode(rawId),
            type: newCredential.type,
            response: {
                attestationObject: bufferEncode(attestationObject),
                clientDataJSON: bufferEncode(clientDataJSON),
            },
        }, { withCredentials: true })
        return true
    } catch (error) {
        return false
    }
}

const verifyCredential = async (userid) => {
    console.log('ENTER verifyCredential')

    var user_verification = 'discouraged'
    var txAuthSimple_extension = ''

    try {
        const response = await axios.get(WEBAUTHN + '/assertion/' + userid, {
            params: {
                userVer: user_verification,
                txAuthExtension: txAuthSimple_extension
            },
            withCredentials: true
        })

        let makeAssertionOptions = response.data
        console.log("Assertion Options:");
        console.log(makeAssertionOptions);
        makeAssertionOptions.publicKey.challenge = bufferDecode(makeAssertionOptions.publicKey.challenge);
        makeAssertionOptions.publicKey.allowCredentials.forEach(function (listItem) {
            listItem.id = bufferDecode(listItem.id)
        });
        console.log(makeAssertionOptions);
        const credential = await navigator.credentials.get({
                publicKey: makeAssertionOptions.publicKey
            })
        console.log(credential);
        const isSuccess = await verifyAssertion(credential);

        return isSuccess
    } catch (error) {
        console.warn(error)
        return false
    }
}

const verifyAssertion = async (assertedCredential) => {
    console.log('calling verify')
    let authData = new Uint8Array(assertedCredential.response.authenticatorData);
    let clientDataJSON = new Uint8Array(assertedCredential.response.clientDataJSON);
    let rawId = new Uint8Array(assertedCredential.rawId);
    let sig = new Uint8Array(assertedCredential.response.signature);
    let userHandle = new Uint8Array(assertedCredential.response.userHandle);

    try {
        const response = await axios.post(WEBAUTHN + '/assertion',{
            id: assertedCredential.id,
            rawId: bufferEncode(rawId),
            type: assertedCredential.type,
            response: {
                authenticatorData: bufferEncode(authData),
                clientDataJSON: bufferEncode(clientDataJSON),
                signature: bufferEncode(sig),
                userHandle: bufferEncode(userHandle),
            },
        }, { withCredentials: true })

        console.log('response =', response)
        return true
    } catch (error) {
        return false
    }
}

export default {
    checkUserExists,
    makeCredential,
    verifyCredential
}
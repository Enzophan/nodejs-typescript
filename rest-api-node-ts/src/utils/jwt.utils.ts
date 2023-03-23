import jwt from 'jsonwebtoken';
import config from 'config';
import crypto from 'crypto';

// const privateKey = config.get<string>('privateKey');
// const publicKey = config.get<string>('publicKey');

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096
})

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, privateKey, {
        ...options,
        algorithm: "RS256"
    })
}

export function verifyJwt(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (e: any) {
        console.log("verifyJwt error: ",e.message)
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null
        }
    }
}
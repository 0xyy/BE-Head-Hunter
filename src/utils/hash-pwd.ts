import * as crypto from 'crypto';

export const hashPwd = (p: string, salz: string): string => {
    const hmac = crypto.createHmac('sha512', salz);
    hmac.update(p);
    return hmac.digest('hex');
};
export const randomSalz = (size: number) => {
    const salz = crypto.randomBytes(size);
    return salz.toString();
};

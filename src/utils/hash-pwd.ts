import * as crypto from 'crypto';

const SALZ =
  'nkjsdafh982y3 98h qoi232ny9823ync!@#982y1ocrixmh29yy398z2y4982y3z,k2!$%!$#%!#%io h239i432hi423h423iu ec2 e3 3żśćśąąasdfs@%@#%afdsadfsadfsadfo9as09du09io';

export const hashPwd = (p: string): string => {
  const hmac = crypto.createHmac('sha512', SALZ);
  hmac.update(p);
  return hmac.digest('hex');
};

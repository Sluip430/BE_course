import fs from 'fs';
import { getFileStream } from '../services/s3';

export class S3 {
    public key: string;
    constructor(key) {
      this.key = key;
    }
    getFile() {
      return getFileStream(this.key);
    }
}

export class Local {
    public key: string;
    constructor(key) {
      this.key = key;
    }
    getFile() {
      const result = fs.createReadStream(`uploads/${this.key}`);

      return result;
    }
}

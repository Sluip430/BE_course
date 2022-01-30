import { Class } from 'type-fest';
import { S3, Local } from '../Class/Class';

export class Adapter {
    public saveType: any;
    constructor(saveType) {
      this.saveType = saveType;
    }
    getTargetFile() {
      return this.saveType.getFile();
    }
}

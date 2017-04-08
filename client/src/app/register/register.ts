

export class Register {
  id: number;

  password: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  mobile: string;

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'com.wits.core.Register : ' + (this.id ? this.id : '(unsaved)');
  }
}
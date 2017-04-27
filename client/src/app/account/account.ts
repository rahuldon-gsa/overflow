

export class Account {
  id: number;

  num: string;
  zipCode: string;
  address2: string;
  city: string;
  address1: string;
  dateOfBirth: any;
  state: string;
  source: string;
  type: string;
  salary: string;
  balance: number

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'com.wits.core.Account : ' + (this.id ? this.id : '(unsaved)');
  }
}
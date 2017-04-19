export class User {
  id: number;

  username: string;
  password: string;
  accountLocked: boolean;
  accountExpired: boolean;
  passwordExpired: boolean;
  enabled: boolean;

  constructor (object?: any) {
    if (object) {
      
      for (var prop in object) {
        this[prop] = object[prop];
      }
    }

  }

  toString(): string {
    return 'com.wits.sec.User : ' + (this.id ? this.id : '(unsaved)');
  }
}
export default class User {
  constructor(options) {
    this.firstname = options.firstname;
    this.lastname = options.lastname;
    this.email = options.email;
    this.password = options.password;
  }
}

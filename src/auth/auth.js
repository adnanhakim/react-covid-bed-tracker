class Auth {
   constructor() {
      this.token = localStorage.getItem('COVID_TOKEN');
   }

   login(token, done) {
      localStorage.setItem('COVID_TOKEN', token);
      this.token = token;
      done();
   }

   logout(done) {
      localStorage.removeItem('COVID_TOKEN');
      this.token = null;
      done();
   }

   isAuthenticated() {
      return this.token !== null;
   }

   getToken() {
      return this.token;
   }
}

export default new Auth();

class Authen {
  user = null;
  jwt = null;
  refToken = null;

  constructor() {
    console.log('create authen');
  }

  //get isLogined() {
  //  return (this.user != null) ? true : false;
  //}

  set(authen) {
    this.user = authen.user;
    this.jwt = authen.jwToken;
    this.refToken = authen.refToken;
  }

  reset() {
    this.user = null;
    this.jwt = null;
    this.refToken = null;
  }
}

export default new Authen();


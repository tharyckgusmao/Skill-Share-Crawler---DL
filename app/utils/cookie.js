module.exports = class cookie{

  constructor() {
    this._cookie = null;
  }
  get cookie(){
    return this._cookie;
  }
  set cookie(cookie){
    return this._cookie = cookie;
  }

  serializeCookie(){

    return this._cookie.map(el=>{
      	return `${el.name}=${el.value}`
      }).join(';')

  }


}

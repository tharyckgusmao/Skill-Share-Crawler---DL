module.exports = class cookie{

  constructor() {
    this._cookie = null;
    this._provided = true;
  }
  get cookie(){
    return this._cookie;
  }
  set cookie(cookie){
    return this._cookie = cookie;
  }
  get provided(){
    return this._provided;
  }
  set provided(provided){
    return this._provided = provided;
  }

  serializeCookie(){
    if(this._provided==false){

      return this._cookie.map(el=>{
          return `${el.name}=${el.value}`
        }).join(';')
    }else{
      return this._cookie
    }

  }


}

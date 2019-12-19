/*
APP: InterrupcionesProgramadas
Author: Evelyn Hernandez
Version: 0.7.1d
Date: 2018-11-07
*/


//DEVELOPMENT
/*
const env = {
    ROOT: "/",
    CSSDIRECTORY: 'src/css/',
    ROUTEPATH: 'index.html',
    ENVIRONMENT: 'DEVELOPMENT',
    WEBSERVERADDRESS: "http://pchilquinta.cl/mapafallas",
    SAVEAPPLICATIONMODULE: "",
    SAVEAPPLICATIONNAME: '',
    BUILDFOR: 'EXTERNA'
}

var conf = ( () => {
  var credentials = {
    user: 'vialactea\\',
    pass: ''
  }

  return () => {return credentials}
})();
*/

//DESA SERV CHQ
/*
const env = {
    ROOT: "/",
    CSSDIRECTORY: 'css/',
    ROUTEPATH: 'index.html',
    ENVIRONMENT: 'PRODUCTION',
    WEBSERVERADDRESS: "http://pchilquinta.pruebas/mapafallas",
    SAVEAPPLICATIONMODULE: "",
    SAVEAPPLICATIONNAME: '',
    BUILDFOR: 'EXTERNA'
}

var conf = ( () => {
  var credentials = {
    user: 'vialactea\\',
    pass: ''
  }

  return () => {return credentials}
})();
*/

//PRODUCTION: SERVIDOR CHILQUINTA WEBSITE

const env = {
    ROOT: "/",
    CSSDIRECTORY: 'css/',
    ROUTEPATH: 'index.html',
    ENVIRONMENT: 'PRODUCTION',
    WEBSERVERADDRESS: "https://chilquinta.cl/mapafallas",
    SAVEAPPLICATIONMODULE: "",
    SAVEAPPLICATIONNAME: '',
    BUILDFOR: 'EXTERNA'
}


var conf = ( () => {
  var credentials = {
    user: 'vialactea\\',
    pass: ''
  }

  return () => {return credentials}
})();

export {conf}
export default env;

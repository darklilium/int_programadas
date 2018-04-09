
import getLayer from './layers-service';
import cookieHandler from 'cookie-handler';
import $ from 'jquery';

function innerLogin(user,pass){
  var promise = new Promise((resolve,reject)=>{

    const url = getLayer.read_tokenURL();

    const data = {
      username: user,
      password: pass,
      client: 'requestip',
      expiration: 1440,
      format: 'jsonp'
    };

    $.ajax({
      method: 'POST',
      url: url,
      data: data,
      dataType: 'html'
    })
    .done(token =>{
      if(token.indexOf('Exception') >= 0) {
        reject([false,'Login incorrecto, intente nuevamente']);
      }
      if (token.indexOf('error') >= 0){
        reject([false,'Login incorrecto, intente nuevamente']);

      }

    
      cookieHandler.set('tkn',token);
      resolve([true,'OK', token]);
    })
    .fail(error => {
      console.log("Problem:" , error);
      reject([false,`Problema ${error}`]);
    });
  });

  return promise;
}

export {innerLogin}

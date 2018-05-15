function getURLParameters(){

  var params = {
    comuna: getURLParameter('comuna'),
    idsector: getURLParameter('idsector')
  }

  return params;
}

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [,""])[1].replace(/\+/g, '%20')) || null;
}

export {getURLParameters};

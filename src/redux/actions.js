const showNotification = (message) =>{
  return {
    type: "SHOW_NOTIFICATION",
    message: message
  }
}

const dismissNotification = (visible) => {
  return {
    type: "DISMISS_NOTIFICATION",
    visible: visible
  }
}

const saveRegion = (region) =>{
  return {
    type: "SAVE_REGION",
    region: region
  }
}


export {showNotification, dismissNotification, saveRegion}

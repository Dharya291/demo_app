
import React from 'react'
import { Toast, Frame } from '@shopify/polaris'

function ToastMarkup({active , toastContent, toggleToast}) {
  return (
    <div style={{ position: "absolute", top: "20px", right: "20px", zIndex: 1 }}>
      {active &&  <Toast content={toastContent} onDismiss={toggleToast} error  />}
    </div>
  )
}

export default ToastMarkup;

import React, { useEffect, useState } from 'react'
import * as EventEmitter from 'sm-event-emitter'
import { MODAL_EVENT_NAME } from '../../constants/modal-types'
import './modal.style.css'

const Modal = () => {
  const [config, setConfig] = useState({
    isVisible: false
  })

  useEffect(() => {
    EventEmitter.on(MODAL_EVENT_NAME, configReceived => {
      showModal(configReceived)
    })
  })

  const showModal = configReceived => {
    setConfig({
      ...configReceived,
      isVisible: true
    })
    if (!configReceived.isConfirm) {
      setTimeout(() => {
        hideModal(configReceived)
      }, 5000)
    }
  }

  const hideModal = () =>
    setConfig({
      isVisible: false
    })

  const onCancel = () => {
    hideModal()
    if (config.onCancelClick) config.onCancelClick()
  }

  const onConfirm = () => {
    hideModal()
    if (config.onConfirmClick) config.onConfirmClick()
  }

  return config.isVisible ? (
    <div className='modal-success-type'>
      <div className='message'>
        <button className='close-button' onClick={hideModal} />
        <div className='modal-text'>
          <div>{config.message}</div>
          <div>{config.subtitle}</div>
        </div>
        {config.isConfirm && (
          <div className='confirm-buttons'>
            <button onClick={onConfirm}>Continuar</button>
            <button className='cancel' onClick={onCancel}>
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  ) : null
}

export { Modal }

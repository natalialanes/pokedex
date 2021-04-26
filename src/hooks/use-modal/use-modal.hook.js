import * as EventEmitter from 'sm-event-emitter'
import { MODAL_EVENT_NAME } from '../../constants/modal-types'

const useModal = () => {
  return {
    showSuccessModal: ({
      message,
      subtitle,
      isConfirm,
      onConfirmClick,
      onCancelClick
    }) => {
      EventEmitter.emit(MODAL_EVENT_NAME, {
        message,
        subtitle,
        isConfirm,
        onConfirmClick,
        onCancelClick
      })
    }
  }
}
export { useModal }

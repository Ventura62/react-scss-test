import React from 'react';

import { Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';

import { CloseMark } from "src/assets/svg";

const CustomModal = ({
  size="",
  isOpen,
  changeModalState,
  header = true,
  modalTitle = 'Modal Title',
  body = true,
  footer = true,
  submitButton = true,
  submitButtonLabel = "Save",
  submitModal,
  closeButton = true,
  closeButtonLabel = "Close",
  loading,
  children
}) => {

  return (
    <Modal
      className='custom--modal'
      contentClassName={`modal--content ${size}`}
      isOpen={isOpen}
      toggle={ev => changeModalState()}>
      {header &&
        <ModalHeader
          className="modal--header"
          toggle={ev => changeModalState()}>
            {modalTitle}
        </ModalHeader>
      }
      {body &&
        <ModalBody className="modal--body">
          {children}
        </ModalBody>
      }
      {footer &&
        <ModalFooter className="modal--footer">
          {submitButton &&
            <button className="custom--button dark--button"
              onClick={ev => submitModal()}>
              {loading && <Spinner size="sm"/>}
              {submitButtonLabel}
            </button>
          }
          {closeButton &&
            <button className="custom--button dark--button"
              onClick={ev => changeModalState()}>
              {closeButtonLabel}
            </button>
          }
        </ModalFooter>
      }
    </Modal>
  )
}

export default CustomModal;
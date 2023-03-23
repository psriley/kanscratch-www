import React from 'react';

/**
 * Functional component for a modal. This is opened (most likely by a button click), 
 * and closed with a button click. Used to display simple/quick input or read-only information.
 * @function
 */
const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className='ModalContent'>
          {children}
          <button onClick={handleClose}>Close</button>
        </div>
      </section>
    </div>
  );
};

export default Modal;

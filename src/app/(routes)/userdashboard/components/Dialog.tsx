// DialogBox.tsx

import React from 'react';
import Modal from 'react-modal'

Modal.setAppElement('body');

interface DialogBoxProps {
    isOpen: boolean;
    onClose: () => void;
    children: any
}

const Dialog: React.FC<DialogBoxProps> = ({ isOpen, onClose, children }) => {
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Dialog Box"
            style={customStyles}
        >
            {children}
            <button onClick={onClose}>Close</button>
        </Modal>
    );
};

export default Dialog;

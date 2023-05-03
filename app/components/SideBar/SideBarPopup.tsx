import React, { useEffect, useState } from 'react';
import { X } from 'react-bootstrap-icons';

interface Props {
    closeHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBarPopup: React.FC<Props> = ({ closeHandler }) => {
    return (
        <div className="sidebar-popup shadow p-4 rounded">
            <button
                onClick={() => closeHandler(false)}
                className="absolute right-0 top-0 p-2 text-primary"
            >
                <X size={25} />
            </button>

            <p>Hello! This is Ayaka. </p>
            <p>Thank you for viewing my project!</p>
        </div>
    );
};

export default SideBarPopup;

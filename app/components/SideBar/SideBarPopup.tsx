import React, { useEffect, useState } from 'react';
import { X } from 'react-bootstrap-icons';

const SideBarPopup = ({ closeHandler }) => {
    useEffect(() => {}, []);

    return (
        <div className="absolute bg-white shadow p-4 rounded sidebar-popup hidden md:block">
            <button onClick={closeHandler}>
                <X />
            </button>
            Hello! This is Ayaka. Thank you for checking my project!
        </div>
    );
};

export default SideBarPopup;

import React from 'react';
import { X } from 'react-bootstrap-icons';

interface Props {
    closeHandler: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBarPopup: React.FC<Props> = ({ closeHandler }) => {
    return (
        <div className="sidebar-popup shadow p-4 rounded">
            <button
                aria-label="close"
                onClick={() => closeHandler(false)}
                className="absolute right-0 top-0 p-2 text-primary"
            >
                <X size={25} />
            </button>

            <p>Hello! This is Ayaka. </p>
            <p>Thank you for viewing my project!</p>
            {/* <a
                href="https://www.linkedin.com/in/ayakarogoza/"
                target="_blank"
                className="absolute right-0 bottom-0 p-3 text-primary"
            >
                <Linkedin
                    color="#F0A323"
                    size={15}
                />
            </a> */}
        </div>
    );
};

export default SideBarPopup;

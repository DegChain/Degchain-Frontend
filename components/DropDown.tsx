import { useState } from "react";
import Link from "next/link";
import { ConnectButton } from "web3uikit";
const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown relative inline-block">
            <button
                className="dropbtn bg-white text-black text-lg px-4 py-2"
                onClick={toggleDropdown}
            >
                Options
            </button>
            {isOpen && (
                <div className="dropdown-content absolute mt-2 bg-white rounded-md shadow-lg">
                    <Link href="/register">
                        <button className="menu-item">Register</button>
                    </Link>
                    <hr className="separator" />
                    <Link href="/login">
                        <button className="menu-item">Login</button>
                    </Link>
                    <hr className="separator" />
                    <div className="menu-item">
                        <div>
                            <ConnectButton moralisAuth={false} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown;

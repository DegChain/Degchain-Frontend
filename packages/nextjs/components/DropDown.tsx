import { useState } from "react";
import Link from "next/link";
import { ConnectButton } from "web3uikit";
import Button from "@/components/Button";

const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown relative inline-block">
            <button
                className="dropbtn bg-white text-black text-lg rounded-sm px-3 py-2"
                onClick={toggleDropdown}
            >
                Options
            </button>
            {isOpen && (
                <div className="dropdown-content absolute mt-2 mr-2 w-28 bg-white rounded-md shadow-lg overflow-visible">
                    <Link href="/register" >
                        <button className="menu-item h-12 px-3 ">Register</button>
                    </Link>
                    <hr className="separator" />
                    <Link href="/login">
                        <button className="menu-item h-12  px-3">Login</button>
                    </Link>
                    <hr className="separator" />
                    <Button />
                    
                </div>
            )}
        </div>
    );
};

export default Dropdown;

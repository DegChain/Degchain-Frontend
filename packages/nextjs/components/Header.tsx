import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Bars3Icon, BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { useOutsideClick } from "~~/hooks/scaffold-eth";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link href={href}>
      <div
        className={`${
          isActive ? "bg-secondary shadow-md" : ""
        } hover:bg-secondary hover:shadow-md focus:bg-secondary py-1.5 px-3 text-sm rounded-full gap-2`}
      >
        {children}
      </div>
    </Link>
  );
};

export const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); //dropDown == burger

  useOutsideClick(
    dropdownRef,
    useCallback(() => setIsDropdownOpen(false), []),
  );

  const navLinks = (
    <>
      <li>
        <NavLink href="/login">Login</NavLink>
      </li>
      <li>
        <NavLink href="/register">Register</NavLink>
      </li>
    </>
  );

  return (
    <nav className="sticky lg:static top-0 navbar bg-base-100 min-h-0 flex-shrink-0 justify-between z-20 shadow-md shadow-secondary px-0 sm:px-2">
      <div className="navbar-start w-auto lg:w-1/2">
        <div className="lg:hidden" ref={dropdownRef}>
          {/*this is the section for dropdown menu of small screens */}
          <label
            tabIndex={0}
            className={`ml-1 btn btn-ghost ${isDropdownOpen ? "hover:bg-secondary" : "hover:bg-transparent"}`}
            onClick={() => {
              setIsDropdownOpen(prevIsOpenState => !prevIsOpenState);
              {
                /*toggling it in reverse */
              }
            }}
          >
            <Bars3Icon className="h-1/2" />
          </label>
          {/*below code executes only when dropdown is open */}
          {isDropdownOpen && (
            <ul
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              onClick={() => {
                setIsDropdownOpen(false);
              }}
            >
              {navLinks}
            </ul>
          )}
        </div>
        <Link href="/" passHref>
          <div className="hidden lg:flex items-center gap-2 ml-4 mr-6">
            <div className="flex relative w-10 h-10">
              <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold leading-tight">DegtChain</span>
            </div>
          </div>
        </Link>
        <ul className="hidden lg:flex lg:flex-nowrap menu menu-horizontal px-1 gap-2">{navLinks}</ul>
      </div>
      <div className="navbar-end flex-grow mr-4">
        <RainbowKitCustomConnectButton />
      </div>
    </nav>
  );
};

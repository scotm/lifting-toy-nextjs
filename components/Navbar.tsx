import * as React from "react";
import Image from "next/image";
import Link from "next/link";

export interface INavbarProps {}

export default function Navbar(props: INavbarProps) {
  return (
    <nav className="bg-white shadow-lg">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <div className="flex items-center py-4 px-2">
                <Image
                  src="/logo.png"
                  alt="Lifting Logo"
                  className="mr-2 h-8 w-8"
                  width="64"
                  height="64"
                />
              </div>
              <span className="text-lg font-semibold text-gray-500">
                Lifting
              </span>
            </div>
            <div className="hidden items-center space-x-1 md:flex">
              <Link href="/" passHref>
                <span className="border-b-4 border-green-500 py-4 px-2 font-semibold text-green-500 ">
                  Home
                </span>
              </Link>
              <Link href="/exercises" passHref>
                <span className="py-4 px-2 font-semibold text-gray-500 transition duration-300 hover:text-green-500">
                  Exercises
                </span>
              </Link>
              <a
                href=""
                className="py-4 px-2 font-semibold text-gray-500 transition duration-300 hover:text-green-500"
              >
                Contact Us
              </a>
            </div>
          </div>
          {/* <div className="hidden items-center space-x-3 md:flex ">
            <a
              href=""
              className="rounded py-2 px-2 font-medium text-gray-500 transition duration-300 hover:bg-green-500 hover:text-white"
            >
              Log In
            </a>
            <a
              href=""
              className="rounded bg-green-500 py-2 px-2 font-medium text-white transition duration-300 hover:bg-green-400"
            >
              Sign Up
            </a>
          </div> */}
          <div className="flex items-center md:hidden">
            <button
              className="mobile-menu-button outline-none"
              onClick={(e) => {
                document
                  ?.querySelector(".mobile-menu")
                  ?.classList.toggle("hidden");
              }}
            >
              <svg
                className=" h-6 w-6 text-gray-500 hover:text-green-500 "
                x-show="!showMenu"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="mobile-menu hidden">
        <ul className="">
          <li className="active">
            <Link href="/" passHref={true}>
              <span className="block bg-green-500 px-2 py-4 text-sm font-semibold text-white">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href="/exercises" passHref={true}>
              <span className="block px-2 py-4 text-sm transition duration-300 hover:bg-green-500">
                Exercises
              </span>
            </Link>
          </li>
          <li>
            <a
              href="#contact"
              className="block px-2 py-4 text-sm transition duration-300 hover:bg-green-500"
            >
              Contact Us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

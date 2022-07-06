/* eslint-disable @next/next/no-img-element */
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import Link from "next/link";

function UserLoginButton() {
  const usercontext = useUser();
  const user = usercontext.user;

  return (
    <>
      {!user && (
        <Link href="/api/auth/login">
          <a className="rounded	bg-green-600 py-2 px-2 text-lg font-bold text-gray-100 transition duration-300 hover:bg-green-500 hover:text-white">
            Log In / Sign Up
          </a>
        </Link>
      )}
      {user && user.picture && (
        <Link href="/api/auth/logout">
          <a>
            <img
              className="h-12 w-12 rounded-full"
              src={user.picture}
              alt={user.name ?? ""}
            />
          </a>
        </Link>
      )}
    </>
  );
}

export interface INavbarProps {}

export default function Navbar(props: INavbarProps) {
  return (
    <nav className="bg-slate-800 shadow-lg">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <div className="flex items-center py-4 px-2">
                <Image
                  src="/logo.png"
                  alt="Lifting Logo"
                  className="mr-2 h-8 w-8"
                  width="80"
                  height="80"
                />
              </div>
            </div>
            <div className="hidden items-center space-x-1 md:flex">
              <span className="py-4 px-2 text-lg font-semibold text-gray-100">
                Lifting
              </span>
              <Link href="/" passHref>
                <a className="py-4 px-2 font-semibold text-green-500 underline">
                  Home
                </a>
              </Link>
              <Link href="/exercises" passHref>
                <a className="py-4 px-2 font-semibold text-gray-100 transition duration-300 hover:text-green-500">
                  Exercises
                </a>
              </Link>
              <a
                href=""
                className="py-4 px-2 font-semibold text-gray-100 transition duration-300 hover:text-green-500"
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="hidden items-center space-x-3 md:flex ">
            <UserLoginButton />
          </div>
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
                className=" h-6 w-6 text-gray-100 hover:text-green-500 "
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
          <li className="">
            <Link href="/" passHref={true}>
              <span className="block bg-green-500 px-2 py-4 text-sm font-semibold text-white">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link href="/exercises" passHref={true}>
              <span className="block px-2 py-4 text-sm text-white transition duration-300  hover:bg-green-500">
                Exercises
              </span>
            </Link>
          </li>
          <li>
            <Link href="#contact">
              <a className="block px-2 py-4 text-sm text-white transition duration-300  hover:bg-green-500">
                Contact Us
              </a>
            </Link>
          </li>
          <li>
            <span className="block bg-green-500 px-2 py-4 text-sm font-semibold text-white">
              <UserLoginButton />
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
}

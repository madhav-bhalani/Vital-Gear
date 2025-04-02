import React from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useModal } from "../ModalContext";

export default function Breadcrumb({ productTitle }) {
  const location = useLocation();
  const state = location.state;
  const { bread } = useModal();

  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600">
        <li className="flex items-center">
          <NavLink
            to="/"
            href="#"
            className="flex h-10 items-center gap-1.5 bg-[#112D4E] text-[#DBE2EF] px-4 transition "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>

            <span className="ms-1.5 text-md font-medium"> Home </span>
          </NavLink>
        </li>

        <li className="relative flex items-center">
          <span className="absolute inset-y-0 -start-px h-10 w-4 bg-[#112D4E] [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>

          <NavLink
            to={`/${state}`}
            className="flex h-10 items-center bg-[#3F72AF] pe-4 ps-8 text-sm font-medium transition text-[#DBE2EF]"
          >
            {state}
          </NavLink>
        </li>

        <li className="relative flex items-center">
          <span className="absolute inset-y-0 -start-px h-10 w-4 bg-[#3F72AF] [clip-path:_polygon(0_0,_0%_100%,_100%_50%)] rtl:rotate-180"></span>

          <NavLink
            className={`flex h-10 items-center bg-[#DBE2EF] pe-4 ps-8 text-sm font-medium transition text-[#112D4E] ${
              bread ? "visible" : "hidden"
            }`}
          >
            {productTitle}
          </NavLink>
        </li>
      </ol>
    </nav>
  );
}

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ThemeToggler } from "./ThemeToggler";
import SearchInput from "./SearchInput";
import GenreDropdown from "./GenreDropdown";

function Header() {
  return (
    <header
      className="fixed w-full top-0 flex items-center justify-between p-5 bg-gradient-to-t from-gray-200/0 via-gray-900/55 to-gray-900"
      style={{ zIndex: 60 }}
    >
      <Link href="/" className="mr-10">
        <Image src="https://links.papareact.com/a943ae" alt="Disney Logo" width={120} height={100} className="cursor-pointer invert-0 dark:invert" />
      </Link>
      <div className="flex items-center space-x-4">
        {/* genre dropdown */}
        <GenreDropdown />
        {/* search bar */}
        <SearchInput />
        {/* theme switch */}
        <ThemeToggler />
      </div>
    </header>
  );
}

export default Header;

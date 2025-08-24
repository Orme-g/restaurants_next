import React from "react";
import Link from "next/link";

const Header: React.FC = () => {
    return (
        <header>
            <span>This is Header</span>
            <nav>
                <Link href="/">На Главную</Link>
                <Link href="/about">About</Link>
            </nav>
        </header>
    );
};

export default Header;

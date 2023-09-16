import React, { useEffect, useState } from 'react';
import NavItem from './NavItem';

type HeaderProps = {
    onClickNav: any
}

const navItems = [
    {
        path: "/",
        name: "Home",
    },
    {
        path: "/guestbook",
        name: "Guestbook",
    },
    {
        path: "/writing",
        name: "Writing",
    },
    {
        path: "/login",
        name: "Login",
    },
];


const Header: React.FC<HeaderProps> = ({ onClickNav }) => {
    const [pathname, setPathName] = useState<string | undefined>();

    useEffect(() => {
        setPathName(window.location.pathname);
        // console.log("window.location.pathname ", window.location.pathname)
    }, [pathname]);

    const handleNavClick = (item) => {
        setPathName(item.path);
        onClickNav(item.name, item.path)
    }

    return (
        <div className="header">
            <nav className="nav-header">
                {navItems.map((item, index) => {
                    let isActive = item.path === pathname;
                    return <NavItem item={item} key={index} isActive={isActive} onClick={handleNavClick} />
                })}
            </nav>
        </div>
    )
}

export default Header
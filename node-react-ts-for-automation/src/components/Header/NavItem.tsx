import React from 'react';

interface ItemProps {
    name: string,
    path: string,
}

const NavItem: React.FC<{ item: ItemProps, isActive: boolean, onClick: any }> = ({ item, isActive, onClick }) => {

    const handleClick = (e) => {
        e.preventDefault();
        onClick(item);
    }

    return (
        <div
            className={`item-nav-header ${isActive && "active"}`}
            onClick={handleClick}
        >
            <span>{item.name}</span>
        </div>
    )
}

export default NavItem
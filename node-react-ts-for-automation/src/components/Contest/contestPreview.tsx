import React, { useState } from "react";

export interface IContestProps {
    id: string,
    categoryName: string,
    contestName: string,
}

const ContestPreview: React.FC<{ contest: IContestProps, onClick: any, onClickDelete: any }> = ({ contest, onClick, onClickDelete }) => {
    const [isShowMenu, setIsShowMenu] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        onClick(contest.id);
    }

    const handleClickDelete = (e) => {
        e.preventDefault();
        onClickDelete(contest.id);
    }

    const handleActive = (e) => {
        e.preventDefault();
    }

    return (
        <div className="contest-preview" >
            <div className="group-contest" onClick={handleClick}>
                <div className="category-name" >
                    <h5>{contest.categoryName}</h5>
                </div>
                <div className="contest-name">
                    <p>{contest.contestName}</p>
                </div>
            </div>
            <div className="menu" onMouseLeave={() => setIsShowMenu(false)}>
                <div className="menu__wrapper" onClick={() => setIsShowMenu(true)}>
                    <div className="menu__item--meatball">
                        <div className="circle"></div>
                        <div className="circle"></div>
                        <div className="circle"></div>
                    </div>
                </div>
                {isShowMenu &&
                    <div className='dropdown-content'>
                        <a href="#" onClick={handleActive}>Active</a>
                        <a href="#" onClick={handleActive}>Deactive</a>
                        <a href="#" onClick={handleClickDelete}>Delete</a>
                    </div>
                }
            </div>
        </div>
    )
}

export default ContestPreview
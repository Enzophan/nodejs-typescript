
import { useEffect, useState, useCallback } from 'react';
import ContestPreview, { IContestProps } from './contestPreview';
import { addNewContest, fetchContestList, deleteContest } from '../../api-client';
import Modal from '../Modal';

interface ContestListProps {
    initialContests: IContestProps[],
    onContestClick: () => void,
    reloadContests: boolean
}

const ContestList = ({ initialContests, onContestClick, reloadContests }) => {
    const [contests, setContests] = useState(initialContests ?? []);
    const [toggleNewContest, setToggleNewContest] = useState<boolean>(false);
    const [toggleRemoveContest, setToggleRemoveContest] = useState<boolean>(false);

    useEffect(() => {
        if (!initialContests || reloadContests) {
            fetchContestList().then((contests) => {
                setContests(contests)
            })
        }
    }, [initialContests, reloadContests]);

    // useEffect(() => {
    //     if (reloadContests) {
    //         fetchContestList().then((contests) => {
    //             setContests(contests)
    //         })
    //     }
    // }, [reloadContests]);

    const handleCloseModalBtn = useCallback(() => {
        setToggleNewContest(false)
    }, [toggleNewContest]);

    const handleDeleteContest = async (contestId) => {
        const result = await deleteContest(contestId);
        const newContests = contests.filter(contest => contest.id !== result.id);
        setContests(newContests);
    };

    const handleNewContestSubmit = async (e) => {
        e.preventDefault();
        const { contestName, categoryName, url, thumbnailUrl, description } = e.target;
        const contests = await addNewContest({
            contestName: contestName.value,
            categoryName: categoryName.value,
            url: url.value,
            thumbnailUrl: thumbnailUrl.value,
            description: description.value
        });
        setContests(contests);
        setToggleNewContest(false);
    };

    const bodyModal = (
        <form
            onSubmit={handleNewContestSubmit}
        >
            <input type="text" name="categoryName" placeholder="New Category Here..." />
            <input type="text" name="contestName" placeholder="New Name Here..." />
            <input type="text" name="url" placeholder="Url Here..." />
            <input type="text" name="thumbnailUrl" placeholder="Thumbnai Here..." />
            <textarea name="description" placeholder="Description Here..." style={{ height: "150px" }} />
            <div className="group-btn">
                <button className="btn pri-btn" type="submit">Add</button>
                <button className="btn second-btn" type="reset" onClick={handleCloseModalBtn}>Cancel</button>
            </div>
        </form>
    )


    return (
        <div className="container">
            <div className="group-btn">
                <button className="pri-btn btn" onClick={() => setToggleNewContest(!toggleNewContest)}>{toggleNewContest ? "Collapse" : "Expand"} New</button>
                {/* <button className="second-btn btn" onClick={() => setToggleRemoveContest(!toggleRemoveContest)}>{toggleRemoveContest ? "Hide" : "Show"} Remove</button> */}
            </div>
            <div className="contest-list">
                {contests.map((contest) => {
                    return <ContestPreview key={contest.id} contest={contest} onClick={onContestClick} onClickDelete={handleDeleteContest} />
                })}
            </div>
            {toggleNewContest && <Modal title='Add Contest' subTitle='Please enter contest' onClickClose={handleCloseModalBtn} >{bodyModal}</Modal>}
        </div>
    )
}

export default ContestList
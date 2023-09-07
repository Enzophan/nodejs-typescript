import { useEffect, useState } from 'react';
import { addNewNameToContest, fetchContest } from '../../api-client';

const Contest = ({ initialContest, onContestListClick }) => {
    const [contest, setContest] = useState(initialContest);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (!contest.names) {
            fetchContest(initialContest.id).then((data) => {
                setContest(data);
            })
        }
    }, [contest.id, contest.names]);

    const handleClickContestList = (e) => {
        e.preventDefault();
        onContestListClick();
    }

    const handleClickAddNewName = (e) => {
        e.preventDefault();
        setShowModal(!showModal)
    }

    const handleNewNameSubmit = async (e) => {
        e.preventDefault();
        const newNameInput = e.target.newName;
        if(!newNameInput.value) {
            return;
        }
        const response = await addNewNameToContest({ id: contest.id, newNameValue: newNameInput.value });
        setContest(response);
        setShowModal(!showModal);
    }

    return (
        <div className="container">
            <div className="group-btn">
                <div className="backBtn">
                    <a href="/" className="link" onClick={handleClickContestList}>
                        <span>Contest List</span>
                    </a>
                </div>

                <div className="addBtn">
                    <a href="/" className="link" onClick={handleClickAddNewName}>
                        <span>Add Name</span>
                    </a>
                </div>
            </div>

            <div className="contest-details">
                <div className="category">
                    <h3>{contest.contestName}</h3>
                </div>
                <div className="description">
                    <p>{contest.description}</p>
                </div>
                <div className="names">
                    {contest.names?.length > 0 ? contest.names.map(item => (
                        <div key={item.id}>
                            <p>{item.name}</p>
                        </div>
                    )) :
                        <div><p>No name</p></div>
                    }
                </div>
            </div>

            {showModal &&
                (<div className="modal">
                    <div className="modal-title">
                        <div className="group-title">
                            <div className="title">Add New Name</div>
                            <div className="sub-title">Please enter this form</div>
                        </div>
                        <span className="close" onClick={handleClickAddNewName}>&times;</span>
                    </div>
                    <div className="modal-content">
                        <form onSubmit={handleNewNameSubmit}>
                            <div className="input">
                                <label className="text"><b>Name <span className="icon-required">*</span></b></label>
                                <input type="text" name="newName" placeholder="New Name Here..." required />
                            </div>
                            <button type="submit" className={`pri-btn btn`}>Add</button>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <span> (<span className="icon-required">*</span>) Required input</span>
                    </div>
                </div>)
            }


        </div>
    )
}

export default Contest

import { useState, useEffect } from 'react';
import Header from './Header';
import Contest from './Contest/contest';
import ContestList from './Contest/contestList';
import LoginPage from './Login';
import GuestbookPage from './Guestbook';
import WritingPage from './Writing';
import Footer from './Footer';
import { ssEvents } from '../api-client';
import ToastList from './Toast/ToastList';

export interface IToast {
    id: string;
    message: string;
    type: string;
}


const App = ({ initialData }) => {
    initialData.path.replace(/\//g, "")
    const [page, setPage] = useState<"contestList" | "contest" | "login" | "guestbook" | "writing">(
        initialData.currentContest ? "contest" :
            initialData.path === "/" ?
                "contestList" : initialData.path.replace(/\//g, "")
    );
    // const [page, setPage] = useState<"contestList" | "contest" | "login">(
    //     initialData.currentContest ? "contest" : "contestList"
    // );
    const [currentContest, setCurrentContest] = useState<object | undefined>(initialData.currentContest);

    const [toasts, setToasts] = useState<IToast[]>([]);
    const [autoClose, setAutoClose] = useState<boolean>(true);
    const [autoCloseDuration, setAutoCloseDuration] = useState<number>(5);
    const [position, setPosition] = useState("top-right");
    const [reloadContest, setReloadContest] = useState<boolean>(false)

    const positions = {
        "top-right": "Top-right",
        "top-left": "Top-left",
        "bottom-right": "Bottom-right",
        "bottom-left": "Bottom-left",
    };

    useEffect(() => {
        window.onpopstate = (event) => {
            const newPage = event.state?.contestId ? "contest" : "contestList";
            setPage(newPage);
            setCurrentContest({ id: event.state?.contestId });
        }
    }, []);

    useEffect(() => {
        ssEvents.addEventListener("message", (e) => { })
        ssEvents.addEventListener("contest", (e) => {
            console.log("ssEvents contest: ", e.data);
            if (e.data) {
                showToast("Have new contest!", "success")
                setReloadContest(true);
            }
        })

        ssEvents.addEventListener("notification_admin", (e) => {
            console.log("ssEvents notification_admin: ", e.data);
            const sseData = JSON.parse(e.data);
            if (sseData && sseData.message) {
                showToast(sseData.message, "info");
                setReloadContest(true);
            }
        })

        ssEvents.onopen = (e) => {
            console.log("ssEvents onopen: ", e);
        }
        ssEvents.onerror = (e) => {
            console.log("ssEvents onerror: ", e);
        }

        return () => {
            ssEvents.close();
        }
    }, []);

    const showToast = (message: string, type: string) => {
        const toast = {
            id: Date.now().toString(),
            message,
            type
        };

        setToasts((prev) => [...prev, toast]);

        if (autoClose) {
            setTimeout(() => {
                removeToast(toast.id);
                setReloadContest(false);
            }, autoCloseDuration * 1000)
        }
    };

    const removeToast = (id: string) => {
        setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    };

    // const removeAllToasts = () => {
    //     setToasts([]);
    // };


    const navigateToContest = (contestId) => {
        setPage("contest");
        setCurrentContest({ id: contestId });
        window.history.pushState({ contestId }, "", `/contest/${contestId}`)
    }

    const navigateToContestList = () => {
        setPage("contestList");
        setCurrentContest(undefined);
        window.history.pushState({}, "", "/")
    }

    const navigateToPage = (pageName, path) => {
        setPage(pageName.toLowerCase() === "home" ? "contestList" : pageName.toLowerCase());
        setCurrentContest(undefined);
        window.history.pushState({}, "", path)
    }

    const pageContent = () => {
        switch (page) {
            case "contestList":
                return <ContestList initialContests={initialData.contests} onContestClick={navigateToContest} reloadContests={reloadContest} />
            case "contest":
                return <Contest initialContest={currentContest} onContestListClick={navigateToContestList} />
            case "login":
                return <LoginPage />
            case "guestbook":
                return <GuestbookPage />
            case "writing":
                return <WritingPage />
        }
    }

    return (
        <div className="main">
            <Header onClickNav={navigateToPage} />
            <div className="content">
                <ToastList data={toasts} position={position} removeToast={removeToast} />
                {pageContent()}
                {/* <button onClick={() => showToast("Have new contest!", "success")}>Show Toast </button> */}
            </div>
            <Footer message={"I'm Zinzo"} />
        </div>
    )
}


export default App
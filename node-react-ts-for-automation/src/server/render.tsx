import ReactDOMServer from "react-dom/server";
import { fetchContest, fetchContestList } from "../api-client";
import App from "../components/app";

const serverRender = async (req) => {
    const { contestId } = req.params;
    const initialData = contestId ?
        { currentContest: await fetchContest(contestId), path: req.path }
        : { contests: await fetchContestList(), path: req.path };

    const initialMarkup = ReactDOMServer.renderToString(
        <App initialData={initialData} />
    );

    return { initialMarkup, initialData };
}

export default serverRender
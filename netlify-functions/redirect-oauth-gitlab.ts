import { Handler } from "@netlify/functions";

const handler: Handler = async (_event, _context) => {
    try {
        let {
            GITLAB_REDIRECT,
            GITLAB_CLIENT_ID,
            GITLAB_OAUTH_AUTH} = process.env;
        return {
            statusCode: 200,
            headers: {
                "Response-Type": "application/json",
            },
            body: JSON.stringify({
                url: `${GITLAB_OAUTH_AUTH}?client_id=${GITLAB_CLIENT_ID}&response_type=code&redirect_uri=${GITLAB_REDIRECT}`
            }),
        };
    }
    catch (e:any) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: `error : ${e.message}`,
            }),
        };
    }
};

export { handler };
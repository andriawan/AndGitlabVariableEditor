import { Handler } from "@netlify/functions";
import fetch from "cross-fetch";

const handler: Handler = async (event, _context) => {
    try {
        let { GITLAB_OAUTH_ENDPOINT,
            GITLAB_REDIRECT,
            GITLAB_CLIENT_ID,
            GITLAB_SECRET } = process.env;
        
        let param: URLSearchParams;
        let data_post = JSON.parse(event.body ? event.body : "{}");

        param = new URLSearchParams({
            client_id: GITLAB_CLIENT_ID || "",
            client_secret: GITLAB_SECRET || "",
            redirect_uri: GITLAB_REDIRECT || "",
            refresh_token: data_post.refresh_token || "",
            grant_type: data_post.grant_type || ""
        });
            
        let data = await fetch(GITLAB_OAUTH_ENDPOINT || "", {
            method: "POST",
            body: param,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            }
        })
        let token = await data.json();
        return {
            statusCode: 200,
            body: JSON.stringify(token),
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
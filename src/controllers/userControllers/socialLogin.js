import User from "../../models/User";
import fetch from "node-fetch";
import { async } from "regenerator-runtime";

export const kakaoLoginStart = async (req, res) => {
    const baseUrl = "https://kauth.kakao.com/oauth/authorize";

    const config = {
        client_id: process.env.KA_CLIENT,
        redirect_uri: "http://localhost:4002/user/kakao/finish",
        response_type: "code",
        prompt: "profile_nickname,profile_image,account_email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
};
export const kakaoLoginFinish = async (req, res) => {
    const baseUrl = "https://kauth.kakao.com/oauth/token";

    const {
        query: { code },
    } = req;

    const config = {
        grant_type: "authorization_code",
        client_id: process.env.KA_CLIENT,
        redirect_uri: "http://localhost:4002/user/kakao/finish",
        code,
    };

    const params = new URLSearchParams(config).toString();

    const finalUrl = `${baseUrl}?${params}`;

    const requestToken = await (
        await fetch(finalUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        })
    ).json();

    if ("access_token" in requestToken) {
        const { access_token } = requestToken;
        const apiUrl = "https://kapi.kakao.com/v2/user/me";

        const userdata = await (
            await fetch(apiUrl, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            })
        ).json();

        const {
            kakao_account: {
                email,
                profile: { nickname, profile_image_url },
            },
        } = userdata;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                username: nickname,
                email,
                password: "Don't availablePassword12",
                avatarUrl: profile_image_url,
                socialOnly: true,
                socialType: "Kakao",
            });
        }

        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    } else {
        return res.redirect("/login");
    }
};

export const gitLoginStart = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";

    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email user:follow",
    };

    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;

    //github에 요청을 보내면 설정한 callback주소로 redirect 시켜줌("/user/github/finish")
    return res.redirect(finalUrl);
};

export const gitLoginFinish = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const {
        query: { code },
    } = req;
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code,
    };

    const params = new URLSearchParams(config).toString();

    const requestToken = await (
        await fetch(`${baseUrl}?${params}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        })
    ).json();

    if ("access_token" in requestToken) {
        const { access_token } = requestToken;
        const apiUrl = "https://api.github.com";

        const userDate = await (
            await fetch(`${apiUrl}/user`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();

        const userEmail = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();

        const userFollow = await (
            await fetch(`${apiUrl}/user/followers`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();

        let followList = [];

        for (let i = 0; i < userFollow.length; i++) {
            const followObj = {
                username: userFollow[i].login,
                avatarUrl: userFollow[i].avatar_url,
                homepageUrl: userFollow[i].html_url,
            };

            followList.push(followObj);
        }

        const emailObj = userEmail.find(
            (email) => email.primary === true && email.verified === true
        );

        let user = await User.findOne({ email: emailObj.email });

        if (!user) {
            user = await User.create({
                username: userDate.name,
                email: emailObj.email,
                password: "Don't availablePassword12",
                location: userDate.location,
                avatarUrl: userDate.avatar_url,
                socialFollowingUser: followList,
                socialOnly: true,
                socialType: "github",
            });
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    } else {
        return res.redirect("/login");
    }
};

import {
    Router
} from "express";
import axios from "axios";

const reCaptchaRouter = new Router();

reCaptchaRouter.post('/recaptcha', async (req, res) => {
    const {
        token
    } = req.body;

    await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_CAPTCHA_KEY}&response=${token}`
    );

    if (res.status(200)) {
        res.send("Human");
    } else {
        res.send("Robot");
    }
})

export default reCaptchaRouter;
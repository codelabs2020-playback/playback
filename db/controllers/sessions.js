const User = require('../models/user');
const Session = require('../models/session');
const Comment = require('../models/comment');

module.exports = (app) => {
    // check the database to see if the session 'roomID' is unique,
        // based on the videoUrl and pageUrl
    app.post("/api/v1/session/unique", (req, res) => {
            Session
            .find({ roomID: req.body.roomID, videoUrl: req.body.videoUrlSrc, pageUrl: req.body.pageUrl  })
            .then( sessions => {
                if (sessions.length == 0) {
                    json =  {unique:1};
                } else {
                    json =  {unique:0};
                }
                res.send(JSON.stringify(json));
            })
        });
};

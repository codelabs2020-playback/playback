const Session = require('../models/session');
const Comment = require('../models/comment');

module.exports = function(app) {
    // CREATE
        app.post("/comment/new", (req, res) => {
            if (req.user) {
                message = req.body.content != ""
                if (message) {
                    var newComment = new Comment();
                    newComment.authorName = req.user.username
                    newComment.author = req.user._id;
                    newComment.content = req.body.content;
                    newComment.timeStamp = Math.random(); // placeholder
                    newComment.save()
                    .then( user => { res.redirect('/'); } )
                    .catch( err => { console.log(err.message); } );
                }
            } else {
                return res.status(401); // UNAUTHORIZED
            }
        });
    // READ -- INDEX
    // just for proof of concept to show that it works.
    app.get('/', (req, res) => {
        if (req.user) {
            Comment
            .find() // finds all Comment documents in the collection in the database
            .lean() // turns the mongoose object(s) into JSON
            .then( comments => { res.render( 'index', {comments: comments, user: req.user});}) // passes the JSON object(s) as the variable 'comments'
            .catch( err => { console.log(err.message); })
        } else {
            res.redirect('/login');
        }
    })
    app.post("/api/v1/comment/new", (req, res) => {
            message = req.body.content != ""
            console.log(req.body)
            if (message) {
                let newComment = new Comment();
                newComment.authorName = req.body.username
                newComment.content = req.body.content
                newComment.timeStamp = 1
                newComment.save()
                .then( comment => {
                    // use these fields to see if there is a matching Session in the db.
                        // if there is not a matching Session in the db, create a new Session object
                    // add the new comment object to the Session object 'comments' array
                    Session
                    .find({ roomID: req.body.roomID, videoUrl: req.body.videoUrlSrc, pageUrl: req.body.pageUrl  })
                    .then( sessions => {
                        if (sessions.length == 0) {
                            let session = new Session();
                            session.roomID = req.body.roomID;
                            session.videoUrl = req.body.videoUrlSrc;
                            session.pageUrl = req.body.pageUrl;
                            session.save()
                            .then( () => {return res.status(200);} )
                            .catch( err => { console.log(err.message); return res.status(400); } );
                        } else {
                            session = sessions[0];
                            // append the new comment object to the session object.
                            session.comments.push(comment);
                            session.save()
                            .then( () => {return res.status(200);} )
                            .catch( err => { console.log(err.message); return res.status(400); } );
                        }
                    })
                })
            } else {
                return res.status(400); // BAD REQUEST.
            }
        });

    // UPDATE. do we want users to be able to EDIT their past comments?
    // DELETE. do we want users to be able to DELETE their past comments?
};

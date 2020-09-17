module.exports = (req, res, next) => {
    if(req.user.credits <= -3) {
        return res.status(403).send({error: "Not enough credits!"});
    }

    next();
}
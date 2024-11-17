const fs = require("fs")

function logReqRes(filename) {
    return (req, res, next) => {
        fs.appendFile(
            filename,
            `\n ${Date.now()}  : ${req.ip} ${req.method} : ${req.path}\n`,
            (err, data) => {
                next();
            }
        )
    }
}

function checkAge(req, res, next) {
    if (!req.query.age) {
        res.json({ msg: "Please Provide your Age" });
    } else if (req.query.age < 18) {
        res.json({ msg: "Your are Under Aged" });
    } else {
        next();
    }
}

module.exports = { logReqRes , checkAge }
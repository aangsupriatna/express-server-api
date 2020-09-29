async function getUser(req, res) {
    res.status(200).json({ message: "Hello, getUser!" })
};

async function postUser(req, res) {
    const request = req.body
    res.status(200).json({ message: "Hello, postUser!", request })
}

module.exports = {
    getUser,
    postUser
}
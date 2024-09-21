const emilyroute = (req, res) => {
    res.send('hello Emily');
};

const hannaroute = (req, res) => {
    res.send('hello Anna');
};

module.exports = {
    emilyroute,
    hannaroute
};
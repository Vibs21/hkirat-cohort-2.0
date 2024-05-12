// data base connect to check
// middle ware is a fucntion which consitis of req, res, next


export const isTransactionAthenticated = (req, res, next) => {
    next();
}

module.exports = isTransactionAthenticated;
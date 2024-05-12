

const isUserAthenticated = (req, res, next) => {
    console.log('isUserAthenticated calling in!!!')
    next();
}


module.exports = isUserAthenticated
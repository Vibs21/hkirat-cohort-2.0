import propTypes from 'prop-types';

function Header ({title}) {

    return(
        <>
            <h1> Title is {title} </h1>
        </>
    )
}

Header.propTypes = {
    title: propTypes.string.isRequired
}

export default Header;
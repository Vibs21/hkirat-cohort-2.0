function CardWrapper ({innerComponent, children}) {
    return (
        <div className='card-parent'>
            hello
            {innerComponent}

            {children}
        </div>
    )
}

export default CardWrapper;
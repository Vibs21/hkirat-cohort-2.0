function CardWrapper ({innerComponent}) {
    return (
        <div className='card-parent'>
            hello
            {innerComponent}
        </div>
    )
}

export default CardWrapper;
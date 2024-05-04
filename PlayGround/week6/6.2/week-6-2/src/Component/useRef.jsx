import {  useEffect, useRef, useState } from 'react';

function UseRef() {
    const [incomeTax, setIncomeTax] = useState(2000);
    const divRef = useRef();

    useEffect( ()=> {
            setTimeout(() => {
                divRef.current.innerHTML = 10;
            },2000)
    }, [])

    

    return (
        <div>
            Hi, your incometax is: <p ref={divRef}>{incomeTax}</p>
        </div>
    )
}

export default UseRef;


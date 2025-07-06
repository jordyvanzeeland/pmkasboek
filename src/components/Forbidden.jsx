import React from "react"

const Forbidden = () => {
    return(
        <div className='card'>
            <h1><i class="fas fa-exclamation-circle"></i> Verboden toegang</h1>
            <p style={{ margin: '10px 0 0 0' }}>Je hebt geen permissie om deze pagina in te zien.</p>
        </div>
    )
}

export default Forbidden;
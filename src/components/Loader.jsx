import React from "react"

const Loader = () => {
    return(
        <div className='loader_container'>
            <div className='loader-icon'>
                <div class="loader"></div>
            </div>
            <span>Data wordt geladen...</span>
        </div>
    )
}

export default Loader;
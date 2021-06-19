import React,{useContext} from 'react'
import {GlobalState} from '../../../GlobalState'

//check if result > 9, when user click button loadmore then set page+=1
const LoadMore = () => {
    const state=useContext(GlobalState)
    const [page, setPage]= state.productsAPI.page
    const result= state.productsAPI.result
    return (
        <div className='load_more'>
            {
                (result<9)?''
                :   <button onClick={()=>setPage(page+1)}>Load More</button>
            }
            
        </div>
    )
}

export default LoadMore

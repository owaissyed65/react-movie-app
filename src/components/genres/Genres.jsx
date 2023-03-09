import React from 'react'
import { useSelector } from 'react-redux'
import './styles.scss'
const Genres = ({ data }) => {
    const { genres } = useSelector((state) => state.home)
    return (
        <div className='genres'>
            {data?.map((curEle) => {
                if (!genres[curEle]?.name) return;
                return (
                    <div key={curEle} className="genre">
                        {genres[curEle]?.name}
                    </div>
                )
            })}
        </div>
    )
}

export default Genres

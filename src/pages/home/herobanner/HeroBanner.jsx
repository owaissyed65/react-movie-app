import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import Img from '../../../components/lazyLoad/Img';
import useFetch from '../../../hooks/useFetch';

import './styles.scss'
const HeroBanner = () => {
    const [background, setBackground] = useState('');
    const [query, setQuery] = useState('');
    const navigate = useNavigate()
    const { url } = useSelector(state => state.home)
    const { data, loading } = useFetch('/movie/upcoming')
    const inputRef = useRef()
    const searchQueryHandler = (e) => {
        if (e.key === 'Enter' && query.length > 0) {
            navigate(`/search/${query}`)
        }
        inputRef.current.placeholder = 'Search for a movies or a tv show....'
        inputRef.current.classList.remove('color')
    }
    const handleOnClick = (e) => {
        if (query.length > 0) {
            navigate(`/search/${query}`)
            inputRef.current.placeholder = 'Search for a movies or a tv show....'
        }
        else {
            inputRef.current.placeholder = 'Please Write Some Query'
            inputRef.current.classList.add('color')
        }
    }
    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path
        setBackground(bg)
    }, [data, url]);
    return (
        <div className="heroBanner">
            {!loading && <div className="backdrop-img">
                <Img src={background} />
            </div>}
            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome😊</span>
                    <span className="subTitle">
                        Millions of Movies, Tv Shows and People to discover.
                        Explore Now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder='Search for a movies or a tv show....'
                            onKeyUp={searchQueryHandler}
                            onChange={(e) => setQuery(e.target.value)}
                            value={query}
                            ref={inputRef}
                        />
                        <button onClick={(e) => handleOnClick(e)} >Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div >
    )
}

export default HeroBanner

import React, { useEffect, useState } from 'react'
import Carousel from '../../../components/carousel/Carousel';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import SwitchTabs from '../../../components/switchTab/SwitchTabs'
import useFetch from '../../../hooks/useFetch';
const CarouselContainer = ({ dataArray, crouselTitle, end, id, mediaType }) => {

    const [endPoint, setEndPoint] = useState(
        end === 'trending' ? 'day' : end === 'popular' ? 'movie' :
            end === "top_rated" ? 'movie' : ''
    );
    const { data, loading } = useFetch(
        end === 'trending' ? `/${end}/all/${endPoint}` : end === 'popular' ? `/${endPoint}/${end}` : end === 'top_rated' ? `/${endPoint}/${end}` : end = 'similar' ? `/${mediaType}/${id}/${end}` : ''
    )
    const onTabChange = (tab, index) => {
        setEndPoint(tab === 'tv shows' ? 'tv' : tab)
    }
    return (
        <div className='crouselSection'>
            <ContentWrapper>
                <span className="crouselTitle">{crouselTitle}</span>
                {!mediaType &&
                    <SwitchTabs data={dataArray} onTabChange={onTabChange} />
                }
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
        </div>
    )
}

export default CarouselContainer

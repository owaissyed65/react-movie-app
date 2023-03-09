import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import CarouselContainer from '../home/carouselContainer/CarouselContainer'
import Cast from './cast/Cast'
import DetailsBanner from './detailsBanner/DetailsBanner'
import './styles.scss'
import VideosSection from './videoSection/VideoSection'
const Details = () => {
    const { mediaType, id } = useParams()
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)
    const { data: credits, loading: creditLoading } = useFetch(`/${mediaType}/${id}/credits`)
    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
            <Cast data={credits?.cast} loading={creditLoading} />
            <VideosSection data={data} loading={loading} />
            <CarouselContainer mediaType={mediaType} id={id} end={'similar'} crouselTitle={"Similar"} />
            <CarouselContainer mediaType={mediaType} id={id} end={'recommendations'} crouselTitle={"Recommendations"} />
        </div>
    )
}

export default Details

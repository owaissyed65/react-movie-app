import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoad/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./styles.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const Carousel = ({ data, loading, endPoint }) => {
    const crouserlContainer = useRef();
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const navigation = (dir) => {
        const container = crouserlContainer.current;
        const scrollAmount = dir === 'left' ? container.scrollLeft - (container.offsetWidth + 20) : container.scrollLeft + (container.offsetWidth + 20)
        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        })
    };
    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>

            </div>
        )
    }
    return (
        <div className="carousel">
            <ContentWrapper>
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {!loading ?
                    (
                        <div className="carouselItems" ref={crouserlContainer}>
                            {
                                data?.map((curEle) => {
                                    const posterUrl = curEle.poster_path ? url.poster + curEle.poster_path : PosterFallback
                                    return (
                                        <div className="carouselItem" key={curEle.id} onClick={() => navigate(`/${curEle.media_type || endPoint}/${curEle.id}`)}>
                                            <div className="posterBlock">
                                                <Img src={posterUrl} />
                                                <CircleRating rating={curEle.vote_average.toFixed(1)} />
                                                <Genres data={curEle.genre_ids.length > 2 ? curEle.genre_ids.splice(0, 2) : curEle.genre_ids} />
                                            </div>
                                            <div className="textBlock">
                                                <span className="title">
                                                    {curEle.title || curEle.name}
                                                </span>
                                                <span className="date">
                                                    {dayjs(curEle.release_Date).format('MMM, ddd YYYY')}
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ) : (
                        <div className="loadingSkeleton">
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                            {skItem()}
                        </div>
                    )
                }
            </ContentWrapper>
        </div>
    );
};

export default Carousel;

import React, { useRef, useState } from "react";

import "./styles.scss";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { PlayIcon } from "../PlayBtn";
import VideoPopup from "../../../components/videoPopup/VideoPopup";
import Img from "../../../components/lazyLoad/Img";

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);
    const crouserlContainer = useRef();

    const navigation = (dir) => {
        const container = crouserlContainer.current;
        const scrollAmount = dir === 'left' ? container.scrollLeft - (container.offsetWidth) : container.scrollLeft + (container.offsetWidth)
        
        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        })

    };
    const loadingSkeleton = () => {
        return (
            <div className="skItem">
                <div className="thumb skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };

    return (
        <div className="videosSection">
            <ContentWrapper>
                {data?.results?.length > 4 && <>
                    <BsFillArrowLeftCircleFill
                        className="carouselLeftNav arrow"
                        onClick={() => navigation("left")}
                    />
                    <BsFillArrowRightCircleFill
                        className="carouselRighttNav arrow"
                        onClick={() => navigation("right")}

                    />
                </>
                }
                <div className="sectionHeading">Official Videos</div>

                {!loading ? (
                    <div className="videos" ref={crouserlContainer}>
                        {
                            data?.results?.map((video) => {
                                return (
                                    <div className="videoItem"
                                        key={video.id}
                                        onClick={() => {
                                            setShow(true)
                                            setVideoId(video?.key)
                                        }}

                                    >
                                        <div className="videoThumbnail">
                                            <Img src={`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`} />
                                            <PlayIcon />
                                        </div>
                                        <div className="videoTitle">
                                            {video?.name}
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={videoId} />
                    </div>
                ) : (
                    <div className="videoSkeleton">
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                        {loadingSkeleton()}
                    </div>
                )}
            </ContentWrapper>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;
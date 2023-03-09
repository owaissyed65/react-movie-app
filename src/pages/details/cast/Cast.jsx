import React, { useRef } from "react";
import { useSelector } from "react-redux";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import "./styles.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoad/Img";
import avatar from "../../../assets/avatar.png";

const Cast = ({ data, loading }) => {
    const { url } = useSelector((state) => state.home);
    const crouserlContainer = useRef();
    const navigation = (dir) => {
        const container = crouserlContainer.current;
        const scrollAmount = dir === 'left' ? container.scrollLeft - (container.offsetWidth) : container.scrollLeft + (container.offsetWidth)
        // console.log(scrollAmount);
        container.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        })

    };
    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Top Cast</div>
                {data?.cast?.length > 4 && <> <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                    <BsFillArrowRightCircleFill
                        className="carouselRighttNav arrow"
                        onClick={() => navigation("right")}

                    />
                </>
                }
                {!loading ? (
                    <div className="listItems" ref={crouserlContainer}>
                        {
                            data?.map((curEle) => {
                                const profile = curEle?.profile_path ? url.profile + curEle?.profile_path : avatar
                                return (
                                    <div key={curEle?.id} className='listItem'>
                                        <div className="profileImg">
                                            <Img src={profile} />
                                        </div>
                                        <div className="name">
                                            {curEle?.name}
                                        </div>
                                        <div className="character">
                                            {curEle.character}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;
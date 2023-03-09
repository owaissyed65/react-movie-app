import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './styles.scss'
import noResults from '../../assets/no-results.png'
import fetchDataFromApi from '../../Utils/api';
import Spinner from '../../components/spinner/Spinner';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import MovieCard from '../../components/movieCard/MovieCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const SearchResult = () => {

  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1)
  const [loading, setLoading] = useState(false)
  const { query } = useParams()
  const fetchInitialData = () => {
    setLoading(true)
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then((res) => {
      setData(res)
      setPageNum((prev) => prev + 1)
      setLoading(false)
    })
  }
  const fetchNextData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
      .then((res) => {
        if (data.results) {
          setData({
            ...data, results: [...data?.results, ...res.results]
          })
        } else {
          setData(res)
        }
        setPageNum((prev) => prev + 1)
      })
  }
  useEffect(() => {
    setPageNum(1)
    fetchInitialData()
  }, [query])
  return (
    <div className='searchResultsPage'>
      {loading && <Spinner />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className='pageTitle'>
                {`Search ${data?.total_results >= 1 ? 'Results' : 'Result'} of '${query}'
                `}
              </div>
              <InfiniteScroll
                className='content'
                dataLength={data?.results?.length || []}
                next={fetchNextData}
                hasMore={pageNum <= data?.total_pages}
                loader={<Spinner />}
              >
                {data?.results?.map((curEle, i) => {
                  return <MovieCard key={i} fromSearch={true} data={curEle} />
                })}
              </InfiniteScroll>
            </>
          ) : (
            <span className='resultNotFound'>Sorry No any results😓</span>
          )}
        </ContentWrapper>
      )
      }
    </div >
  )
}

export default SearchResult

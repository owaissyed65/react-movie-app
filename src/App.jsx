import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { configurationUrl, getGenres } from './Store/slice/homeSlice';
import fecthDataFromApi from './Utils/api';
import Home from './pages/home/Home';
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import PageNotFound from './pages/404/PageNotFound';
import Details from './pages/details/Details'
import Explore from './pages/explore/Explore'
import SearchResult from './pages/searchResult/SearchResult'
function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()
  const fetchApiConfig = () => {
    fecthDataFromApi('/configuration')
      .then((res) => {
        // console.log(res)
        const url = {
          backdrop: res.images.secure_base_url + 'original',
          poster: res.images.secure_base_url + 'original',
          profile: res.images.secure_base_url + 'original'
        }
        dispatch(configurationUrl(url))
      })
  }
  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);
  const genresCall = async () => {
    const promise = [];
    const endPoints = ['tv', 'movie'];
    const allGenres = {}
    endPoints.forEach((eP) => {
      promise.push(fecthDataFromApi(`/genre/${eP}/list`));
    });
    let data = await Promise.all(promise)
    // console.log(data)
    data.map(({ genres }) => {
      genres.map((curEle) => {
        allGenres[curEle.id] = curEle;
      })
    })
    dispatch(getGenres(allGenres))
  }
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:mediaType/:id' element={<Details />} />
          <Route path='/search/:query' element={<SearchResult />} />
          <Route path='/explore/:mediaType' element={<Explore />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App

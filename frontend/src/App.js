import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import Signin from './pages/Signin/Signin';
// import { ToastContainer } from 'react-toastify';
import ProtectedRoutes from './components/proctectedRoutes/ProtectedRoutes';
import Uploads from './pages/uploads/Uploads';
import NewsList from './pages/uploads/NewsList';
import NewsItem from './pages/uploads/NewsItem';
import NewsPage from './pages/uploads/NewsPage';
import NewsByTitle from './pages/uploads/NewsByTitle';
import NewsByTags from './pages/uploads/NewsByTags';

function App() {
  return (
    <>
      {/* <ToastContainer /> */}
      <Routes>
        <Route path='/signin' element={<Signin />} />
        <Route  path='/uploads' element={ <ProtectedRoutes><Uploads/></ProtectedRoutes> }/>
        <Route path="/news-editor" element={<ProtectedRoutes><NewsList/></ProtectedRoutes>} />
        <Route path="/" element={<NewsPage/>}  />
        <Route  path='/news-by-title' element={<NewsByTitle/> }/>
        <Route  path='/news-by-tags' element={<NewsByTags/> }/>
      </Routes>
    </>
  );
}

export default App;

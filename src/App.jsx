import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/common';

// Page imports - these will be created by team members
import Home from './pages/Home';
import About from './pages/About';
import News from './pages/News';
import Feature from './pages/Feature';
import Opinion from './pages/Opinion';
import SciTech from './pages/SciTech';
import Editorial from './pages/Editorial';
import Sports from './pages/Sports';
import Photos from './pages/Photos';
import Cartoons from './pages/Cartoons';
import Videos from './pages/Videos';
import Article from './pages/Article';
import ViewPhotosArticle from './pages/ViewPhotosArticle';
import ViewCartoonsArticle from './pages/ViewCartoonsArticle';
import Archive from './pages/Archive';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/2fc951a8-852a-48f3-969b-9e58fc53648e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'App.jsx:ENTRY',message:'App component rendered',data:{hasSports:!!Sports,typeofSports:typeof Sports},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          {/* Category Routes */}
          <Route path="/news" element={<News />} />
          <Route path="/feature" element={<Feature />} />
          <Route path="/opinion" element={<Opinion />} />
          <Route path="/sci-tech" element={<SciTech />} />
          <Route path="/editorial" element={<Editorial />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/cartoons" element={<Cartoons />} />
          <Route path="/videos" element={<Videos />} />
          
          {/* Single Article Routes */}
          <Route path="/article/:slug" element={<Article />} />
          <Route path="/photos/:slug" element={<ViewPhotosArticle />} />
          <Route path="/cartoons/:slug" element={<ViewCartoonsArticle />} />
          
          {/* Archive Route */}
          <Route path="/archive" element={<Archive />} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

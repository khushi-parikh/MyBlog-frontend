import LogIn from './components/login.js'
import SignUp from "./components/signup.js"
import SubmittedArticles from './components/submittedArticles.js';
import Dashboard from "./components/dashboard.js"
import CreateArticle from './components/create.js';
import UpdateArticle from './components/update.js';
import BlogPost from './components/blogpost.js';
import { Route, Routes, BrowserRouter } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/blogpost/:slug" element={<BlogPost />} />
            <Route path="/create" element={<CreateArticle />} />
            <Route path="/update" element={<UpdateArticle />} />
            {/* <Route path="/navbar" element={<NavBar />} />  */}
            <Route path="/submittedArticles" element={<SubmittedArticles />} /> 
        </Routes>
   </BrowserRouter>
  );
}

export default App;

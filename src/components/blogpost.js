import NavBar from "./navbar";
import "./blogpost.css"
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios'

const BlogPost = (props) => {

    const [blogsPost, setBlogsPost] = useState({});
    const { slug } = useParams();

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const resp = await axios.get(`${process.env.REACT_APP_API_URL}/api/MyBlogApp/${slug}`);
                setBlogsPost(resp.data);
                console.log(resp.data.description);
            }
            catch(err){
                console.log(slug)
            }
        };
        fetchData();
    },[])

    // const Title = () => (
    //     <h1 className="title">{blogsPost.title}</h1>
    //     <p>{blogsPost.description}</p>;
    // );

    return(
        <div className="blogpost">
            <NavBar />
            <div className="box">
                {blogsPost.image && <img src={blogsPost.image}></img>}
                <h1 className="title1">{blogsPost.title}</h1>
                <p>{blogsPost.description}</p>;
            </div>
        </div>
    );
}

export default BlogPost;
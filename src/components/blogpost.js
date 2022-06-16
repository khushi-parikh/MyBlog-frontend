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
            }
            catch(err){
                console.log(slug)
            }
        };
        fetchData();
    },[slug])

    // const Title = () => (
    //     <h1 className="title">{blogsPost.title}</h1>
    //     <p>{blogsPost.description}</p>;
    // );

    return(
        <div className="blogpost">
            <NavBar />
            <div className="box">
                @{blogsPost.user_name}
                {blogsPost.image && <img src={blogsPost.image} alt="Oops"></img>}
                <hr></hr>
                <h1 className="title1">{blogsPost.title}</h1>
                <p>{blogsPost.description}</p>;
            </div>
        </div>
    );
}

export default BlogPost;
import "./dashboard.css"
import Card from 'react-bootstrap/Card'
import NavBar from "./navbar"
import { useEffect, useState } from 'react'
import axios from 'axios'
import SweetPagination from 'sweetpagination'

function Dashboard(){

    const [blogsList, setBlogsList] = useState([]);
    const [currentPageData, setCurrentPageData] = useState(new Array(2).fill());
    
    const [topBlogs, setTopBlogs] = useState([]);

    function getMultipleRandom(arr, num) {
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
      
        return shuffled.slice(0, num);
      } 

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const resp = await axios.get(`${process.env.REACT_APP_API_URL}/api/MyBlogApp/`);
                setBlogsList(resp.data);
                setTopBlogs(getMultipleRandom(resp.data, 3))
            }
            catch(err){
                // console.log(process.env.REACT_APP_API_URL}');
            }
        }
        fetchData();
    },[])


    return(
        <div className='dashboard'>
            <NavBar />
            <div className='dashboard-division'>
                <div className='left-dashboard' >
                    <div class="heading"><h2>LATEST BLOGS</h2></div>
                    {currentPageData.map((blogPost) => ( blogPost &&
                        <EachCard title={blogPost.title}
                            imagesrc={blogPost.image} 
                            excerpt={blogPost.excerpt}
                            slug={blogPost.slug}/>
                    ))}
                    <SweetPagination
                        currentPageData={setCurrentPageData}
                        dataPerPage={5}
                        getData={blogsList}
                        navigation={true}
                        getStyle={'style-custom'}
                    />
                    {window.scroll({
                        top: 0, 
                        left: 0, 
                        behavior: 'smooth'
                    })}
                </div>
                <div className='right-dashboard' >
                    <div className="heading"><h2>TOP ARTICLES</h2></div>
                    {topBlogs.map((blogPost) => ( blogPost &&
                        <EachCard title={blogPost.title}
                            imagesrc={blogPost.image} 
                            excerpt={''}
                            slug={blogPost.slug}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

const EachCard = (props) =>{
    return(
        <div className='eachCard'>
            <Card>
            {/* <Card.Header>Featured</Card.Header> */}
            <Card.Body>
            <Card.Title><u>{props.title}</u></Card.Title>
            <Card.Text>
            {props.excerpt}
            </Card.Text>
            {props.imagesrc && <Card.Img className="image2" variant="top" src={props.imagesrc}/>}
            <br />
            {/* <Button variant="primary">Go somewhere</Button> */}
            <Card.Link href={"/blogpost/"+ props.slug }>Continue Reading →  </Card.Link>
            </Card.Body>
            
            </Card>
        </div>
    )
}

export default Dashboard;
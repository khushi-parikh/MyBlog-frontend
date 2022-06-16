import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Modal from 'react-bootstrap/Modal'
import "./submittedArticles.css"
import NavBar from './navbar'
import 'bootstrap/dist/css/bootstrap.min.css'

function SubmittedArticles(){
    const [blogsPost, setBlogsPost] = useState([]);
    let user = localStorage.getItem("username")

    const fetchData = async () => {
        try{
            const resp = await axios.get(`${process.env.REACT_APP_API_URL}/api/MyBlogApp/user/${user}`);
            setBlogsPost(resp.data);
            console.log(resp.data)
        }
        catch(err){
        }
    };

    useEffect(() => {
        fetchData();
      }, [])

    return(
        <div className='submittedArticles'>
            <NavBar />
            {blogsPost.map((blogPost) => (
                <EachCard title={blogPost.title} 
                    image={blogPost.image}
                    excerpt={blogPost.excerpt} 
                    slug ={blogPost.slug}
                    description = {blogPost.description}
                    id = {blogPost.id} 
                    user={user}
                    fetchData={()=>fetchData} />
            ))}
        </div>
    )
}


const EachCard = (props) =>{

    const postDelete = async () => {
        try{
            axios.delete(`${process.env.REACT_APP_API_URL}/api/MyBlogApp/${props.slug}`)
            setTimeout(props.fetchData(),500);
            console.log('deleted')
        }
        catch(err){
        }
    };

    const setID = (props) => {
        localStorage.setItem('input', JSON.stringify(props));
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true)

    return(
        <div className='eachCard'>
            <Card>
            {/* <Card.Header>Featured</Card.Header> */}
            
            <Card.Body>
                <div className='image-outside'>
                    { props.image && <img className="image-sa" src={props.image} alt="Oops" /> }
                </div>
                <Card.Title >{props.title}</Card.Title>
                <Card.Text>
                    {props.excerpt}
                </Card.Text>
                <Button className='buttons' variant="primary" href='/update' onClick={()=>setID(props)}>Edit Article</Button>
                <Button id='deleteButton' className='buttons' variant="danger" onClick={handleShow}>Delete Article</Button>            
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete {props.title}?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Close</Button>
                        <Button variant="primary" onClick={()=>{postDelete(props.slug);handleClose()}}>Confirm Delete</Button>
                    </Modal.Footer>
                </Modal>
            </Card.Body>
            </Card>
        </div>
    )
}

export default SubmittedArticles;
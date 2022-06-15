import "./update.css"
import React, { useEffect } from 'react'
import NavBar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom"

function UpdateArticle(){
    const navigate = useNavigate();
    const [inputs, setInputs] = React.useState({title: '', excerpt: '', description: '', image: null, slug:'', id:''});

    const handleInputChange = (e) => {
        setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
    }

    const handleImageChange = (e) => {
        setInputs(inputs => ({...inputs, ['image']: e.target.files[0]}));
        setTimeout(console.log(inputs),1000); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let form_data = new FormData();
        form_data.append('image', inputs.image, inputs.image.name);
        form_data.append('title', inputs.title);
        form_data.append('excerpt', inputs.excerpt);
        form_data.append('description', inputs.description);
        axios.put(`${process.env.REACT_APP_API_URL}/api/MyBlogApp/${inputs.slug}`, form_data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(res => {
            console.log(res.data);
        })
        .then(()=>setTimeout(navigate('/submittedArticles',{ replace: true }),1000))
        .catch(err => console.log(err))
        
    }

    useEffect(()=>{
        setInputs(JSON.parse(localStorage.getItem('input')));
    },[])

    return (  
        <div>
            <NavBar />
            <div className="contact__wrap">
                <h1 className="title">Update Article</h1>
                <form 
                    onSubmit={e=>handleSubmit(e)} 
                    className="contact__form">
                    <input 
                        onChange={e=>handleInputChange(e)} 
                        type="text" name="title" 
                        value={inputs.title}
                        placeholder="title" 
                        maxLength="50" 
                        required/>
                    <input 
                        onChange={e=>handleInputChange(e)} 
                        type="text" name="excerpt" 
                        value = {inputs.excerpt}
                        placeholder="Excerpt" 
                        maxLength="200" 
                        required/>
                    <textarea 
                        onChange={e=>handleInputChange(e)} 
                        type="text" name="description" 
                        value={inputs.description}
                        placeholder="Description" 
                        maxLength="1000" 
                        required/>
                    <input 
                        className="image-upload"
                        onChange={e=>handleImageChange(e)} 
                        type="file" name="image" 
                        accept="image/*"
                        required/>
                    <input 
                        type="submit" 
                        value="UPDATE"
                        // onClick={()=>sendDataToAPI({inputs})}
                         />
                </form> 
            </div>
        </div>
    )
}

export default UpdateArticle;

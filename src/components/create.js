import "./create.css"
import React from 'react'
import NavBar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom"

function CreateArticle(){
    const navigate = useNavigate();
    const [inputs, setInputs] = React.useState({title: '', excerpt: '', description: '', image: null});

    const handleInputChange = (e) => {
        setInputs(inputs => ({...inputs, [e.target.name]: e.target.value}));
        console.log(inputs);
    }

    const handleImageChange = (e) => {
        setInputs(inputs => ({...inputs, ['image']: e.target.files[0]}));
        setTimeout(console.log(inputs),1000); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        let form_data = new FormData();
        if(inputs.image){
            form_data.append('image', inputs.image, inputs.image.name);
        }
        form_data.append('title', inputs.title);
        form_data.append('excerpt', inputs.excerpt);
        form_data.append('description', inputs.description);
        let url = 'http://localhost:8000/api/MyBlogApp/';
        console.log("formdata",form_data)
        axios.post(url, form_data, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
            .then(res => {
              console.log(res.data);
            })
            .then(()=>setTimeout(navigate('/submittedArticles',{ replace: true }),500))
            .catch(err => console.log(err))
    }

    return (  
        <div>
            <NavBar />
            <div className="contact__wrap">
                <h1 className="title">Create Article</h1>
                <form 
                    onSubmit={e=>handleSubmit(e)} 
                    className="contact__form">
                    <input 
                        onChange={e=>handleInputChange(e)} 
                        type="text" name="title" 
                        placeholder="title" 
                        maxLength="50" 
                        required/>
                    <input 
                        onChange={e=>handleInputChange(e)} 
                        type="text" name="excerpt" 
                        placeholder="Excerpt" 
                        maxLength="200" 
                        required/>
                    <textarea 
                        onChange={e=>handleInputChange(e)} 
                        type="text" name="description" 
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
                        value="SUBMIT"
                        // onClick={sendDataToAPI} 
                        />
                </form> 
            </div>
        </div>
    )
}

export default CreateArticle;

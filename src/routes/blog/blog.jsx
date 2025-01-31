import './blog.css';
import axios from 'axios';
import { useEffect, useState} from 'react';
import {useParams} from "react-router-dom"
import Markdown from 'markdown-to-jsx'

export const Blog = () => {
    const [blog, setBlog] = useState({})

    const { id } = useParams();

    useEffect(() => {
        const api = axios.create({
            baseURL: `${process.env.REACT_APP_AIRTABLE_URL}/Resources`,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            }
        });

        const getBlog = async () => {
            try {
                let article = await api.get(`${process.env.REACT_APP_AIRTABLE_URL}/Resources/${id}`);
                setBlog(article.data)
            } catch (error) {
                console.log(error)
            }
        };

        getBlog()
    }, [id])

    const { fields } = blog;

    return (
        <>
            <div className="back"><a href="/resources">Back</a></div>
            {fields && 
                <div className="blogContainer">
                    <meta name="description" content={fields.Description} />
                    <h1>{fields.Title}</h1>
                    <img src={fields.Hero_Image[0].url} alt="" />
                    <Markdown>{fields.Paragraph_1}</Markdown>
                    <img src={fields.Image_1} alt="" />
                    <Markdown>{fields.Paragraph_2}</Markdown>
                    <img src={fields.Image_2} alt="" />
                    <Markdown>{fields.Paragraph_3}</Markdown>
                    <img src={fields.Image_3} alt="" />
                </div>
            }
        </>
    )
}

export default Blog;
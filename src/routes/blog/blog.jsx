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
                   {fields.Hero_Image && <img className="blogImage" src={fields.Hero_Image[0].url} alt="" />}
                   <h1>{fields.Title}</h1>
                    <Markdown>{fields.Paragraph_1}</Markdown>
                    {fields.Image_1 && fields.Image_1[0].type !== "video/mp4" &&
                    <img className="blogImage" src={fields.Image_1[0].url} alt="" />}
                    {fields.Image_1 && fields.Image_1[0].type === 'video/mp4' && 
                    <div className="videoWrapper">
                    <iframe className="video" width="560" height="315" src="https://www.youtube.com/embed/66GomSfqGk4?si=Sn-lOOfA9UT5G6MT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    }
                    <Markdown>{fields.Paragraph_2}</Markdown>
                    {fields.Image_2 && <img className="blogImage"  src={fields.Image_2[0].url} alt="" />}
                    <Markdown>{fields.Paragraph_3}</Markdown>
                    {fields.Image_3 && <img className="blogImage" src={fields.Image_3[0].url} alt="" />}
                </div>
            }
        </>
    )
}

export default Blog;
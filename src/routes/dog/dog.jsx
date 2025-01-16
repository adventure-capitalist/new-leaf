import './dog.css';
import ImageGallery from "react-image-gallery";
import axios from 'axios';
import { useEffect, useState} from 'react';
import {useParams} from "react-router-dom"

export const Dog = () => {
    const [dog, setDog] = useState({})

    const { id } = useParams();

    useEffect(() => {
        const api = axios.create({
            baseURL: process.env.REACT_APP_AIRTABLE_URL,
            headers: {
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            }
        });

        const getDog = async () => {
            try {
                let pup = await api.get(`${process.env.REACT_APP_AIRTABLE_URL}/${id}`);
                setDog(pup.data)
            } catch (error) {
                console.log(error)
            }
        };

        getDog()
    }, [id])

    const { fields } = dog;
    const photos = fields?.Photos || [];
    const kids = fields?.Kids || [];

    return (
        <>
            <div className="back"><a href="/dogs">Back</a></div>
            {fields && 
                <div className="pupContainer">
                    <div className="gallery">
                        {photos.length > 0 &&  
                            <ImageGallery
                                style={{width: '600px', maxWidth: '600px'}}
                                originalWidth={600}
                                showThumbnails={false} 
                                showFullscreenButton={false}
                                showPlayButton={false}
                                showBullets={true}
                                items={photos.map(photo => ({original: photo.url, thumbnail: photo.url}))}
                            />
                        }
                        <div className={'dogStats'}>
                            <h2>{fields.Name}</h2>
                            <h3>{fields.Status}</h3>
                            <p>Breed: {fields.Breed}</p>
                            <p>Sex: {fields.Gender}</p>
                            <p>Ok with cats: {fields.Cats}</p>
                            <p>Ok with dogs: {fields.Dogs}</p>
                            <p>Ok with kids these ages: 
                                <ul>{kids.length > 0 ? kids.map(item => <li className={'age'} key={item}>{item}</li>) : 'no'}</ul>
                            </p>
                        </div>   
                    </div>
                    <div className="story">
                      <h3>Story</h3>
                        {fields.Story && <p>{fields.Story}</p>}
                      <a href='/application'>Apply to adopt {fields.Name}</a>
                    </div>
                </div>
            }
        </>
    )
}

export default Dog;
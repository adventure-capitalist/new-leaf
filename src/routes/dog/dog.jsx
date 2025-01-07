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
	return (
        <>
            <div className="back"><a href="/dogs">Back</a></div>
                { dog && 
                
                <div className="pupContainer">
                   <div className="gallery">
                        {dog.fields.Photos &&  
                            <ImageGallery
                                style={{width: '600px', maxWidth: '600px'}}
                                originalWidth={600}
                                showThumbnails={false} 
                                showFullscreenButton={false}
                                showPlayButton={false}
                                showBullets={true}
                                items={dog.fields.Photos.map(photo => ({original: photo.url, thumbnail: photo.url}))}
                            />
                        }
                        <div className={'dogStats'}>
                           <h2>{dog.fields.Name}</h2>
                           <h3>{dog.fields.Status}</h3>
                           <p>Breed: {dog.fields.Breed}</p>
                           <p>Sex: {dog.fields.Gender}</p>
                           <p>Ok with cats: {dog.fields.Cats}</p>
                           <p>Ok with dogs: {dog.fields.Dogs}</p>
                           <p>Ok with kids these ages: 
                            <ul>{dog.fields.Kids ? dog.fields.Kids.map(item => <li className={'age'} key={item}>{item}</li>) : 'no'}</ul></p>
                        </div>   
                   </div>
                <div className="story">
                    {dog.fields.Story && <p>{dog.fields.Story}</p>}
                </div>
            </div>}
        </>
        )
}

export default Dog;
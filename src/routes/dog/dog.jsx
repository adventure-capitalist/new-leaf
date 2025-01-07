import './dog.css';
import ImageGallery from "react-image-gallery";

export const Dog = ({dog}) => {
	
	return (
        <>
            <div className="back"><a href="/dogs">Back</a></div>
                <div className="dogContainer">
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
                           <p>Breed: {dog.fields.Breed}</p>
                           <p>Sex: {dog.fields.Gender}</p>
                           <p>Ok with cats: {dog.fields.Cats}</p>
                           <p>Ok with dogs: {dog.fields.Dogs}</p>
                           <p>Ok with kids these ages: {dog.fields.Kids}</p>
                        </div>   
                   </div>
                </div>
        </>
        )
}

export default Dog;
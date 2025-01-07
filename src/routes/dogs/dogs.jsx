import axios from 'axios';
import { useEffect, useState } from 'react';
import './dogs.css';
import Dog from '../dog/dog';

export const Dogs = () => {
	const [dogsList, setDogsList] = useState()
  const [clickedDog, setClickedDog] = useState()

	useEffect(() => {
        const api = axios.create({
            baseURL: process.env.REACT_APP_AIRTABLE_URL,
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            }
          });
        
          const getDogs = async () => {
            try {
              let dogs = await api.get(`${process.env.REACT_APP_AIRTABLE_URL}`);
              console.log('all', dogs.data.records);
              let adoptable = dogs.data.records.filter(dog => dog.fields.Status === 'Available')
              console.log('adoptable', adoptable)
              setDogsList(adoptable)
            } catch (error) {
              console.log(error)
            }
          };
		
		getDogs()
	}, [])

	return (
      <>
        {!dogsList && <div className='loading'><p>Fetching...</p><img src='/images/loading.gif' alt='loading'/></div>}
          {!clickedDog && <div className="dogContainer">
              {dogsList && dogsList.map(dog => (
                  <a className="card" href={`/dogs/${dog.fields.Name}`}> 
                      {dog.fields.Photos && <div className={'images'} style={{'backgroundImage': `url(${dog.fields.Photos[0].url})`}}></div>}
                      <h2 className='name'>{dog.fields.Name}</h2>
                      <div className='dogInfo'>
                          <p>Breed: {dog.fields.Breed}</p>
                          <p>Gender: {dog.fields.Gender}</p>
                          {dog.fields.Birthday && <p>Birthday: {new Date(dog.fields.Birthday).toLocaleDateString('en-GB', {month: 'short', day: 'numeric', year: 'numeric'})}</p>}
                      </div>
                  </a>
                  )
              )}
          </div>}
        {clickedDog && <Dog dog={clickedDog}/>}
      </>
    )
}

export default Dogs;
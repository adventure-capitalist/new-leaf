import axios from 'axios';
import { useEffect, useState } from 'react';
import './dogs.css';

export const Dogs = () => {
	const [dogsList, setDogsList] = useState()

	useEffect(() => {
        const api = axios.create({
            baseURL: `${process.env.REACT_APP_AIRTABLE_URL}/Animals`,
            params: {sort: [{field: "Name"}], filterByFormula: "NOT({Story} = '')"},
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            }
          });
        
          const getDogs = async () => {
            try {
              let dogs = await api.get(`${process.env.REACT_APP_AIRTABLE_URL}/Animals`);
              let adoptable = dogs.data.records.filter(dog => dog.fields.Status.includes('Available'));
              let dataReady = adoptable.filter(dog => dog.fields.Story && dog.fields.Photos);
              setDogsList(dataReady)
            } catch (error) {
              console.log(error)
            }
          };
		
		getDogs()
	}, [])

	return (
      <>
        {!dogsList && <div className='loading'><p>Fetching...</p><img src='/images/loading.gif' alt='loading'/></div>}
          {<div className="dogContainer">
              {dogsList && dogsList.map(dog => (
                  <a key={dog.id} className="card" href={`/dogs/${dog.id}`}> 
                      {dog.fields.Photos && <div className={'image'} style={{'backgroundImage': `url(${dog.fields.Photos[0].url})`}}></div>}
                      
                      <div className='dogInfo'>
                        <h2 className='name'>{dog.fields.Name}</h2>
                          <p className='stat'>Breed: {dog.fields.Breed}</p>
                          <p className='stat'>Gender: {dog.fields.Gender}</p>
                          <p className='stat'>{dog.fields.Birthday ? 'Birthday: ' + new Date(dog.fields.Birthday).toLocaleDateString('en-GB', {month: 'short', day: 'numeric', year: 'numeric'}) : ' '}</p>
                      </div>
                      <button className='cta-button'>Read my tail</button>
                  </a>
                  )
              )}
          </div>}
      </>
    )
}

export default Dogs;
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaChevronDown } from "react-icons/fa";

import './dogs.css';

export const Dogs = () => {
	const [dogsList, setDogsList] = useState();
	const [filters, setFilters] = useState([]);
	const [isFilterVisible, setIsFilterVisible] = useState(false);

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

              let filteredDogs = dataReady.filter(dog => {
                return filters.every(filter => dog.fields[filter.field] === filter.value);
              });

              setDogsList(filteredDogs);
            } catch (error) {
              console.log(error)
            }
          };
		console.log(filters)
		getDogs()
	}, [filters]);

	return (
		<>
			{!dogsList && <div className='loading'><p>Fetching...</p><img src='/images/loading.gif' alt='loading'/></div>}
			<div className="dogContainer">
				<div className="filterContainer">
					<p onClick={() => setIsFilterVisible(!isFilterVisible)} className="filter-toggle">
						I am looking for a dog that is...{' '}<FaChevronDown />
					</p>
					{isFilterVisible && (
						<div className="filter-buttons">
							{[
								{ label: 'Female', field: 'Gender', value: 'Female' },
								{ label: 'Male', field: 'Gender', value: 'Male' },
								{ label: 'Good with cats', field: 'Cats', value: 'Yes' },
								{ label: 'Good with dogs', field: 'Dogs', value: 'Yes' },
								{ label: 'Available for adoption', field: 'Status', value: 'Available' },
								{ label: 'Available for foster', field: 'Status', value: 'Available for foster only' },
							].map(({ label, field, value }) => (
								<button
									key={label}
									onClick={() =>
										setFilters(filters.some(filter => filter.field === field && filter.value === value)
											? filters.filter(filter => filter.field !== field)
											: [...filters.filter(filter => filter.field !== field), { field, value }]
										)
									}
									className={filters.some(filter => filter.field === field && filter.value === value) ? 'filter-button-active' : 'filter-button'}
								>
									{label}
								</button>
							))}
						</div>
					)}
				</div>
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
			</div>
		</>
	);
};

export default Dogs;
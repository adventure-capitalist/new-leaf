import axios from 'axios';
import { useEffect, useState } from 'react';
import './resources.css';

export const Resources = () => {
  const [blogsList, setBlogsList] = useState([])

	useEffect(() => {
        const api = axios.create({
            baseURL: `${process.env.REACT_APP_AIRTABLE_URL}/Resources`,
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
            }
          });
        
          const getBlogs = async () => {
            try {
              let blogs = await api.get(`${process.env.REACT_APP_AIRTABLE_URL}/Resources`);
              let published = blogs.data.records.filter(blog => blog.fields.Status.includes('Published'));
              setBlogsList(published)
            } catch (error) {
              console.log(error)
            }
          };
		
		getBlogs()
	}, [])

	return (
      <>
        {!blogsList && <div className='loading'><p>Fetching...</p><img src='/images/loading.gif' alt='loading'/></div>}
          { <>
            <div className="blogsContainer">
              <a href='/application' target='_blank' rel="noopener noreferrer" className='resourcesCard'>
                  <div className={'image'} style={{'backgroundImage': `url(/images/application.jpg)`}}></div>
                  <div className='blogInfo'>
                        <span className='name'>Apply for one of our dogs</span>
                        <span className='description'>Submit your application and we will arrange a homecheck</span>
                        <button className='cta-button'>Forever starts now</button>
                  </div>
                </a>
                <a href="https://www.paws-hope.com/mia-s-dogs" target='_blank' rel="noopener noreferrer" className='resourcesCard'>
                  <div className={'image'} style={{'backgroundImage': `url(/images/eating.png)`}}></div>
                  <div className='blogInfo'>
                        <span className='name'>Donate Food to the Shelter</span>
                        <span className='description'>The best way to support our shelters is to sponsor bags of food</span>
                        <button className='cta-button'>Food glorious food</button>
                  </div>
                </a>
                <a href="https://www.thedogspointofview.com/find-a-romanian-rescue-trainer-map" target='_blank' rel="noopener noreferrer" className='resourcesCard'>
                  <div className={'image'} style={{'backgroundImage': `url(/images/DogsPointOfView.png)`}}></div>
                  <div className='blogInfo'>
                        <span className='name'>Romanian Rescue Training Advice</span>
                        <span className='description'>The Dog's POV is a helpful network of Romanian dog experts</span>
                        <button className='cta-button'>Find out more</button>
                  </div>
                </a>
            </div>
          
             <h2 style={{width: "100%", margin: "40px 0px"}}>Blogs</h2>

             <div className="blogsContainer">
              {blogsList && blogsList.map(blog => (
                  <a key={blog.id} className="resourcesCard" href={`/resources/${blog.id}`}> 
                      {blog.fields.Hero_Image && <div className={'image'} style={{'backgroundImage': `url(${blog.fields.Hero_Image[0].url})`}}></div>}
                      
                      <div className='blogInfo'>
                        <span className='name'>{blog.fields.Title}</span>
                        <span className='description'>{blog.fields.Description}</span>
                        <button className='cta-button'>Read more</button>
                      </div>
                  </a>
                  )
                )}
            </div>
          </>}
      </>
    )
}

export default Resources;
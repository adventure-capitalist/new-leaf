import Router from 'react-easy-router';
import Dogs from './routes/dogs/dogs';
import Dog from './routes/dog/dog';
import Blog from './routes/blog/blog';
import Welcome from './routes/welcome/welcome';
import Resources from './routes/resources/resources';
import Application from './routes/application/application';
import NotFound from './routes/not-found';
import { FaFacebookF, FaInstagram  } from "react-icons/fa";

import './App.css';

const routes = [
  {
    path: '/',
    element: <Welcome/>,
  },
  {
    path: '/dogs',
    element: <Dogs />,
    children: [{ path: '/:id', element: <Dog /> }],
  },
  {
    path: '/resources',
    element: <Resources />,
    children: [{ path: '/:id', element: <Blog /> }],

    
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/application',
    element: <Application />,
  }
];

function App() {
  return (
    <div className="App">
      <header className="header">
        <img alt='New Leaf Dog Rescue Logo' className='logo' src='/images/logo.jpg'/>
        <menu className='menu'>
          <a href='/'>Home</a>
          <span>•</span>
          <a href='/dogs'>Adoptable dogs</a>
          <span>•</span>
          <a href='/resources'>Resources</a>
        </menu>
      </header>
      <Router routes={routes} />
      <footer className='footer'>
        <p>© 2025 New Leaf Dog Rescue</p>
        <span style={{display: 'flex', flexDirection: 'row'}}>
          <p>Follow us here:</p>
          <a href='https://www.facebook.com/profile.php?id=61570417581968'  target="_blank" rel="noopener noreferrer"><div className='footerIcon'><FaFacebookF className='social-icon' size={15} /></div></a>
          <a href='https://www.instagram.com/newleafdogrescue' target="_blank" rel="noopener noreferrer"><div className='footerIcon'><FaInstagram className='social-icon' size={15} /></div></a>
        </span>
      </footer>
    </div>
  )
}

export default App;
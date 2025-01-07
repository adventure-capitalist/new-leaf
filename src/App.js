import Router from 'react-easy-router';
import Dogs from './routes/dogs/dogs';
import Dog from './routes/dog/dog';
import Welcome from './routes/welcome/welcome';
import Resources from './routes/resources/resources';
import Application from './routes/application/application';
import NotFound from './routes/not-found';
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
    </div>
  )
}

export default App;
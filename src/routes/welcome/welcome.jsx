import './welcome.css';
import { FaFacebookF, FaInstagram  } from "react-icons/fa";

export const Welcome = () => {

	return (
        <>
            <div className='mission'>
                    <div className='homepage-container'>
                        <div className="home-image" style={{backgroundImage: `url('/images/shelter.jpg')`, borderRadius: '5px 0px 0px 5px', backgroundPosition: 'center'}}></div>
                        <div className='home-text'>
                            <h2>Our Mission</h2>
                            <p> 
                                We are a non-profit organisation with a small but dedicated team with the goal of matching loving homes with dogs in need. 
                                Our dogs can travel to homes all over the UK and are deeply committed to both animal welfare and ensuring that this the homes we place dogs into are for life. 
                                We believe that every dog big or small deserves a second chance at a life where they are truly loved and special and we work tirelessly to make that happen. 
                                If you believe there is room in your home and your heart for one of our special dogs, feel free to learn about each of them below.
                            </p>
                            <div className='cta-button'><a href='/dogs'>Meet the dogs</a></div>
                        </div>

                </div>
            </div>
            <div className='resources'>
                <div className='homepage-container'>
                    <div className='home-text'>
                        <h2>Resources</h2>
                        <p> 
                            The road to making a rescue dog a part of your family can be a long and windy one. We never want you to feel like you have to travel it alone.
                            We offer individual support for helping your dog transition into their new homes as smoothly as possible. And to get you both off to the best start we have put together a list of resources.
                        </p>
                        <div className='cta-button'><a href='/resources'>Find out more</a></div>
                        <div className='social-icons'>
                            <a href='https://www.facebook.com/profile.php?id=61570417581968'><div className='iconCircle'><FaFacebookF className='social-icon' size={30} /></div></a>
                            <a href='https://www.instagram.com/newleafdogrescue'><div className='iconCircle'><FaInstagram className='social-icon' size={30} /></div></a>
                        </div>
                    </div>
                    <div className="home-image" style={{backgroundImage: `url('/images/forest.jpg')`, backgroundPosition: 'bottom', borderRadius: '0px 5px 5px 0px'}}></div>
                </div>
            </div>
        </>
        )
}

export default Welcome;
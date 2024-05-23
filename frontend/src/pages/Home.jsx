import React from 'react'


import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import CopyrightElement from '../elements/CopyrightElement.jsx';
import CardsHome from '../components/CardsHome.jsx';


const Home = () => {
      const title1="Unifolio: Streamline your university projects with ease, collaboration, and efficiency";
      const desc1="Unifolio is a comprehensive university project management website designed to streamline academic projects. It offers features such as task tracking, file sharing, collaborative tools, and deadline reminders. With Unifolio, students and faculty can manage projects efficiently, ensuring better organization and communication. The platform supports seamless collaboration, making it easy to coordinate tasks, share resources, and monitor progress. Ideal for both individual and group projects, Unifolio enhances productivity and helps users stay on top of their academic commitments"
  return ( <>
    <main>
      <CardsHome title={title1} description={desc1}/>
      <CardsHome title="Test2" description="lorem80"/>
    </main>
    </>
  )
}

export default Home
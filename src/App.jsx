import { Dock, Home, Navbar, Welcome , } from "../src/components/index.js";
import {Safari , Terminal ,  Resume , Finder , Text, Contact, Image, Photo } from './windows/index.js'


function App() {


    console.log("Vercel deploy test");

  return (
    <>
      
      <main>
        <Navbar />
        <Welcome />
        <Dock />
        <Home/>
        <Terminal/>
        <Safari />
        <Resume /> 
        <Finder />
        <Text />
        <Image />
        <Contact />
        <Photo />
      </main>
    </>
  )
}

export default App;


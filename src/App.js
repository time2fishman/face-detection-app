import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import { useState } from 'react';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const initialInputState = '';
const initialImageUrlState = '';
const initialBoxState = {};
const initialRouteState = 'signin';
const initialIsSignedInState = false;
const initialUserState = {
  id: '',
  name: '',
  email: '',
  entries: 0,
  joined: ''
}

function App() {
  const [input, setInput] = useState(initialInputState)
  const [imageUrl, setImageUrl] = useState(initialImageUrlState)
  const [box, setBox] = useState(initialBoxState)
  const [route, setRoute] = useState(initialRouteState)
  const [isSignedIn, setIsSignedIn] = useState(initialIsSignedInState)
  const [user, setUser] = useState(initialUserState)

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => {
    setBox(box)
  }

  const onInputChange = (event) => {
    setInput(event.target.value)
  }

  const onSubmit = () => {
    setImageUrl(input)
    // fetch('http://localhost:3001/imageurl', {
    fetch('https://face-detection-backend-1.onrender.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          // fetch('http://localhost:3001/image', {
          fetch('https://face-detection-backend-1.onrender.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              setUser(u => ({ ...u, entries: count }))
            })
            .catch(err => console.log(err));
        }
        displayFaceBox(calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(initialInputState)
      setInput(initialInputState)
      setImageUrl(initialImageUrlState)
      setBox(initialBoxState)
      setRoute(initialRouteState)
      setUser(initialUserState)
    } else if (route === 'home') {
      setIsSignedIn(true)
    }
    setRoute(route)
  }

  return (
    <div className="App">
      <ParticlesBg type="cobweb" num={100} color='#FFFFFF' bg={true} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      {route === 'home'
        ?
        <div>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm onInputChange={onInputChange} onSubmit={onSubmit} />
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
        : (route === 'signin'
          ?
          <SignIn onRouteChange={onRouteChange} loadUser={loadUser} />
          :
          <Register onRouteChange={onRouteChange} loadUser={loadUser} />
        )
      }
    </div>
  );
}

export default App;

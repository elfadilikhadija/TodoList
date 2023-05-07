import React from 'react'

import '../../css/pages.css'
import heroImage from './hero.png';
import { Link } from 'react-router-dom';
import Header from './Header';


const Landing = () => {
  return (
    <div>
     
<Header/>

      <div >
        <div className="hero">
          <div className="hero__image">
            <img src={heroImage} alt="Hero" />
          </div>
          <div className="hero__content">

            <h1>Welcome to our todo list app!</h1><br /> <p className="hero__description"> Our app helps you stay organized and manage your daily tasks efficiently.  you can easily create new tasks, set deadlines, and mark tasks as complete.<br />

              Our app allows you to categorize your tasks into different lists and prioritize them based on their importance. You can also add notes or comments to each task to provide additional information.</p>
            <div className="login-buttons">
              <button className="login-button"><Link to='/login'>Log in</Link></button>
              <button className="signup-button"><Link to='/signup'>sin up</Link></button>
            </div>
          </div>

        </div>
        <hr className="center-line" />
        <button className="create-task-button"><Link to='/add'> Create Task</Link> </button>
      </div>


    </div>
  )
}

export default Landing
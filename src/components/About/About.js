import React from 'react';
import { Link } from 'react-router';

require('./About.scss');

class About extends React.Component {

  render() {
    return (
      <div className="about-page">
        <div className="col-xs-10 col-xs-offset-1">
          <article>
            <h2>About</h2>

            <p>
              Hey FITFAM! I have finally started to build my dream fitness application. An app where I can store and track any of my various fitness related media,
              whether that be my favorite workout songs, videos of my personal lifts, informational videos that I find on YouTube, or even the occasional Gym Selfie ;).
              This site is in it's alpha stages but I have the following features planned:

              <ul>
                <li>Workout tracking and metrics</li>
                <li>Nutrition tracking and integration with MyFitnessPal</li>
                <li>Fine grained privacy controls or full Private Profiles for those that want them</li>
                <li>Public Top Lists for Vidoes, Songs, and Photo's where you can discover the best new fitness content</li>
                <li>Supplement database and Supplement reviews</li>
                <li>Community Exercise Wiki where users can add the best tips and media related to any and all exercises</li>
              </ul>

              And I have so much more that I wan't to do with the site! Right now their is so much work to do and I could use any and all help.
              If you want to see this site succeed donate any amount to <a href="https:/cash.me/fitfam">http://www.cash.me/fitfam</a>. If you donate $10 or more make sure to leave your email as
              a note as I will sign you up for the first 100 public beta accounts!
            </p>

            <p>You can check out my pubic profile at <Link className="profile-pic" to="user-profile" params={{username: 'andyk'}}>fitfam.me/andyk</Link></p>

            <p>
              <Link className="profile-pic" to="user-profile" params={{username: 'andyk'}}>
                <img src="/andy-profile-pic-3.jpg" height="100" className="img-circle" alt="Andy Kay" />
              </Link>

              Thanks! - AndyK
            </p>
          </article>
        </div>
      </div>
    );
  }
}

export default About;

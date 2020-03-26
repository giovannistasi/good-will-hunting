import React from 'react';
import { Carousel } from 'antd';

function About () {
  return (
    <div>
      <Carousel
        style={{
          'textAlign': 'center',
          'height': '520px',
          'lineHeight': '2.6rem',
          'background': '#0D2056',
          'overflow': 'hidden'
        }}
      >
        <div>
          <h1
            style={{
              'marginTop': '8%',
              'padding': '0 15%',
              'fontSize': '1.6rem',
              'color': '#fff',
              'fontFamily': "'Josefin Sans', 'sans-serif'"
            }}
          >
            In recent years rates of volunteering and community service have
            been steadily trending downward.
            <br /><br />
            For many of us, our online community feels a lot closer to us than our physical one.
            Our current market doesn't value these things anymore. That's
            why we are striving to merge these two worlds...
          </h1>
        </div>
        <div>
          <h1
            style={{
              'marginTop': '8%',
              'padding': '0 15%',
              'fontSize': '1.6rem',
              'color': '#fff',
              'fontFamily': "'Josefin Sans', 'sans-serif'"
            }}
          >
            Here at Good Will Hunting we hope to bring the focus back to our
            local communities by creating an online platform and unique
            incentives program to increase volunteerism and civic engagement.
            <br /><br />
            Community members in need can request the help of volunteers within
            their respective communities with the appropriate skills.
          </h1>
        </div>
        <div>
          <h1
            style={{
              'marginTop': '8%',
              'padding': '0 15%',
              'fontSize': '1.6rem',
              'color': '#fff',
              'fontFamily': "'Josefin Sans', 'sans-serif'"
            }}
          >
            For instance, a neighbor who has a plumbing issue but can't
            afford to call a profesional,
            
            a parent who is looking for a math tutor but is living paycheck to paycheck,
            
            or an elderly person who is looking for a ride to the doctors.
            <br/><br/>
            In return, volunteers would receive credits, or Good Will Points, for
            each hour they spend fulfilling these requests.
          </h1>
        </div>
        <div>
          <h1
            style={{
              'marginTop': '8%',
              'padding': '0 15%',
              'fontSize': '1.6rem',
              'color': '#fff',
              'fontFamily': "'Josefin Sans', 'sans-serif'",
            }}
          >
            We hope to soon bring in local businesses where volunteers can
            redeem their Good Will Points for things like hot meals and
            household essentials.
            <br></br>
            <br></br>
            Small Steps For Big Change!
          </h1>
        </div>
      </Carousel>
    </div >
  );
}

export default About;

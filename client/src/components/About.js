import React from 'react';
import { Carousel } from 'antd';

function About () {
  return (
    <div>
      <Carousel
        style={{
          'textAlign': 'center',
          'height': '520px',
          'lineHeight': '45px',
          'background': '#4266a3',
          'overflow': 'hidden'
        }}
      >
        <div>
          <h1
            style={{
              'margin': '8% 8% 0 8%',
              'fontStyle': 'oblique',
              'fontSize': '25px',
              'color': '#fff'
            }}
          >
            In recent years rates of volunteering and community service have
            been steadily trending downward.<br></br> For a lot of us, our
          online community feels a lot closer to us than our physical one
          does. Our current market doesn't value these things anymore. That's
          why we are striving to merge these two worlds...
          </h1>
        </div>
        <div>
          <h1
            style={{
              'margin': '8% 8% 0 8%',
              'fontStyle': 'oblique',
              'fontSize': '25px',
              'color': '#fff'
            }}
          >
            Here at Good Will Hunting we hope to bring the focus back to our
            local communities by creating an online platform and unique
            incentives program to increase volunteerism and civic engagement.
          </h1>
        </div>
        <div>
          <h1
            style={{
              'margin': '8% 8% 0 8%',
              'fontStyle': 'oblique',
              'fontSize': '25px',
              'color': '#fff'
            }}
          >
            Community members in need can request the help of volunteers within
            their respective communities with the appropriate skills. For
            instance, a neighbor who has a plumbing issue but can't
            afford to call a professinal,<br></br> a parent who is looking for a
            math tutor but is living paycheck to paycheck,<br></br> or an
            elderly person who is looking for a ride to the doctors.<br></br> In
          return, volunteers would receive credits, or Good Will Points, for
          each hour they spend fulfilling these requests.
          </h1>
        </div>
        <div>
          <h1
            style={{
              'padding': '8% 8% 0 8%',
              'fontStyle': 'oblique',
              'fontSize': '25px',
              'color': '#fff'
            }}
          >
            We hope to soon bring in local businesses where volunteers can
            redeem thier Good Will Points for things like hot meals and
            household essentials.<br></br>
            <br></br> Small Steps For Big Change!
          </h1>
        </div>
      </Carousel>
    </div >
  );
}

export default About;

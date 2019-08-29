import { Fragment } from 'react';

import Stack from './Stack';

const mockTeamImages = [
  {
    src: '/static/team/jackie.jpg',
    activeSrc: '/static/team/jackie.jpg',
    id: '5'
  },
  {
    src: '/static/team/tyler.jpg',
    activeSrc: '/static/team/tyler.jpg',
    id: '6'
  },
  {
    src: '/static/team/mark.jpg',
    activeSrc: '/static/team/mark.jpg',
    id: '7'
  },
  {
    src: '/static/team/marina.jpg',
    activeSrc: '/static/team/marina.jpg',
    id: '8'
  },
  {
    src: '/static/team/meghan.jpg',
    activeSrc: '/static/team/meghan.jpg',
    id: '9'
  },
  {
    src: '/static/team/michael.jpg',
    activeSrc: '/static/team/michael.jpg',
    id: '4'
  }
];

export default props => (
  <Fragment>

    <div className="flex-container module about-pg bg-white " data-type="informational">
      <div className="about-pg__inner">
        <p className="uppercase">
          Services
        </p>
        <p>
          Our work is more than a laundry list. What we do is create images of things that don’t (yet) exist. Give us the it-- any idea, sketch, model, text, phone call, whatever-- and we create the visuals. We make digital images to tell the story of that idea, before it is created. Or before it is realized, before it is prototyped, before it is funded, before it is approved, before it is published, before it is built... Which is to say, we’ve worked on lots of its in all stages of development.
        </p>
      </div>
    </div>

    <div className="flex-container module about-pg bg-white " data-type="informational">
      <div className="about-pg__inner">
        <p className="uppercase">
          About Us
        </p>
        <p>
          Volley is a Brooklyn-based visualization studio that designs digital imagery. Simply put, we believe in the power of immersive visual content to tell a compelling story. Since 2008, we have crafted the highest quality content to visualize our clients’ visions. As a team of designers, architects, photographers, and strategists, we excel in transforming ideas into cohesive, visual narratives. We have focused on building a body of knowledge that pushes the boundaries of digital imagery. As part of this, we are always exploring the newest technologies and constantly experimenting. We are committed to expanding our expertise and pushing the boundaries of our work.
        </p>
      </div>
    </div>

    <Stack
      className="team-stack "
      imgWidth={ 250 }
      defaultHeight={ 470 }
      images={ mockTeamImages }
    >
      <div className="team-stack__content">
        <p>
          <strong>Michael Klausmeier</strong> is the Creative Director and founder of Volley. He created the studio in 2008, after graduating from Princeton University. With over a decade of professional experience in CG visualization, Michael has collaborated closely with architects and designers to translate their concepts into visual media.
        </p>
      </div>
    </Stack>

    <div className="flex-container module bg-white ">
      <div>
        <div className="col-6"></div>
        <div className="col-6">
          <p className="uppercase">
            Select Clients
          </p>
        </div>
      </div>
      <div>
        <div className="col-6"></div>
        <div className="col-6">
          <p>
              & Partners<br/>
              Brookfield Properties<br/>
              Cadillac Fairview<br/>
              Catapult [13]<br/>
              Corcoran Sunshine<br/>
              Cushman & Wakefield<br/>
              Dattner Architects<br/>
              Deborah Berke Partners<br/>
              Gluck +<br/>
          </p>
        </div>
        <div className="col-6">
          <p>
              Michael Maltzan Architecture<br/>
              Moinian Group<br/>
              OMA<br/>
              Oxford Properties<br/>
              Related<br/>
              Rene Gonzalez Architect<br/>
              Richard Meier & Partners<br/>
              Robert A.M. Stern<br/>
              Rockwell Group<br/>
          </p>
        </div>
        <div className="col-6">
          <p>
            Google<br/>
            Grimshaw Architects<br/>
            H3 Hardy Collaboration<br/>
            Halstead Property Development Marketing<br/>
            Hines<br/>
            Jacob & Co.<br/>
            KPF<br/>
            Marchetto Higgins Stieve<br/>
          </p>
        </div>
        <div className="col-6">
          <p>
            Roman and Williams<br/>
            RKF<br/>
            Salvatore Ferragamo<br/>
            Steiner<br/>
            SOM<br/>
            Tishman Speyer<br/>
            Thomas Phifer and Partners<br/>
            Two Trees<br/>
            Zaha Hadid Architects<br/>
          </p>
        </div>
        <div className="col-6"></div>
      </div>
    </div>
  </Fragment>
);

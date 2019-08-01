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
    <div className="flex-container module about-pg bg-white" data-nologo={ true }>
      <div className="about-pg__inner">
        <img src="/static/logo-lg.png"/>
        <p>
          <strong>Volley</strong> is an industry-leading architectural visualization and creative studio, specializing in the crafting of stunning imagery that evokes the best possibilities of our clients’ designs. We believe fundamentally in our ability to add value to our clients’ vision through a deep understanding of design intent, a project’s commercial potential, and refined art direction. Volley is led by Michael Klausmeier who has over a decade of experience in high-end architecture and visualization. The studio is located in the Dumbo area of Brooklyn, NY.
        </p>
      </div>
    </div>

    <div className="flex-container module team-stack">
      <Stack
        imgWidth={ 250 }
        defaultHeight={ 470 }
        images={ mockTeamImages }
      >
        { ({}) => (
          <div className="team-stack__content">
            <p>
              Michael Klausmeier, Creative Director, is the founding member of Volley. After receiving his Bachelor of Science in Civil Engineering with a Certificate in Architecture from Princeton University, he moved to New York to develop his signature photography-based visualization aesthetic. With over a decade of professional experience in CG visualization,
            </p>
          </div>
        )}
      </Stack>
    </div>

    <div className="flex-container module bg-white">
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

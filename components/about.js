import classname from 'classNames';
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

    <div
      id={ props.id }
      className={classname("flex-container module about-pg bg-gray", {
        'module--active': props.activeFrameId === props.frameId
      })}
      data-frametype="informational"
      data-frameid={ props.frameId }
    >
      <div className="about-pg__inner__left">
        <p className="uppercase bold">
          { props.content.firmProfileTitle }
        </p>
        <p>
          { props.content.firmProfileBody }
        </p>
      </div>
      <div className="margin-copy mono">
        <p>about us</p>
      </div>
    </div>

    <div
      className="flex-container module about-pg bg-gray"
      data-frametype="informational"
      data-frameid={ props.frameId + 1 }
    >
      <div className="about-pg__inner">
        <div className="about-pg__inner__left">
          <p className="uppercase bold">
            { props.content.servicesTitle }
          </p>
          <p>
            { props.content.servicesBody }
          </p>
        </div>
        <div className="about-pg__inner__right">
          {
            props.content.servicesList.map(service => (
              <h4>{ service }</h4>
            ))
          }
        </div>
      </div>
    </div>

    <Stack
      className={classname("team-stack bg-gray", {
        'module--active': props.activeFrameId  === props.frameId + 2
      })}
      imgWidth={ 250 }
      defaultHeight={ 470 }
      images={ mockTeamImages }
      frameType="informational"
      frameId={ props.frameId + 2 }
      marginCopy="team"
    >
      <div className="team-stack__content">
        <p>
          <strong>Michael Klausmeier</strong> is the Creative Director and founder of Volley. He created the studio in 2008, after graduating from Princeton University. With over a decade of professional experience in CG visualization, Michael has collaborated closely with architects and designers to translate their concepts into visual media.
        </p>
      </div>
    </Stack>

    <div
      className="flex-container module bg-gray"
      data-frametype="informational"
      data-frameid={ props.frameId + 3 }
    >
      <div>
        <div className="col-6"></div>
        <div className="col-6">
          <p className="uppercase bold">
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

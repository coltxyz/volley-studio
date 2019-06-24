import Page from '../components/Page'
import Layout from '../components/Layout'

import "../styles/styles.scss"

const team = [
  {
    imgUrl: '/static/team/michael.jpg',
    bio: 'Michael Klausmeier, Creative Director, is the founding member of Volley. After receiving his Bachelor of Science in Civil Engineering with a Certificate in Architecture from Princeton University, he moved to New York to develop his signature photography-based visualization aesthetic. With over a decade of professional experience in CG visualization, he has collaborated closely with architects and designers to translate their concepts into still and motion visual media for projects in New York City and abroad. Volley is an evolution of Michael’s successful visualization practice, expanding the company’s capacity to service its clients.'
  },
  {
    imgUrl: '/static/team/jackie.jpg',
    bio: 'Jackie joined Volley in 2015 and is currently an Associate in their DUMBO office. She heads up the CGI team with a particular focus on Volley’s developer relationships. Projects Jackie has worked on include Jackson Park for Tishman Speyer, The Hub for Steiner, 1399 Park with Corcoran Sunshine and Panorama for LIVWRK. Jackie holds a Bachelor of Architecture from Pratt Institute.'
  },
  {
    imgUrl: '/static/team/tyler.jpg',
    bio: 'Tyler is an Associate at Volley Studio. He joined the team shortly after completing his Bachelors of Architecture from Cornell in 2014. As a lead technical innovator, Tyler manages some of Volley’s most demanding jobs, constantly evolving the processes in which Volley delivers its imagery. Projects he has worked on include One Madison and Hudson Yards for Related, 318 West 47th for Halsted Property Development Marketing, 150 Rivington designed by Gluck+, and Bridge on Race Street also designed by Gluck+. He is currently tasked with studying how gaming software can be applied to architectural visualization.'
  },
  {
    imgUrl: '/static/team/mark.jpg',
    bio: 'Previously at Vornado Mark joined Volley in 2016 as an immediate contributor to their retail focused imagery. As project lead he was instrumental in developing the interactive 360 app that Related used so effectively to market their Shops at Hudson Yards. Additionally he worked on marketing imagery for 50 Hudson Yards designed by Norman Foster and Riverbank West with & Partners. Mark holds a Bachelor of Arts in Architecture from the University of Pennsylvania. '
  },
  {
    imgUrl: '/static/team/meghan.jpg',
    bio: 'Meghan is a professional photographer leading Volley’s in-house photographic efforts, which with their strong emphasis on photography means she’s involved in nearly every project running through the office. In addition to organizing and executing all of Volley’s background photography shoots she is tasked with coordinating and shooting custom entourage in Volley’s studio.'
  },
  {
    imgUrl: '/static/team/marina.jpg',
    bio: 'Marina is a Designer at Volley, joining shortly after completing her Bachelor of Architecture from Pratt Institute, where she studied the role of robotics and technology as a platform for real-time responsive architecture and civic engagement. Her pursuits at Volley are an extension of her collegiate focus in communications design.'
  }
]

export default class Porfolio extends Page {

  static slug = 'home'

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <Layout nologo { ...this.props }>
        <div className="flex-container about-pg">
          <div className="team-section pad flex-1 border-right">
            {
              team.map( teamMember => (
                <div className="team-member">
                  <div className="team-img">
                    <img src={ teamMember.imgUrl } />
                  </div>
                  <div className="team-bio">
                    <p>{ teamMember.bio }</p>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="about-section flex-1 ">
            <div className="volley-logo">
              <img src="/static/logo-black.png" />
            </div>
            <div className="volley-bio">
              <p>
                <strong>Volley</strong> is an industry-leading architectural visualization and creative studio, specializing in the crafting of stunning imagery that evokes the best possibilities of our clients’ designs. We believe fundamentally in our ability to add value to our clients’ vision through a deep understanding of design intent, a project’s commercial potential, and refined art direction. Volley is led by Michael Klausmeier who has over a decade of experience in high-end architecture and visualization. The studio is located in the Dumbo area of Brooklyn, NY.
              </p>
            </div>
            <div className="select-clients pad">
              <div className="col-3">
                <p className="uppercase bold">
                  Select Clients
                </p>
              </div>
              <div className="col-3">
                <p className="pad-right">
                  & Partners <br/>
                  Brookfield Properties <br/>
                  Cadillac Fairview <br/>
                  Catapult [13] <br/>
                  Corcoran Sunshine <br/>
                  Cushman & Wakefield <br/>
                  Dattner Architects <br/>
                  Deborah Berke Partners <br/>
                  Gluck + <br/>
                  Google <br/>
                  Grimshaw Architects <br/>
                  H3 Hardy Collaboration <br/>
                  Halstead Property Development Marketing <br/>
                  Hines <br/>
                  Jacob & Co. <br/>
                  KPF <br/>
                  Marchetto Higgins Stieve <br/>
                  Marvel Architects <br/>
                </p>
              </div>
              <div className="col-3">
                <p className="pad-right">
                  Michael Maltzan Architecture <br/>
                  Moinian Group <br/>
                  OMA <br/>
                  Oxford Properties <br/>
                  Related <br/>
                  Rene Gonzalez Architect <br/>
                  Richard Meier & Partners <br/>
                  Robert A.M. Stern <br/>
                  Rockwell Group <br/>
                  Roman and Williams <br/>
                  RKF <br/>
                  Salvatore Ferragamo <br/>
                  Steiner <br/>
                  SOM <br/>
                  Tishman Speyer <br/>
                  Thomas Phifer and Partners <br/>
                  Two Trees <br/>
                  Zaha Hadid Architects <br/>
                  Zeidler Partnership <br/>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

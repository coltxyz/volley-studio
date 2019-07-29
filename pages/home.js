import Page from '../components/Page'
import Layout from '../components/Layout'
import Stack from '../components/Stack';
import Arrow from '../components/svg/arrow';

import "../styles/styles.scss"

import arrayShuffle from 'array-shuffle';

const mockStackImages = [
  {
    src: '/static/demo-images/02_Tribune_white.jpg',
    activeSrc: '/static/demo-images/02_Tribune.jpg',
    id: '1'
  },
  {
    src: '/static/demo-images/04_TheShed_white.jpg',
    activeSrc: '/static/demo-images/04_TheShed.jpg',
    id: '2'
  },
  {
    src: '/static/demo-images/03_Couch_white.jpg',
    activeSrc: '/static/demo-images/03_Couch.jpg',
    id: '3'
  },
  {
    videoSrc: 'https://volley-dev.s3.amazonaws.com/TerracelivingVignette_WonW.mp4',
    activeVideoSrc: 'https://volley-dev.s3.amazonaws.com/TerracelivingVignette.mp4',
    id: '4'
  }
];

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

export default class Home extends Page {

  static slug = 'home'

  constructor() {
    super();
  }

  render() {
    return (
      <Layout { ...this.props }>
        <div className="content-main">

          <div className="home-title full-pg">
            <div className="home-title__inner">
              <img src="/static/logo-lg.png"/>
              <h2>
                We are a 3D visualization studio specializing in the creation of photorealistic animations, still imagery, and VR content
              </h2>
            </div>
            <div className="home-title__content">
              <Arrow />
            </div>
          </div>
          <Stack
            images={ mockStackImages }
          >
            <div className="stack__content">
              <p className="stack__content__p">
                <a href="/project">47 W 47th Street</a><br/>
                <span className="mono">2016</span>
              </p>
              <Arrow hidden />
            </div>
          </Stack>
          <Stack
            images={ arrayShuffle(mockStackImages) }
          >
            <div className="stack__content">
              <p className="stack__content__p">
                <a href="/project">47 W 47th Street</a><br/>
                <span className="mono">2016</span>
              </p>
              <Arrow hidden />
            </div>
          </Stack>
          <Stack
            images={ arrayShuffle(mockStackImages) }
          >
            <div className="stack__content">
              <p className="stack__content__p">
                <a href="/project">47 W 47th Street</a><br/>
                <span className="mono">2016</span>
              </p>
              <Arrow hidden />
            </div>
          </Stack>

          <div className="flex-container full-pg">
            <div className="contact-card">
              <div className="contact-card__bg-1" />
              <div className="contact-card__bg-2" />
              <div className="contact-card__header">
                <img src="/static/logo-black.png"/>
                <div className="info">
                  <p style={{ marginBottom: '0.4rem'}}>
                    <strong>hello@volleystudio.us</strong>
                  </p>
                  <p>
                    45 Main Street, Suite 516<br/>
                    Brooklyn, NY 11201<br/>
                    info@volleystudio.us<br/>
                    718.801.8890<br/>
                  </p>
                </div>
              </div>
              <div className="contact-card__body">
                <textarea placeholder="drop us a line"/>
              </div>
              <div className="contact-card__footer">
                <input placeholder="your email"/>
                <button>
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className="flex-container full-pg about-pg">
            <div className="about-pg__inner">
              <img src="/static/logo-lg.png"/>
              <p>
                <strong>Volley</strong> is an industry-leading architectural visualization and creative studio, specializing in the crafting of stunning imagery that evokes the best possibilities of our clients’ designs. We believe fundamentally in our ability to add value to our clients’ vision through a deep understanding of design intent, a project’s commercial potential, and refined art direction. Volley is led by Michael Klausmeier who has over a decade of experience in high-end architecture and visualization. The studio is located in the Dumbo area of Brooklyn, NY.
              </p>
            </div>
          </div>

          <div className="flex-container full-pg">
            <Stack
              imgWidth={ 250 }
              images={ mockTeamImages }
            />
          </div>

        </div>
      </Layout>
    )
  }
}

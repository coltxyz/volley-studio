import { throttle } from 'throttle-debounce';
import { CSSTransition } from 'react-transition-group';

import Page from '../components/Page';
import Layout from '../components/Layout';
import HomeHero from '../components/home-hero';
import Contact from '../components/contact';
import About from '../components/about';
import HomepageStack from '../components/homepage-stack';
import Fin from '../components/fin';
import ProjectDetail from '../components/project-detail';
import { mockStackImages, tribuneImages, schermerhornImages, PropsForType } from '../lib/constants';

import "../styles/styles.scss";

const MAX_VIDEO_OPACITY = 0.4;
const DISTANCE_THRESHOLD = 200;

let activeChild;

export default class Home extends Page {

  static slug = 'home'

  constructor() {
    super();
    this.state = {
      videoOpacity: MAX_VIDEO_OPACITY,
      noLogo: true,
      isProjectDetail: false
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
      const videos = document.getElementsByTagName('video');
      for (let el of videos) {
        el.play();
      }
    }, 650);

    window.setInterval(this.updateScroll.bind(this), 100 );
  }

  updateScroll = () => {
    activeChild = null;
    try {
      const scrollContainer = document.getElementById('scrollContainer');
      const scrollPosition = scrollContainer.scrollTop;
      [].forEach.call(scrollContainer.children, child => {
        if (Math.abs(scrollPosition - child.offsetTop) < DISTANCE_THRESHOLD ) {
          activeChild = child;
        }
      });


      const propsForType = activeChild
        ? PropsForType[activeChild.dataset.type]
        : PropsForType['null']

      this.setState({
        ...propsForType
      });

    } catch (e) {
      console.log(e);
    }
  }

  onDetailClick = () => {
    this.setState({
      isProjectDetail: true
    })
  }

  render() {
    return (
      <Layout
        { ...this.props }
        logo={ this.state.logo }
        controls={ this.state.controls }
        inspect={ this.state.inspect }
        text={ this.state.text }
        onDetailClick={ this.onDetailClick }
      >
        <video
          hidden
          className="bg-video"
          style={{ opacity: this.state.videoOpacity }}
          src="https://volley-dev.s3.amazonaws.com/TerracelivingVignette_WonW.mp4"
          autoPlay loop muted
        />
        <div className="scroll-hider">
          <div
            className="content-main"
            id="scrollContainer"
          >
            <CSSTransition
              in={ this.state.isProjectDetail }
              unmountOnExit
              classNames="transition"
              timeout={ 500 }
            >
              { state => (
                <ProjectDetail
                  onCloseClick={ () => this.setState({ isProjectDetail: false })}
                />
              )}
            </CSSTransition>
            <HomeHero />
            <HomepageStack
              id="portfolio"
              frameId="1"
              images={ mockStackImages }
              activeFrameId={ this.state.activeFrameId }
              isExpanded={ this.state.isProjectDetail }
            />
            <HomepageStack
              frameId="2"
              images={ schermerhornImages }
              activeFrameId={ this.state.activeFrameId }
              isExpanded={ this.state.isProjectDetail }
            />
            <HomepageStack
              frameId="3"
              images={ tribuneImages }
              activeFrameId={ this.state.activeFrameId }
              onDetailClick={ this.onDetailClick }
              isExpanded={ this.state.isProjectDetail }
            />
            <About />
            <Contact />
            <Fin />
          </div>
        </div>
      </Layout>
    )
  }
}

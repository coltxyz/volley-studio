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
import { mockStackImages, tribuneImages, schermerhornImages } from '../lib/constants';

import "../styles/styles.scss";

const MAX_VIDEO_OPACITY = 0.4;

export default class Home extends Page {

  static slug = 'home'

  constructor() {
    super();
    this.state = {
      videoOpacity: MAX_VIDEO_OPACITY,
      noLogo: true,
      projectDetail: false
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
    let activeChild;
    try {
      const scrollContainer = this.refs.scrollContainer;
      const scrollPosition = scrollContainer.scrollTop;
      [].forEach.call(scrollContainer.children, child => {
        if (scrollPosition >= child.offsetTop) {
          activeChild = child;
        }
      });

      const scrollPcnt = 1 - scrollPosition / window.innerHeight;
      const videoOpacity = MAX_VIDEO_OPACITY * (scrollPcnt > 0 ? scrollPcnt : 0);

      this.setState({
        noLogo: Boolean(activeChild.dataset.nologo),
        activeFrameId: activeChild.dataset.frameid,
        videoOpacity
      });

    } catch (e) {
      console.log(e);
    }
  }

  onDetailClick = () => {
    this.setState({
      projectDetail: true
    })
  }

  render() {
    return (
      <Layout { ...this.props } noLogo={ this.state.noLogo }>
        <video
          className="bg-video"
          style={{ opacity: this.state.videoOpacity }}
          src="https://volley-dev.s3.amazonaws.com/TerracelivingVignette_WonW.mp4"
          autoPlay loop muted
        />
        <div className="scroll-hider">
          <div
            className="content-main"
            ref="scrollContainer"
          >
            <CSSTransition
              in={ this.state.projectDetail }
              unmountOnExit
              classNames="transition"
              timeout={ 500 }
            >
              { state => (
                <ProjectDetail
                  onCloseClick={ () => this.setState({ projectDetail: false })}
                />
              )}
            </CSSTransition>
            <HomeHero />
            <HomepageStack
              id="portfolio"
              frameId="1"
              images={ mockStackImages }
              activeFrameId={ this.state.activeFrameId }
              onDetailClick={ this.onDetailClick }
              isExpanded={ this.state.projectDetail }
            />
            <HomepageStack
              frameId="2"
              images={ schermerhornImages }
              activeFrameId={ this.state.activeFrameId }
              onDetailClick={ this.onDetailClick }
              isProjectDetail={ this.state.projectDetail }
            />
            <HomepageStack
              frameId="3"
              images={ tribuneImages }
              activeFrameId={ this.state.activeFrameId }
              onDetailClick={ this.onDetailClick }
              isProjectDetail={ this.state.projectDetail }
            />
            <Contact />
            <About />
            <Fin />
          </div>
        </div>
      </Layout>
    )
  }
}

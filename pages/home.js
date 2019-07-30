import { throttle } from 'throttle-debounce';

import Page from '../components/Page'
import Layout from '../components/Layout'
import HomeHero from '../components/home-hero';
import Contact from '../components/contact';
import About from '../components/about';
import HomepageStack from '../components/homepage-stack';
import Fin from '../components/fin';
import ProjectDetail from '../components/project-detail';

import "../styles/styles.scss"

const activeClassName = 'module--active';

export default class Home extends Page {

  static slug = 'home'

  constructor() {
    super();
    this.state = {
      videoOpacity: 0.4,
      noLogo: true,
      projectDetail: false
    }
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

      this.setState({
        noLogo: Boolean(activeChild.dataset.nologo)
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
        <div
          className="content-main"
          ref="scrollContainer"
          onScroll={ throttle(300, this.updateScroll) }
        >
          <ProjectDetail
            isVisible={ this.state.projectDetail }
            onCloseClick={ () => this.setState({ projectDetail: false })}
          />
          <HomeHero />
          <HomepageStack onDetailClick={ this.onDetailClick } />
          <HomepageStack onDetailClick={ this.onDetailClick } />
          <HomepageStack onDetailClick={ this.onDetailClick } />
          <Contact />
          <About />
          <Fin />
        </div>
      </Layout>
    )
  }
}

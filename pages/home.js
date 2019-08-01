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

import "../styles/styles.scss";

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
        noLogo: Boolean(activeChild.dataset.nologo),
        activeFrameId: activeChild.dataset.frameid
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
        <div
          className="content-main"
          ref="scrollContainer"
          onScroll={ throttle(300, this.updateScroll) }
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
            frameId="1"
            activeFrameId={ this.state.activeFrameId }
            onDetailClick={ this.onDetailClick }
            isProjectDetail={ this.state.projectDetail }
          />
          <HomepageStack
            frameId="2"
            activeFrameId={ this.state.activeFrameId }
            onDetailClick={ this.onDetailClick }
            isProjectDetail={ this.state.projectDetail }
          />
          <HomepageStack
            frameId="3"
            activeFrameId={ this.state.activeFrameId }
            onDetailClick={ this.onDetailClick }
            isProjectDetail={ this.state.projectDetail }
          />
          <Contact />
          <About />
          <Fin />
        </div>
      </Layout>
    )
  }
}

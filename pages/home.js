import { throttle } from 'throttle-debounce';
import { CSSTransition } from 'react-transition-group';

import Page from '../components/Page';
import Layout from '../components/Layout';
import HomeHero from '../components/home-hero';
import Contact from '../components/contact';
import About from '../components/about';
import Stack from '../components/Stack';
import Fin from '../components/fin';
import ProjectDetail from '../components/project-detail';
import { mockStackImages, tribuneImages, schermerhornImages, PropsForType } from '../lib/constants';

import "../styles/styles.scss";

const MAX_VIDEO_OPACITY = 0.4;
const DISTANCE_THRESHOLD = 200;
const TRANSITION_INTERVAL = 300;

let activeChild;

export default class Home extends Page {

  static slug = 'home'

  constructor() {
    super();
    this.state = {
      isProjectDetail: false,
      activeFrameId: 0
    }
  }

  componentDidMount() {
    window.setTimeout(() => {
      const videos = document.getElementsByTagName('video');
      for (let el of videos) {
        el.play();
      }
    }, 650);

    this.scrollContainer = document.getElementById('scrollContainer');
    window.setInterval(this.updateScroll.bind(this), 100);
  }

  updateScroll = () => {
    activeChild = null;
    try {
      const scrollPosition = this.scrollContainer.scrollTop;
      [].forEach.call(this.scrollContainer.children, child => {
        if (Math.abs(scrollPosition - child.offsetTop) < DISTANCE_THRESHOLD ) {
          activeChild = child;
        }
      });

      let propsForType = activeChild
        ? PropsForType[activeChild.dataset.frametype]
        : PropsForType['null']

      let activeFrameId = activeChild
        ? parseInt(activeChild.dataset.frameid)
        : null

      if (this.state.isProjectDetail) {
        propsForType = PropsForType.projectDetail
      }

      this.setState({
        ...propsForType,
        activeFrameId,
        scrollBarPosition: scrollPosition / this.scrollContainer.childNodes.length
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

  onCloseClick = () => {
    this.setState({
      isProjectDetail: false
    })
  }

  handleScrollbarDrag = (e, data) => {
    const { y } = data;
    const scrollPosition = y * this.scrollContainer.childNodes.length;
    this.scrollContainer.scrollTo(0, scrollPosition );
  }

  onScrollRequest = ({ direction, id }) => {
    let el;
    if (direction === 'up') {
      el = document.querySelector(`[data-frameid='${ this.state.activeFrameId - 1 }']`);
    } else if (direction === 'down') {
      el = document.querySelector(`[data-frameid='${ this.state.activeFrameId + 1 }']`);
    } else if ( typeof id !== undefined) {
      el = document.getElementById(id);
    }

    if (!el) {
      return;
    }

    // Determine if we should do a scroll or fade animation
    if (Math.abs(parseInt(el.dataset.frameid) - this.state.activeFrameId) <=  1) {
      el.scrollIntoView({ behavior:'smooth' });
    } else {
      this.setState({
        isTransitioning: true
      });
      window.setTimeout(() => {
        el.scrollIntoView();
        this.setState({
          isTransitioning: false
        });
      }, TRANSITION_INTERVAL)
    }

    // update controls and detail overlay
    this.setState({
      isProjectDetail: false
    });
    this.updateScroll();
  }

  render() {
    return (
      <Layout
        { ...this.props }
        scrollBarPosition={ this.state.scrollBarPosition }
        onScrollbarDrag={ this.handleScrollbarDrag }
        isTransitioning={ this.state.isTransitioning }
        logo={ this.state.logo }
        controls={ this.state.controls }
        inspect={ this.state.inspect }
        text={ this.state.text }
        close={ this.state.close }
        onDetailClick={ this.onDetailClick }
        onCloseClick={ this.onCloseClick }
        onScrollRequest={ this.onScrollRequest }
      >
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
              { state => <ProjectDetail /> }
            </CSSTransition>
            <HomeHero
              id="home"
              frameId={ 0 }
              isActiveFrame={ this.state.activeFrameId == 0 }
              frameType="homeHero"
              onArrowClick={ () => this.onScrollRequest({ direction: 'down' })}
            />
            <Stack
              id="portfolio"
              frameId={ 1 }
              frameType="portfolioItem"
              images={ mockStackImages }
              isActiveFrame={ this.state.activeFrameId == 1 }
              isExpanded={ this.state.isProjectDetail }
            />
            <Stack
              frameId={ 2 }
              frameType="portfolioItem"
              images={ schermerhornImages }
              isActiveFrame={ this.state.activeFrameId == 2 }
              isExpanded={ this.state.isProjectDetail }
            />
            <Stack
              frameId={ 3 }
              frameType="portfolioItem"
              images={ tribuneImages }
              isActiveFrame={ this.state.activeFrameId == 3 }
              isExpanded={ this.state.isProjectDetail }
            />
            <About
              id="about"
              frameId={ 4 }
            />
            <Contact
              id="contact"
              frameId={ 8 }
            />
            <Fin
              frameId={ 9 }
              id="fin"
            />
          </div>
        </div>
      </Layout>
    )
  }
}

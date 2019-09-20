import { CSSTransition } from 'react-transition-group';

import "../styles/styles.scss";
import { PropsForType, processSanityPortfolioItem } from '../lib/util';
import { portfolioQuery } from '../lib/queries';
import Contact from '../components/contact';
import FirmProfile from '../components/firm-profile';
import HomeHero from '../components/home-hero';
import Layout from '../components/layout';
import ProjectDetail from '../components/project-detail';
import sanity from '../lib/sanity'
import Stack from '../components/stack';
import Services from '../components/services';
import SelectClients from '../components/select-clients';
import Team from '../components/team';

const MAX_VIDEO_OPACITY = 0.4;
const DISTANCE_THRESHOLD = 200;
const TRANSITION_INTERVAL = 300;

let activeChild;

export default class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      isProjectDetail: false,
      activeFrameId: 0
    }
  }

  static async getInitialProps() {
    const allContent = await sanity.fetch('*');
    const portfolio = await sanity.fetch(portfolioQuery);
    return {
      portfolio,
      about: allContent.filter( item => item._type === 'about-pages'),
      team: allContent.filter( item => item._type === 'team-member')
    }
  }

  componentDidMount() {
    // window.setTimeout(() => {
    //   const videos = document.getElementsByTagName('video');
    //   for (let el of videos) {
    //     el.play();
    //   }
    // }, 650);

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
    this.onScrollRequest({ direction: 'center', smooth: false });
    this.setState({
      isProjectDetail: false
    })
  }

  handleScrollbarDrag = (e, data) => {
    const { y } = data;
    const scrollPosition = y * this.scrollContainer.childNodes.length;
    this.scrollContainer.scrollTo(0, scrollPosition );
  }

  onScrollRequest = ({ direction, id, smooth }) => {
    let el;
    if (direction === 'up') {
      el = document.querySelector(`[data-frameid='${ this.state.activeFrameId - 1 }']`);
    } else if (direction === 'down') {
      el = document.querySelector(`[data-frameid='${ this.state.activeFrameId + 1 }']`);
    } else if (direction === 'center') {
      el = document.querySelector(`[data-frameid='${ this.state.activeFrameId }']`);
    } else if ( typeof id !== undefined) {
      el = document.getElementById(id);
    }

    if (!el) {
      return;
    }

    // Determine if we should do a scroll or fade animation
    if (smooth !== false && Math.abs(parseInt(el.dataset.frameid) - this.state.activeFrameId) <=  1) {
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
    const portfolioItems = this.props.portfolio.map(processSanityPortfolioItem);
    return (
      <Layout
        { ...this.props }
        scrollBarPosition={ this.state.scrollBarPosition }
        onScrollbarDrag={ this.handleScrollbarDrag }
        isTransitioning={ this.state.isTransitioning }
        logo={ this.state.logo }
        upArrow={ this.state.upArrow }
        downArrow={ this.state.downArrow }
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
              blurb={ this.props.about[0].homepageBlurb }
            />
            {
              portfolioItems.map( (portfolioItem, i) => (
                <Stack
                  id={ i == 0 ? "portfolio" : ''}
                  frameId={ i + 1 }
                  frameType="portfolioItem"
                  images={ portfolioItem.media }
                  isActiveFrame={ this.state.activeFrameId == i+1 }
                  isExpanded={ this.state.isProjectDetail }
                />
              ))
            }
            <FirmProfile
              content={ this.props.about[0] }
              frameId={ portfolioItems.length + 1 }
              activeFrameId={ this.state.activeFrameId }
            />
            <Services
              content={ this.props.about[0] }
              frameId={ portfolioItems.length + 2 }
              activeFrameId={ this.state.activeFrameId }
            />
            <Team
              images={[]}
              frameId={ portfolioItems.length + 3 }
              activeFrameId={ this.state.activeFrameId }
            />
            <SelectClients
              content={ this.props.about[0] }
              frameId={ portfolioItems.length + 4 }
              activeFrameId={ this.state.activeFrameId }
            />
            <Contact
              id="contact"
              content={ this.props.about[0] }
              frameId={ portfolioItems.length + 5 }
              activeFrameId={ this.state.activeFrameId }
            />
          </div>
        </div>
      </Layout>
    )
  }
}

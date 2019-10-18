import Router from 'next/router';
import { CSSTransition } from 'react-transition-group';
import { get } from 'dotty';

import "../styles/styles.scss";
import { projectsQuery, teamQuery, aboutQuery, featuredContent } from '../lib/queries';
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
import {
  TRANSITION_ENTERING,
  TRANSITION_EXITING,
  TRANSITION_INTERVAL_ENTER,
  TRANSITION_INTERVAL_EXIT,
  PORTFOLIO_ITEM_LIST_TYPE,
  TEAM_MEMBER_LIST_TYPE,
  DISTANCE_THRESHOLD,
  SCROLL_UPDATE_INTERVAL,
  checkOnInterval,
  getDocumentImages
} from '../lib/util';

export default class Home extends React.Component {

  topMostImageForStack = {}
  scrollContainerChildren = []

  constructor({ activeSlug }) {
    super();
    this.state = {
      activeFrameId: 0,
      activeDataSrcId: null,
      activeSlug,
      isProjectDetail: Boolean(activeSlug),
      isFocus: true,
      transitionState: TRANSITION_ENTERING
    }
  }

  static async getInitialProps({ req }) {
    const about = await sanity.fetch(aboutQuery);
    const activeSlug = req.url.replace("/", "") || null;
    const featured = await sanity.fetch(featuredContent);
    const projects = await sanity.fetch(projectsQuery);
    const team = await sanity.fetch(teamQuery);
    return {
      about,
      activeSlug,
      featured,
      projects,
      team
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
    this.scrollContainerChildren = [].map.call(this.scrollContainer.children, c => ({
      offsetTop: c.offsetTop,
      dataset: c.dataset || {}
    }))
    this.topMostImageForStack = this.props.projects.reduce((acc, item) => {
      acc[item._id] = item.images[ item.images.length - 1]._key;
      return acc;
    }, {})
    this.interval = window.setInterval(
      this.updateScroll.bind(this),
      SCROLL_UPDATE_INTERVAL
    );
    this.transitionIn(() => {})
  }

  componentWillUnmount() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
  }

  transition(fn, transitionState, interval) {
    this.setState({
      transitionState: transitionState
    })
    window.setTimeout(() => {
      fn();
      const images = getDocumentImages();
      checkOnInterval({
        every: SCROLL_UPDATE_INTERVAL,
        ifCond: () => images.every(img => img.complete),
        then: () => this.setState({ transitionState: null }),
      })
    }, interval);
  }

  transitionIn = fn => {
    this.transition(fn, TRANSITION_ENTERING, TRANSITION_INTERVAL_ENTER)
  }

  transitionOut = fn => {
    this.transition(fn, TRANSITION_EXITING, TRANSITION_INTERVAL_EXIT)
  }

  updateScroll = () => {

    if (this.state.transitionState) { return }

    try {
      const getScrollDistance = child => (
        Math.abs(this.scrollContainer.scrollTop - child.offsetTop)
      )
      const closestChild = this.scrollContainerChildren.reduce((acc, child) => {
        const distance = getScrollDistance(child);
        const bestDistance = getScrollDistance(acc);
        return distance < bestDistance ? child : acc;
      })
      const isFocus = getScrollDistance(closestChild) < DISTANCE_THRESHOLD;

      let activeFrameType = null;
      if (this.state.isProjectDetail) {
        activeFrameType = 'projectDetail'
      } else if (isFocus) {
        activeFrameType = closestChild.dataset.frametype;
      }

      this.setState({
        activeFrameType,
        activeFrameId: parseInt(closestChild.dataset.frameid),
        activeDataSrcId: closestChild.dataset.sourceid,
        isFocus,
        scrollBarPosition: this.scrollContainer.scrollTop / this.scrollContainerChildren.length
      });

    } catch (e) {
      console.log(e);
    }
  }

  onStackClick = ({ dataSourceId, topMostImageId }) => {
    this.topMostImageForStack[ dataSourceId ] = topMostImageId
  }

  onDetailClick = () => {
    const project = this.getActivePortfolioItem();
    this.transitionIn(() => {
      this.showProjectDetail({ project })
    })
  }

  showProjectDetail = ({ project }) => {
    const activeSlug = get(project, 'slug.current');
    window.history.replaceState({}, null, `/${ activeSlug }` );
    this.setState({
      isProjectDetail: true,
      activeSlug
    })
  }

  hideProjectDetail = () => {
    window.history.replaceState({}, null, '/')
    this.setState({
      isProjectDetail: false,
      activeSlug: null
    })
  }

  onCloseClick = () => {
    this.transitionOut(() => {
      this.onScrollNavRequest({ direction: 'center', scroll: true })
      this.hideProjectDetail()
    })
  }

  handleScrollbarDrag = (e, data) => {
    const { y } = data;
    const scrollPosition = y * this.scrollContainer.childNodes.length;
    this.scrollContainer.scrollTo(0, scrollPosition );
  }

  onProjectChange = ({ direction, slug }) => {
    let newProject, newIndex;
    const projects = this.props.projects;
    const index = projects.findIndex(p => get(p, 'slug.current') === this.state.activeSlug);

    if (direction === 'left') {
      newIndex = index <= 0 ? projects.length - 1 : index - 1;
      newProject = projects[newIndex];
    } else if (direction === 'right') {
      newIndex = index >= projects.length - 1 ? 0 : index + 1;
      newProject = projects[newIndex];
    } else if (slug) {
      newProject = projects.find( p => get(p, 'slug.current') === slug)
    }

    this.transitionIn(() => {
      this.showProjectDetail({ project: newProject })
    })
  }

  onScrollNavRequest = ({ direction, id, scroll }) => {
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
    if (scroll !== false && Math.abs(parseInt(el.dataset.frameid) - this.state.activeFrameId) <=  1) {
      el.scrollIntoView({ behavior: 'smooth' });
      this.hideProjectDetail();
      this.updateScroll();
    } else {
      this.transitionIn(() => {
        el.scrollIntoView()
        this.hideProjectDetail();
        this.updateScroll();
      })
    }

  }

  getActivePortfolioItem = () => {
    const portfolioItems = this.props.projects;
    const currentViewedItem = portfolioItems
      .find(item => item._id === this.state.activeDataSrcId);
    const activeSlugItem = portfolioItems
      .find(item => get(item, 'slug.current') === this.state.activeSlug);
    return activeSlugItem || currentViewedItem;
  }

  getFeaturedProjects = () => {
    const { featured, projects } = this.props
    return featured
      .find(l => l._type === PORTFOLIO_ITEM_LIST_TYPE)
      .items
      .map(l => projects.find( m => m._id === l._ref));
  }

  render() {
    const portfolioItems = this.props.projects;
    const featuredProjects = this.getFeaturedProjects();
    const activePortfolioItem = this.getActivePortfolioItem();

    return (
      <Layout
        { ...this.props }
        isTransitioning={ this.state.isTransitioning }
        transitionState={ this.state.transitionState }
        activeFrameType={ this.state.activeFrameType }
        activePortfolioItem={ activePortfolioItem }
        portfolioItems={ portfolioItems }
        subtitleText={ get(activePortfolioItem, 'year') }
        scrollBarPosition={ this.state.scrollBarPosition }
        titleText={ get(activePortfolioItem, 'title') }
        onScrollbarDrag={ this.handleScrollbarDrag }
        onDetailClick={ this.onDetailClick }
        onCloseClick={ this.onCloseClick }
        onProjectChange={ this.onProjectChange }
        onScrollNavRequest={ this.onScrollNavRequest }
      >
        { this.state.isProjectDetail && (
          <ProjectDetail
            data={ activePortfolioItem }
            activeImageId={ get(this.topMostImageForStack, get(activePortfolioItem, '_id')) }
          />
        )}
        <div className="scroll-hider">
          <div
            className="content-main"
            id="scrollContainer"
          >
            <HomeHero
              id="home"
              frameId={ 0 }
              isActiveFrame={ this.state.activeFrameId == 0 }
              frameType="homeHero"
              blurb={ this.props.about[0].homepageBlurb }
            />
            {
              featuredProjects.map( (portfolioItem, i) => (
                <Stack
                  key={ i }
                  id={ i == 0 ? "portfolio" : ''}
                  frameId={ i + 1 }
                  className="module"
                  frameType="portfolioItem"
                  dataSourceId={ portfolioItem._id }
                  images={ portfolioItem.images }
                  isActiveFrame={ this.state.isFocus && this.state.activeFrameId == i+1 }
                  onStackClick={ this.onStackClick }
                />
              ))
            }
            <FirmProfile
              id="about"
              content={ this.props.about[0] }
              frameId={ featuredProjects.length + 1 }
              activeFrameId={ this.state.activeFrameId }
            />
            <Services
              content={ this.props.about[0] }
              frameId={ featuredProjects.length + 2 }
              activeFrameId={ this.state.activeFrameId }
            />
            <Team
              content={ get(this.props.team, '0.members') }
              frameId={ featuredProjects.length + 3 }
              activeFrameId={ this.state.activeFrameId }
            />
            <SelectClients
              content={ this.props.about[0] }
              frameId={ featuredProjects.length + 4 }
              activeFrameId={ this.state.activeFrameId }
            />
            <Contact
              id="contact"
              content={ this.props.about[0] }
              frameId={ featuredProjects.length + 5 }
              activeFrameId={ this.state.activeFrameId }
            />
          </div>
        </div>
      </Layout>
    )
  }
}

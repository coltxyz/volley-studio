import Router from 'next/router';
import { CSSTransition } from 'react-transition-group';
import { get } from 'dotty';

import "../styles/styles.scss";
import { ControlSettingsForFrameType } from '../lib/util';
import { portfolioQuery, teamQuery, aboutQuery } from '../lib/queries';
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
const SCROLL_UPDATE_INTERVAL = 100;

let activeChild;

export default class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      controlProps: {},
      isProjectDetail: false,
      activeFrameId: 0,
      activeDataSrcId: null,
      currentSlug: null
    }
  }

  static async getInitialProps() {
    const portfolio = await sanity.fetch(portfolioQuery);
    const team = await sanity.fetch(teamQuery);
    const about = await sanity.fetch(aboutQuery);
    return {
      portfolio,
      team,
      about
    }
  }

  componentDidMount() {
    // window.setTimeout(() => {
    //   const videos = document.getElementsByTagName('video');
    //   for (let el of videos) {
    //     el.play();
    //   }
    // }, 650);

    const currentSlug = get(Router, 'router.query.slug');
    if (currentSlug) {
      const slugItem = this.props.portfolio.find( item =>
        get(item, 'slug.current') === currentSlug
      );

      if (!slugItem) {
        throw new Error('404')
      }

      this.setState({
        isProjectDetail: true,
        currentSlug
      })
    }

    this.scrollContainer = document.getElementById('scrollContainer');
    this.interval = window.setInterval(
      this.updateScroll.bind(this),
      SCROLL_UPDATE_INTERVAL
    );
  }

  componentWillUnmount() {
    if (this.interval) {
      window.clearInterval(this.interval);
    }
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

      let controlProps = activeChild
        ? ControlSettingsForFrameType[activeChild.dataset.frametype]
        : ControlSettingsForFrameType['null']

      let activeFrameId = activeChild
        ? parseInt(activeChild.dataset.frameid)
        : null

      let activeDataSrcId = activeChild
        ? activeChild.dataset.sourceid
        : null

      if (this.state.isProjectDetail) {
        controlProps = ControlSettingsForFrameType.projectDetail
      }

      this.setState({
        controlProps,
        activeFrameId,
        activeDataSrcId,
        scrollBarPosition: scrollPosition / this.scrollContainer.childNodes.length
      });

    } catch (e) {
      console.log(e);
    }
  }

  onDetailClick = () => {
    const project = this.getActivePortfolioItem();
    const currentSlug = get(project, 'slug.current');
    window.history.replaceState({}, null, `/${ currentSlug }` );
    this.setState({
      isProjectDetail: true,
      currentSlug
    })
  }

  onCloseClick = () => {
    this.onScrollRequest({ direction: 'center', smooth: false });
    this.setState({
      isProjectDetail: false,
      currentSlug: null
    })
    window.history.replaceState({}, null, '/')
  }

  handleScrollbarDrag = (e, data) => {
    const { y } = data;
    const scrollPosition = y * this.scrollContainer.childNodes.length;
    this.scrollContainer.scrollTo(0, scrollPosition );
  }

  onProjectChange = ({ direction, slug }) => {
    let newProject, newIndex;
    const projects = this.props.portfolio;
    const index = projects.findIndex(p => get(p, 'slug.current') === this.state.currentSlug);

    if (direction === 'left') {
      newIndex = index <= 0 ? projects.length - 1 : index - 1;
      newProject = projects[newIndex];
    } else if (direction === 'right') {
      newIndex = index >= projects.length - 1 ? 0 : index + 1;
      newProject = projects[newIndex];
    } else if (slug) {
      newProject = projects.find( p => get(p, 'slug.current') === slug)
    }

    const [currentSlug, activeDataSrcId] = [get(newProject, 'slug.current'), newProject._id];
    this.setState({
      currentSlug
    });
    window.history.replaceState({}, null, `/${ currentSlug }`);
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
    this.updateScroll();
  }

  getActivePortfolioItem = () => {
    const portfolioItems = this.props.portfolio;
    const currentViewedItem = portfolioItems.find(item => item._id === this.state.activeDataSrcId);
    const activeSlugItem = portfolioItems.find(item => get(item, 'slug.current') === this.state.currentSlug);
    return activeSlugItem || currentViewedItem;
  }

  render() {
    const portfolioItems = this.props.portfolio;
    const activePortfolioItem = this.getActivePortfolioItem();
    return (
      <Layout
        { ...this.props }
        isTransitioning={ this.state.isTransitioning }
        controlProps={ this.state.controlProps }
        titleText={ get(activePortfolioItem, 'title') }
        subtitleText={ get(activePortfolioItem, 'year') }
        portfolioItems={ portfolioItems }
        activePortfolioItem={ activePortfolioItem }
        scrollBarPosition={ this.state.scrollBarPosition }
        onScrollbarDrag={ this.handleScrollbarDrag }
        onDetailClick={ this.onDetailClick }
        onCloseClick={ this.onCloseClick }
        onProjectChange={ this.onProjectChange }
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
              { state => (
                <ProjectDetail
                  data={ activePortfolioItem }
                />
              )}
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
                  key={ i }
                  id={ i == 0 ? "portfolio" : ''}
                  frameId={ i + 1 }
                  frameType="portfolioItem"
                  dataSourceId={ portfolioItem._id }
                  images={ portfolioItem.images }
                  isActiveFrame={ this.state.activeFrameId == i+1 }
                  isExpanded={ this.state.isProjectDetail }
                />
              ))
            }
            <FirmProfile
              id="about"
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
              content={ this.props.team }
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

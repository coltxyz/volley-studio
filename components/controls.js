import classname from 'classnames';
import Link from 'next/link'

import Carat from  './svg/carat'
import Glasses from  './svg/glasses-w-text'
import Cross from './svg/cross'
import ProjectSelector from './project-selector'

const Controls = props => {

  return (
    <div className="controls">
      <div className={ classname("controls__item logo", { hide: !props.controlProps.logo }) }>
        <Link href="/">
          <a onClick={ e => { e.preventDefault(); props.onScrollRequest({ id: 'home' })}}>
            VOLLEY STUDIO
          </a>
        </Link>
      </div>

      <div className={ classname("controls__item project-selector-control", { hide: !props.controlProps.projectSelect })}>
        <ProjectSelector
          activeItem={ props.activePortfolioItem }
          items={ props.portfolioItems }
        />
      </div>

      <div
        className={ classname("controls__item project-nav--left", { hide: !props.controlProps.projectNav })}
        onClick={ () => props.onProjectChange({ direction: 'left'}) }
      >
        <Carat />
      </div>
      <div
        className={ classname("controls__item project-nav--right", { hide: !props.controlProps.projectNav })}
        onClick={ () => props.onProjectChange({ direction: 'right'}) }
      >
        <Carat />
      </div>
      <div
        className={ classname("controls__item up-arrow", { hide: !props.controlProps.upArrow }) }
        onClick={ () => props.onScrollRequest({ direction: 'up' })}
      >
        <Carat />
      </div>
      <div
        className={ classname("controls__item down-arrow", { hide: !props.controlProps.downArrow }) }
        onClick={ () => props.onScrollRequest({ direction: 'down' })}
      >
        <Carat />
      </div>
      <div
        className={ classname("controls__item close", { hide: !props.controlProps.close }) }
        onClick={ props.onCloseClick }
      >
        <Cross />
      </div>
      <div
        className={ classname("controls__item glasses", { hide: !props.controlProps.inspect }) }
        onClick={ props.onDetailClick }
      >
        <Glasses />
      </div>
      <div className={ classname("controls__item text", { hide: !props.controlProps.text }) }>
        <p><strong>{ props.titleText }</strong></p>
        <div className="mono">{ props.subtitleText }</div>
      </div>
    </div>
  )
};

export default Controls

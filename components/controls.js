import classname from 'classnames';
import Link from 'next/link'

import Carat from  './svg/carat'
import Glasses from  './svg/glasses-w-text'
import Cross from './svg/cross'
import ProjectSelector from './project-selector'
import { ControlSettingsForFrameType } from '../lib/util';

const Controls = props => {

  const {
    logo,
    projectSelect,
    projectNav,
    upArrow,
    downArrow,
    close,
    inspect,
    text
  } = ControlSettingsForFrameType[ props.activeFrameType ] || {};

  return (
    <div className="controls">
      <div className={ classname("controls__item logo", { hide: !logo }) }>
        <Link href="/">
          <a onClick={ e => { e.preventDefault(); props.onScrollNavRequest({ id: 'home' })}}>
            VOLLEY STUDIO
          </a>
        </Link>
      </div>

      <div className={ classname("controls__item project-selector-control", { hide: !projectSelect })}>
        <ProjectSelector
          activeItem={ props.activePortfolioItem }
          items={ props.portfolioItems }
          onProjectChange={ props.onProjectChange }
        />
      </div>

      <div
        className={ classname("controls__item project-nav--left", { hide: !projectNav })}
        onClick={ () => props.onProjectChange({ direction: 'left'}) }
      >
        <Carat />
      </div>
      <div
        className={ classname("controls__item project-nav--right", { hide: !projectNav })}
        onClick={ () => props.onProjectChange({ direction: 'right'}) }
      >
        <Carat />
      </div>
      <div
        className={ classname("controls__item up-arrow", { hide: !upArrow }) }
        onClick={ () => props.onScrollNavRequest({ direction: 'up' })}
      >
        <Carat />
      </div>
      <div
        className={ classname("controls__item down-arrow", { hide: !downArrow }) }
        onClick={ () => props.onScrollNavRequest({ direction: 'down' })}
      >
        <Carat />
      </div>
      <div
        className={ classname("controls__item close", { hide: !close }) }
        onClick={ props.onCloseClick }
      >
        <Cross />
      </div>
      <div
        className={ classname("controls__item glasses", { hide: !inspect }) }
        onClick={ props.onDetailClick }
      >
        <Glasses />
      </div>
      <div className={ classname("controls__item text", { hide: !text }) }>
        <p><strong>{ props.titleText }</strong></p>
        <div className="mono">{ props.subtitleText }</div>
      </div>
    </div>
  )
};

export default Controls

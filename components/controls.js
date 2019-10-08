import classname from 'classnames';
import Link from 'next/link'

import Carat from  './svg/carat'
import Glasses from  './svg/glasses-w-text'
import Cross from './svg/cross'

const Controls = props => {

  return (
    <div className="controls">
      <div className={ classname("controls__item logo", { hide: !props.logo }) }>
        <Link href="/">
          <a onClick={ e => { e.preventDefault(); props.onScrollRequest({ id: 'home' })}}>
            VOLLEY STUDIO
          </a>
        </Link>
      </div>

      <div
        className={ classname("controls__item project-nav__left", { hide: !props.projectNav })}
        onClick={ () => props.onProjectChange({ direction: 'left'}) }
      >
        <Carat />
      </div>
      <div
        className={ classname("controls__item project-nav__right", { hide: !props.projectNav })}
        onClick={ () => props.onProjectChange({ direction: 'right'}) }
      >
        <Carat />
      </div>
      <div
        className={ classname("controls__item up-arrow", { hide: !props.upArrow }) }
        onClick={ () => props.onScrollRequest({ direction: 'up' })}
      >
        <Carat />
      </div>
      <div
        className={ classname("controls__item down-arrow", { hide: !props.downArrow }) }
        onClick={ () => props.onScrollRequest({ direction: 'down' })}
      >
        <Carat />
      </div>
      <div
        className={ classname("controls__item close", { hide: !props.close }) }
        onClick={ props.onCloseClick }
      >
        <Cross />
      </div>
      <div
        className={ classname("controls__item glasses", { hide: !props.inspect }) }
        onClick={ props.onDetailClick }
      >
        <Glasses />
      </div>
      <div className={ classname("controls__item text", { hide: !props.text }) }>
        <p><strong>{ props.titleText }</strong></p>
        <div className="mono">{ props.subtitleText }</div>
      </div>
    </div>
  )
};

export default Controls

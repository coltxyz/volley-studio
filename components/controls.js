import classname from 'classNames';
import Link from 'next/link'

import Carat from  './svg/carat'
import Glasses from  './svg/glasses'
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
        className="controls__item up-arrow"
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
        <p><strong>47 W 47th Street</strong></p>
        <div className="mono">2016</div>
      </div>
    </div>
  )
};

export default Controls

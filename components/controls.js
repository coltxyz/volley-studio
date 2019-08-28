import classname from 'classNames';
import Link from 'next/link'

import Carat from  './svg/carat'
import Glasses from  './svg/glasses'

const Controls = props => {

  return (
    <div className="controls">
      <div className={ classname("controls__item logo", { hide: !props.logo }) }>
        <Link href="/"><a>VOLLEY STUDIO</a></Link>
      </div>
      <div className={ classname("controls__item up-down-toggle", { hide: !props.controls }) }>
        <div className="up-arrow">
          <Carat />
        </div>
        <div className="down-arrow">
          <Carat />
        </div>
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

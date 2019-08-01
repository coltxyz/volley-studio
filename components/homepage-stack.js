import arrayShuffle from 'array-shuffle';

import Stack from './Stack';
import ArrowRight from './svg/arrow-right';
import { mockStackImages } from '../lib/constants';

export default props => (
  <Stack
    className={ props.className }
    frameId={ props.frameId }
    isActiveFrame={ props.activeFrameId == props.frameId }
    isExpanded={ props.isProjectDetail }
    images={ mockStackImages }
    onDetailClick={ props.onDetailClick }
    arrow
  >
    {({ onDetailClick }) => (
      <div className="stack__content">
        <p className="stack__content__p" onClick={ onDetailClick }>
          47 W 47th Street<br/>
          <span className="mono">2016</span>
        </p>
      </div>
    )}
  </Stack>
);

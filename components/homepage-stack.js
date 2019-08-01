import arrayShuffle from 'array-shuffle';

import Stack from './Stack';
import ArrowRight from './svg/arrow-right';
import { mockStackImages } from '../lib/constants';

export default props => (
  <Stack
    frameId={ props.frameId }
    isActiveFrame={ props.activeFrameId == props.frameId }
    isExpanded={ props.isProjectDetail }
    images={ mockStackImages }
  >
    <div className="stack__content">
      <p className="stack__content__p" onClick={ e => { e.preventDefault(); props.onDetailClick(); }}>
        47 W 47th Street<br/>
        <span className="mono">2016</span>
      </p>
    </div>
  </Stack>
);

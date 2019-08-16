import arrayShuffle from 'array-shuffle';

import Stack from './Stack';
import ArrowRight from './svg/arrow-right';

export default props => (
  <Stack
    {...props}
    className="scroll-snap"
    isActiveFrame={ props.activeFrameId == props.frameId }
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

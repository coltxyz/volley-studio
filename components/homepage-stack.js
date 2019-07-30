import arrayShuffle from 'array-shuffle';

import Stack from './Stack';
import { mockStackImages } from '../lib/constants';

export default props => (
  <Stack
    images={ arrayShuffle(mockStackImages) }
  >
    <div className="stack__content">
      <p className="stack__content__p">
        <a href="/project">47 W 47th Street</a><br/>
        <span className="mono">2016</span>
      </p>
    </div>
  </Stack>
);

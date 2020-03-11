import { configure } from '@kadira/storybook';

import 'bootstrap-loader';

function loadStories() {
  require('../stories');
}

configure(loadStories, module);

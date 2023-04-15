import './gallery.js';
import './form.js';
import './user-picture.js';

import { getData } from './api.js';
import { renderPhotos } from './thumbnails.js';
import { showFailureMessage } from './message.js';
import { init, getFilteredPictures } from './filters.js';
import { debounce } from './util.js';
import { initGallery } from './gallery.js';

try {
  const data = await getData();
  const debounceRenderGallery = debounce(renderPhotos, 500);
  init(data, debounceRenderGallery);
  renderPhotos(getFilteredPictures());
  initGallery(data);
} catch (err) {
  showFailureMessage(err.message);
}

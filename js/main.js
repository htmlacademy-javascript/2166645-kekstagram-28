import "./gallery.js";
import "./form.js";
import "./user-picture.js";

import { getData } from './api.js';
import { renderPhotos } from "./thumbnails.js";
import { showFailureMessage } from "./message.js";
import { init, getFilteredPictures } from "./filters.js";
import { debounce } from "./util.js";

try {
  const data = await getData();
  const debounceRenderGallery = debounce(renderPhotos, 500);
  init(data, debounceRenderGallery);
  renderPhotos(getFilteredPictures());
} catch (err) {
  showFailureMessage(err.message);
}

import './api.js';
import './thumbnails.js';
import './gallary.js';
import { sendData, getData } from './api.js';
import './form.js';
import { renderPhotos } from './thumbnails.js';
import { showFailureMessage } from './message.js';

try {
  const data = await getData();
  renderPhotos(data);
} catch (error) {
  showFailureMessage(error.message);
}

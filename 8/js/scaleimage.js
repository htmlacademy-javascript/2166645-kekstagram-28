const STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SETTING = 100;

const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  imageUploadPreview.style.transform = `scale(${value / 100})`;
  scaleControlValue.value = `${value}%`;
};

const onScaleDownClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  let newValue = currentValue - STEP;
  if (newValue < MIN_SCALE) {
    newValue = MIN_SCALE;
  }
  scaleImage(newValue);
};

const onScaleUpClick = () => {
  const currentValue = parseInt(scaleControlValue.value, 10);
  let newValue = currentValue + STEP;
  if (newValue > MAX_SCALE) {
    newValue = MAX_SCALE;
  }
  scaleImage(newValue);
};

const resetScale = () => {
  scaleImage(DEFAULT_SETTING);
};

scaleControlSmaller.addEventListener('click', onScaleDownClick);
scaleControlBigger.addEventListener('click', onScaleUpClick);

export { resetScale };

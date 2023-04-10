const TIME_FOR_ALERT_MESSAGE = 3000;

const failureMessage =
const successMessage =

const showFailureMessage = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px';
  alert.style.zIndex = '1';
  alert.style.backgroundColor = 'yellow';
  alert.style.color = 'red';
  alert.style.fontSize = '30px';
  alert.style.textAlign = 'center';
  alert.textContent = message;
  document.body.append(alert);

  setTimeout(() => {
    alert.remove()}, TIME_FOR_ALERT_MESSAGE
  );
};

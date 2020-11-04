import { ToastProgrammatic as Toast } from 'buefy'

export const showInfo = (message, ...otherProps) => Toast.open({
  message,
  type: 'is-success',
  position: 'is-top-right',
  ...otherProps
});

export const showWarning = (message, ...otherProps) => Toast.open({
  message,
  type: 'is-warning',
  position: 'is-top-right',
  ...otherProps
});

export const showError = (message, ...otherProps) => Toast.open({
  message,
  type: 'is-danger',
  position: 'is-top-right',
  ...otherProps
});

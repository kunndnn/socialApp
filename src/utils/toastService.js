import { toast } from "react-toastify";

const Toast = {
  success: (msg, options = {}) => {
    toast.dismiss(); // clear all previous toasts
    toast.success(msg, options);
  },
  error: (msg, options = {}) => {
    toast.dismiss();
    toast.error(msg, options);
  },
  info: (msg, options = {}) => {
    toast.dismiss();
    toast.info(msg, options);
  },
  warning: (msg, options = {}) => {
    toast.dismiss();
    toast.warning(msg, options);
  }
};

export default Toast;

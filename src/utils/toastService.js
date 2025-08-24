import { toast } from "react-toastify";

toast.dismiss(); // clear all previous toasts

const Toast = {
  success: (msg, options = {}) => toast.success(msg, options),
  error: (msg, options = {}) => toast.error(msg, options),
  info: (msg, options = {}) => toast.info(msg, options),
  warning: (msg, options = {}) => toast.warning(msg, options),
};

export default Toast;

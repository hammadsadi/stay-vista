import toast from "react-hot-toast";
export const toastAlert = (msg, type) => {
  return toast[type](msg);
};

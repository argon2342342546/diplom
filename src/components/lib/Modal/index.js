import { memo } from "react";
import ReactDOM from "react-dom";

export const Modal = memo(({ children, open }) => {
  if (!open) return null;
  return ReactDOM.createPortal(children, document.body);
});

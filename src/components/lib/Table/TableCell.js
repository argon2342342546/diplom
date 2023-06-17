import { useRef, useState } from "react";
import s from "./style.module.scss";

export function TableCell({ value, i, j, onEdit, type }) {
  const [editing, setEd] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const inputRef = useRef(null);

  const handleDoubleClick = () => {
    if (type == "puro") {
      setEd(true);
    } else {
      onEdit({ i, j, value: value == 1 ? 0 : 1 });
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBlur = () => {
    setEd(false);
    onEdit({ i, j, value: inputValue });
  };

  return (
    <div onDoubleClick={handleDoubleClick}>
      {editing ? (
        <input
          ref={inputRef}
          type="number"
          autoFocus
          value={inputValue}
          onBlur={handleBlur}
          onChange={handleChange}
        ></input>
      ) : (
        value
      )}
    </div>
  );
}

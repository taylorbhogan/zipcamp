import { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.css";

// items may be an array or an object
const Dropdown = ({
  placeholder,
  item,
  items,
  setFunction,
  plural = false,
}) => {
  const dropdownRef = useRef();
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  const handleSelection = (sel) => {
    setFunction(sel);
    toggle();
  };

  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <button type="button" className={styles.header} onClick={toggle}>
        {item ? `${item.name}${plural ? " lands" : ""}` : placeholder}
      </button>
      {open && (
        <ul className={styles.options}>
          {Object.values(items).map((singleItem, idx) => (
            <li key={singleItem.id ?? idx}>
              <button onClick={() => handleSelection(singleItem)}>
                {singleItem.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

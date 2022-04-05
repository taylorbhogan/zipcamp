import { useState, useRef, useEffect } from "react";
import styles from "./Dropdown.module.css";

const Dropdown = ({ placeholder, items, setFunction, plural }) => {
  const dropdownRef = useRef();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const toggle = () => setOpen(!open);

  const handleSelection = (item) => {
    setSelected(item);
    setFunction(item);
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
    <div ref={dropdownRef}>
      <div className={styles.header} onClick={toggle}>
        <div>
          {selected ? `${selected.name}${plural && " lands"}` : placeholder}
        </div>
      </div>
      {open && (
        <ul className={styles.options}>
          {items.map((item) => (
            <li key={item.id}>
              <button onClick={() => handleSelection(item)}>{item.name}</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;

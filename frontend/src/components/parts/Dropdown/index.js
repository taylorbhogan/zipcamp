import { useState } from 'react'
import styles from './Dropdown.module.css'

const Dropdown = ({ placeholder, items, setFunction, plural, object }) => {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(null)

  const toggle = () => setOpen(!open)

  const handleSelection = (item) => {
    setSelected(item);
    setFunction(item);
    toggle();
  }


  return (
    <div>
      <div
        className={styles.header}
        onClick={toggle}
      >
        {plural && <div>{selected ? selected.name + ' lands' : placeholder}</div>}
        {!plural && <div>{selected ? selected.name : placeholder}</div>}
        {/* <div><i className="fas fa-caret-down"></i></div> */}
      </div>
      {open &&
        <div className={styles.options}>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <button onClick={() => handleSelection(item)}>{item.name}</button>
              </li>
            ))}
          </ul>
        </div>}
    </div>
  )
}

export default Dropdown;

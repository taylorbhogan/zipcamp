import React, { useEffect, useState } from "react";
import styles from "./AutocompleteDropdown.module.css";

const AutocompleteDropdown = ({ items, setItem }) => {
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchInput, setSearchInput] = useState("")
  const [openItemList, setOpenItemList] = useState(false)


  const handleChange = (e) => {
    const userInput = e.target.value
    setSearchInput(userInput)

    if (userInput === "") {
      setFilteredItems([]);
      setOpenItemList(false)
    } else {
      setOpenItemList(true)
      const filtered = items.filter(
        (item) =>
          item.name.toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );
      setFilteredItems(filtered);
    }
  }

  const handleSelection = (e) => {
    setSearchInput(e.target.innerText)
    setItem(e.target.id)
    setOpenItemList(false)
  }

  return (
    <div className={styles.container}>
      <input onChange={handleChange} type="text" value={searchInput} placeholder={"which public land is this spot on?"} />
      {openItemList && (
        <ul>
          {filteredItems.map((item) => (
            <li onClick={handleSelection} key={item.id} id={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteDropdown;

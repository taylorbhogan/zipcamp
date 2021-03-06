import Dropdown from "../parts/Dropdown";
import styles from "./ControlPanel.module.css";

const ControlPanel = ({
  organizations,
  organization,
  setOrganization,
  selectedLocation,
  usStates,
  setSelectedLocation,
  clearSelection,
}) => {
  return (
    <div className={styles.search}>
      <span>explore</span>
      <Dropdown
        placeholder={"public lands"}
        items={organizations}
        item={organization}
        setFunction={setOrganization}
        plural={true}
      />
      <span>in</span>
      <Dropdown
        placeholder={"the united states"}
        item={selectedLocation}
        items={usStates}
        setFunction={setSelectedLocation}
      />
      <button onClick={clearSelection}>clear</button>
    </div>
  );
};

export default ControlPanel;

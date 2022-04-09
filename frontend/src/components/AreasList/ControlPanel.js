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
      <span>Explore</span>
      <Dropdown
        placeholder={"Public Lands"}
        items={organizations}
        item={organization}
        setFunction={setOrganization}
        plural={true}
      />
      <span>in</span>
      <Dropdown
        placeholder={"The United States"}
        item={selectedLocation}
        items={usStates}
        setFunction={setSelectedLocation}
      />
      <button onClick={clearSelection}>clear</button>
    </div>
  );
};

export default ControlPanel;

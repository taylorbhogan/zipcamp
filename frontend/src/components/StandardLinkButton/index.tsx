import React from "react";
import { Link } from "react-router-dom";
import styles from "./StandardLinkButton.module.css";

interface StandardLinkButtonProps {
  buttonText: string;
  href: string;
}

const StandardLinkButton: React.FC<StandardLinkButtonProps> = ({ buttonText, href }) => {
  return (
    <Link className={styles.standardLinkButton} to={href}>
      {buttonText}
    </Link>
  );
};

export default StandardLinkButton;

import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLeft}>
        <span>
          Created using Express, React, Redux, Google Maps, and AWS S3
        </span>
      </div>
      <div className={styles.footerRight}>
        <a id={styles.tbh} href="https://taylorbhogan.dev/">
          © Taylor B Hogan
        </a>
        <a
          href="https://github.com/taylorbhogan"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className={styles.socialLogo}
            alt="GitHub Logo"
            src="../../../images/socialLogos/GitHub-Mark-Grey-64px.png"
            onMouseOver={(e) =>
              (e.currentTarget.src =
                "../../../images/socialLogos/GitHub-Mark-Green-64px.png")
            }
            onMouseOut={(e) =>
              (e.currentTarget.src =
                "../../../images/socialLogos/GitHub-Mark-Grey-64px.png")
            }
          />
        </a>
        <a
          href="https://www.linkedin.com/in/taylorbhogan"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className={styles.socialLogo}
            alt="LinkedIn Logo"
            src="../../../images/socialLogos/LinkedIn-Mark-Dark-48px.png"
            onMouseOver={(e) =>
              (e.currentTarget.src =
                "../../../images/socialLogos/LinkedIn-Mark-Green-48px.png")
            }
            onMouseOut={(e) =>
              (e.currentTarget.src =
                "../../../images/socialLogos/LinkedIn-Mark-Dark-48px.png")
            }
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;

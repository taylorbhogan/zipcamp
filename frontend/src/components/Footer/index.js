import React from 'react'
import styles from './Footer.module.css'

function Footer (){

  return (
    <div className={styles.footerWrapper}>
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <span>created in 2021 by @taylorbhogan</span>
        </div>
        <div className={styles.footerRight}>
          <img
            className={styles.socialLogo}
            alt='GitHub Logo'
            src='../../../images/socialLogos/GitHub-Mark-Dark-64px.png'
            />
          <img
            className={styles.socialLogo}
            alt='LinkedIn Logo'
            src='../../../images/socialLogos/LinkedIn-Mark-Dark-48px.png'
          />
        </div>
      </footer>
    </div>
  )
}

export default Footer;

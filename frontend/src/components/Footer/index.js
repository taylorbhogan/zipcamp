import React from 'react'
import styles from './Footer.module.css'

function Footer (){

  return (
    // <div className={styles.footerWrapper}>
      <footer className={styles.footer}>
        <div className={styles.footerLeft}>
          <span>created in 2021 by @taylorbhogan</span>
        </div>
        <div className={styles.footerRight}>
          <a href='https://github.com/taylorbhogan'>
            <img
              className={styles.socialLogo}
              alt='GitHub Logo'
              src='../../../images/socialLogos/GitHub-Mark-Grey-64px.png'
              onMouseOver={e => e.currentTarget.src = '../../../images/socialLogos/GitHub-Mark-Green-64px.png'}
              onMouseOut={e => e.currentTarget.src = '../../../images/socialLogos/GitHub-Mark-Grey-64px.png'}
              />
          </a>
          <a href='https://www.linkedin.com/in/taylorbhogan/'>
            <img
              className={styles.socialLogo}
              alt='LinkedIn Logo'
              src='../../../images/socialLogos/LinkedIn-Mark-Dark-48px.png'
              onMouseOver={e => e.currentTarget.src = '../../../images/socialLogos/LinkedIn-Mark-Green-48px.png'}
              onMouseOut={e => e.currentTarget.src = '../../../images/socialLogos/LinkedIn-Mark-Dark-48px.png'}
            />
          </a>
        </div>
      </footer>
    // </div>
  )
}

export default Footer;

import React from 'react'

import styles from './ImageDiv.module.css'

function ImageDiv({src}){
  return (
    <div
      className={styles.imgElement}
    >
      <img
        className={styles.imgElement}
        alt='a nice spot'
        src={src}
      />
    </div>
  )
}

export default ImageDiv;

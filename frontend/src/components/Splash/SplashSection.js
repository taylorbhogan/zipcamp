import styles from "./SplashSection.module.css";

function SplashSection({ title, blurb, imgSrc, flip = false }) {
  const flipStyle = {
    flexDirection: flip ? "row-reverse" : "row",
  };

  return (
    <section className={styles.splashSection} style={flipStyle}>
      <div className={styles.left}>
        <h2>{title}</h2>
        <p>{blurb}</p>
      </div>
      <div className={styles.right}>
        <img src={imgSrc} alt="demonstration of the app" />
      </div>
    </section>
  );
}

export default SplashSection;

import WelcomeMessage from "../WelcomeMessage";
import styles from "./Splash.module.css";
import SplashSection from "./SplashSection";

function Splash() {
  return (
    <div className={styles.splash}>
      <WelcomeMessage />
      <SplashSection
        title={"explore"}
        blurb={
          "browse the nation's public lands as delivered by the rec.gov API"
        }
        imgSrc={"/images/defaults/undraw_explore.svg"}
      />
      <SplashSection
        title={"x marks the spot"}
        blurb={"make your mark while leaving no trace. save any spot you find so you or anyone in the community can find your way back later"}
        imgSrc={"/images/defaults/undraw_mark.svg"}
        flip={true}
        />
        <SplashSection
          title={"add tips"}
          blurb={"make notes about your spot and save ideas for next time"}
          imgSrc={"/images/defaults/undraw_tips.svg"}
          />
      <SplashSection
        title={"capture memories"}
        blurb={"upload photos of your spot to preserve your memories - and find your way back!"}
        imgSrc={"/images/defaults/undraw_photos.svg"}
        flip={true}
        />
    </div>
  );
}

export default Splash;

import { Player } from "@lottiefiles/react-lottie-player";
import loadingMap from "./47956-area-map.json";
import loadingCompass from "./80702-compass.json";

const LoadingContent = ({location}) => {
  switch (location) {
    case "areas":
      return (
        <Player
          src={loadingMap}
          autoplay={true}
          style={{ height: "300px", width: "300px" }}
        ></Player>
      );
    default:
      return (
        <Player
          src={loadingCompass}
          autoplay={true}
          style={{ height: "300px", width: "300px" }}
        ></Player>
      );
  }
};

export default LoadingContent;

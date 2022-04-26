import { Player } from '@lottiefiles/react-lottie-player'
import lottieData from './47956-area-map.json'

const LoadingContent = () => {
  return (
    <Player
      src={lottieData}
      autoplay={true}
      style={{ height: '300px', width: '300px' }}
    >

    </Player>
  )
}

export default LoadingContent;

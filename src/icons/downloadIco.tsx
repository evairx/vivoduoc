import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

interface IColor {
    iconColor: string;
}  

const SvgComponent = ({iconColor}: IColor) => (
  <Svg
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
  >
    <G
      stroke={`${iconColor}`}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="M3 15c0 2.828 0 4.243.879 5.121C4.757 21 6.172 21 9 21h6c2.828 0 4.243 0 5.121-.879C21 19.243 21 17.828 21 15M12 3v13m0 0 4-4.375M12 16l-4-4.375" />
    </G>
  </Svg>
)
export default SvgComponent

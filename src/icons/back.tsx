import * as React from "react"
import Svg, { Path } from "react-native-svg"

const BackIcon = () => (
  <Svg
    width={46}
    height={46}
    fill="none"
    viewBox="0 0 24 24"
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m14.5 17-5-5 5-5"
    />
  </Svg>
)
export default BackIcon

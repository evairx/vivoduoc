import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

const ShareIcon = () => (
  <Svg
    width={20}
    height={20}
    fill="none"
    viewBox="0 0 24 24"
  >
    <G
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5M16 8l-4-4m0 0L8 8m4-4v12" />
    </G>
  </Svg>
)
export default ShareIcon

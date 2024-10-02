import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

interface IColor {
  iconColor: string;
}

const View = ({iconColor}: IColor) => (
  <Svg
    width={22}
    height={22}
    fill="none"
    viewBox="0 0 24 24"
  >
    <G fill={`${iconColor}`} fillRule="evenodd" clipRule="evenodd">
      <Path d="M11.994 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm0-2.006a1.494 1.494 0 1 1 0-2.988 1.494 1.494 0 0 1 0 2.988Z" />
      <Path d="M12 5C7.189 5 3.917 7.609 2.19 9.48a3.679 3.679 0 0 0 0 5.04C3.916 16.391 7.188 19 12 19c4.811 0 8.083-2.609 9.81-4.48a3.679 3.679 0 0 0 0-5.04C20.084 7.609 16.812 5 12 5Zm-8.341 5.837C5.189 9.18 7.967 7 12 7c4.033 0 6.812 2.18 8.341 3.837a1.68 1.68 0 0 1 0 2.326C18.811 14.82 16.033 17 12 17c-4.033 0-6.812-2.18-8.341-3.837a1.68 1.68 0 0 1 0-2.326Z" />
    </G>
  </Svg>
)
export default View
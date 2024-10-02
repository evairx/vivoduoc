import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface IColor {
  iconColor: string;
}

const Password = ({iconColor}: IColor) => (
  <Svg
    width={22}
    height={22}
    fill={`${iconColor}`}
    stroke={`${iconColor}`}
    viewBox="-3.5 0 19 19"
  >
    <Path d="M11.182 8.927v6.912a.794.794 0 0 1-.792.792H1.61a.794.794 0 0 1-.792-.792V8.927a.794.794 0 0 1 .792-.792h.856V6.367a3.534 3.534 0 1 1 7.068 0v1.768h.856a.794.794 0 0 1 .792.792zm-2.756-2.56a2.426 2.426 0 1 0-4.852 0v1.768h4.852zM7.108 11.47a1.108 1.108 0 1 0-1.583 1.001v1.849a.475.475 0 0 0 .95 0v-1.849a1.108 1.108 0 0 0 .633-1.001z" />
  </Svg>
)

export default Password;
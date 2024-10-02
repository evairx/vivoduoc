import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface IColor {
    iconColor: string;
    heightIcon: number;
    widthIcon: number;
}  

const EmailIcon = ({iconColor, heightIcon, widthIcon}:IColor) => (
    <Svg
        width={widthIcon}
        height={heightIcon}
        fill="none"
        viewBox="0 0 24 24"
    >
        <Path
            stroke={iconColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m4 18 5-6m11 6-5-6M3 8l7.225 4.817c.642.427.962.641 1.309.724.306.074.626.074.932 0 .347-.083.668-.297 1.309-.724L21 8M6.2 19h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C21 17.48 21 16.92 21 15.8V8.2c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C19.48 5 18.92 5 17.8 5H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 6.52 3 7.08 3 8.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 19 5.08 19 6.2 19Z"
        />
    </Svg>
)

export default EmailIcon

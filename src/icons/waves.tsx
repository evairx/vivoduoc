import * as React from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"

const { width } = Dimensions.get('window');

const SvgComponent = () => (
  <View style={styles.container}>
    <Svg
      viewBox={`0 0 ${width+300} 590`}
    >
      <Defs>
        <LinearGradient id="a" x1="83%" x2="17%" y1="88%" y2="12%">
          <Stop offset="5%" stopColor="#012c56" />
          <Stop offset="95%" stopColor="#075aad" />
        </LinearGradient>
      </Defs>
      <Path
        fill="url(#a)"
        fillOpacity={0.265}
        d="M0 600V390c51.033-5.831 102.067-11.663 151-37 48.933-25.337 95.767-70.18 147-82 51.233-11.82 106.865 9.385 157-14 50.135-23.385 94.772-91.36 140-131 45.228-39.64 91.048-50.945 137-59s92.037-12.86 141-38c48.963-25.14 100.805-70.615 140-90 39.195-19.385 65.745-12.68 117-39 51.255-26.32 127.216-85.663 183-122 55.784-36.337 91.392-49.669 127-63v885H0Z"
        transform="rotate(-180 720 300)"
      />
      <Path
        fill="url(#a)"
        fillOpacity={0.4}
        d="M0 600v-90c57.26-17.052 114.52-34.104 163-41 48.48-6.896 88.182-3.635 132-27 43.818-23.365 91.751-73.356 140-110 48.249-36.644 96.812-59.942 139-70s78-6.878 130-37 120.188-93.547 175-132 96.249-51.936 146-57c49.751-5.064 107.818-1.71 153-27s77.48-79.226 119-113c41.52-33.774 92.26-47.387 143-61v765H0Z"
        transform="rotate(-180 720 300)"
      />
      <Path
        fill="url(#a)"
        fillOpacity={0.53}
        d="M0 600v30c37.98-11.671 75.958-23.343 123-36s103.145-26.3 163-49c59.855-22.7 123.46-54.456 169-67 45.54-12.544 73.014-5.876 119-31 45.986-25.124 110.483-82.04 156-105 45.517-22.96 72.053-11.961 117-50s108.305-125.113 165-154c56.695-28.887 106.725.415 151-8 44.275-8.415 82.793-54.547 128-90 45.207-35.453 97.104-60.226 149-85v645H0Z"
        transform="rotate(-180 720 300)"
      />
      <Path
        fill="url(#a)"
        d="M0 600v150c59.281-10.02 118.562-20.04 164-34s77.033-31.859 119-51 94.305-39.524 138-68c43.695-28.476 78.745-65.047 134-86 55.255-20.953 130.713-26.29 182-51 51.287-24.71 78.403-68.795 120-101 41.597-32.205 97.676-52.53 153-59 55.324-6.47 109.895.912 152-34 42.105-34.912 71.744-112.118 116-151 44.256-38.882 103.128-39.441 162-40v525H0Z"
        transform="rotate(-180 720 300)"
      />
    </Svg>
  </View>
)
export default SvgComponent

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: -width * 0.8,
    left: 0,
  },
});
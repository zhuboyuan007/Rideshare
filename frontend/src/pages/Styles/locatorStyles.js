import { StyleSheet } from 'react-native';
import { Colors, Metrics, ApplicationStyles } from '../../Themes'

const colorOfmyLocationMapMarker = 'blue';
const SIZE = 35;
const HALO_RADIUS = 6;
const ARROW_SIZE = 7;
const ARROW_DISTANCE = 6;
const HALO_SIZE = SIZE + HALO_RADIUS;
const HEADING_BOX_SIZE = HALO_SIZE + ARROW_SIZE + ARROW_DISTANCE;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        flex: 1,
        flexDirection: 'column',
        //justifyContent: 'center',
        height: Metrics.screenHeight/2,
        width: Metrics.screenWidth,
    },
    map2: {
        ...StyleSheet.absoluteFillObject
    },
    marker: {
        justifyContent: 'center',
        backgroundColor: colorOfmyLocationMapMarker,
        width: SIZE,
        height: SIZE,
        borderRadius: Math.ceil(SIZE / 2),
        margin: (HEADING_BOX_SIZE - SIZE) / 2,
      },
      loginRow: {
        paddingBottom: Metrics.doubleBaseMargin,
        paddingHorizontal: Metrics.doubleBaseMargin,
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: "space-around",
      },
      loginButtonWrapper: {
        flex: 1
      },
      loginButton: {
        width: '40%',
        justifyContent: "center",
        padding: 6,
      },
});

//make this component available to the app
export default styles;

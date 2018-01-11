import { StyleSheet } from 'react-native';
import { Colors, Metrics, ApplicationStyles } from '../../Themes'
import {Dimensions} from 'react-native';

var width= Dimensions.get("window").width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    serachBox: {
        position: 'absolute',
        top: 5,
        width: width,
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
        marginRight: 10,
        padding: 2,
      },
      BigButton: {
        width: '40%',
        justifyContent: "center",
        marginRight: 10,
        padding: 2,
      },
      form: {
        backgroundColor: Colors.snow,
        margin: Metrics.baseMargin,
        borderRadius: 4
      },
});

//make this component available to the app
export default styles;

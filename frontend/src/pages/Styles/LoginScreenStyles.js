import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  container: {
    paddingTop: 70,
    backgroundColor: Colors.royal,
  },
  section: {
    margin: 5,
  },
  form: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: 4
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row',
    flex: 1
  },
  rowLabel: {
    color: Colors.charcoal
  },
  title: {
    color: Colors.silver,
    fontSize: 30,
    fontWeight: 'normal',
    fontFamily: 'Futura',
    textAlign: 'center'
  },
  textInput: {
    height: 40,
    color: Colors.coal
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel
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
  loginButtonFancy: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.charcoal,
    backgroundColor: Colors.panther,
    padding: 6
  },
  loginText: {
    textAlign: 'center',
    color: Colors.silver
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  anotherLogo: {
    height: Metrics.images.logo,
    width: Metrics.images.bigLogo,
    alignSelf: 'center',
    resizeMode: 'contain'
  }
})

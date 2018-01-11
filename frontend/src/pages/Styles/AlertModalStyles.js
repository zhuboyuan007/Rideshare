import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
      },
      innerContainer: {
        borderRadius: 10,
        alignItems: 'center',
      },
      row: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
      },
      rowTitle: {
        flex: 1,
        fontWeight: 'bold',
      },
      button: {
        borderRadius: 5,
        flex: 1,
        height: 44,
        alignSelf: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
      },
      buttonText: {
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
      },
      modalButton: {
        marginTop: 10,
      },
});
import { connect } from "react-redux";
import Locator from "./locator";
import LocationActions from "../../redux/reducers/locationReducer";

const mapStateToProps = (state) => {
    return{
        region: state.location.region,
        coordinate: state.location.coordinate,
    };
};

const mapDispatchToProps = dispatch => {
    return{
        setCurrentLocation: (latitude, longitude) => dispatch(LocationActions.setCurrentLocation(latitude, longitude)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Locator);

import Immutable from 'seamless-immutable';
import { createReducer, createActions } from 'reduxsauce'
import { Dimensions } from 'react-native';
import update from 'immutability-helper';

/*=================== Constants =====================*/

const { width, height }  = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

/*================== Types & Actions ====================*/

const { Types, Creators } = createActions({
	setCurrentLocation: ['latitude', 'longitude'],
  })
  
  // {type: GET_CURRENT_LOCATION, region: {} }
  
  //export const LocationTypes = Types
  export default Creators

/*================== Initial State ====================*/

export const INITIAL_STATE = Immutable({
	region:{
		latitude: 37.774929,
		longitude: -122.419416,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	},
	coordinate:{
		latitude: null,
		longitude: null,
	},
});

/*===================== Reducers =========================*/


export const handleSetCurrentLocation = (state, action) => {
	console.log(action);
	return update(state, {
		region:{
			latitude:{
				$set:action.latitude
			},
			longitude:{
				$set:action.longitude
			},
			latitudeDelta:{
				$set:LATITUDE_DELTA
			},
			longitudeDelta:{
				$set:LONGITUDE_DELTA
			}
		},
		coordinate:{
			latitude:{
				$set:action.latitude
			},
			longitude:{
				$set:action.longitude
			}
		}
	})
}

/*=============== Hookup Reducers To Types ==================*/

export const reducer = createReducer(INITIAL_STATE, {
	[Types.SET_CURRENT_LOCATION]: handleSetCurrentLocation,
  })
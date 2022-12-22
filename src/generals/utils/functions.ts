import { Location } from './../../services/user/UserModel';
import { getDistance, getPreciseDistance } from 'geolib';

export function distanceToString(myLocation:Location,location: Location): string {
    let distance = getDistance({latitude: myLocation.latitude, longitude: myLocation.longitude},{latitude: location.latitude, longitude: location.longitude})
    console.log(distance)
  let value = '';
  if (distance > 1000) {
    value = new Intl.NumberFormat().format(Number((distance / 1000).toFixed(2))) + ' Km'
  }
  else {
    value = new Intl.NumberFormat().format((distance)) + ' m'
  }
  return value
}
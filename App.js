import React, { useState, useEffect } from 'react';
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";

export default function App() {
  
  const [pin, SetPin] = useState({
    latitude: 17.385,
    longitude: 78.4867,
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let address=await Location.reverseGeocodeAsync(location.coords)
      console.log(address)
      // console.log(location.coords);
      
    })();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 17.385,
          longitude: 78.4867,
          latitudeDelta: 0.004,
          longitudeDelta: 0.0005,
        }}
        showsUserLocation={true}
        onUserLocationChange={(e)=>{
          // console.log(e.nativeEvent.coordinate)
          
          SetPin({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
          });
        }}
      >
        <Marker 
        coordinate={pin} 
        >
          <Callout>
            <Text>IMRAN</Text>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
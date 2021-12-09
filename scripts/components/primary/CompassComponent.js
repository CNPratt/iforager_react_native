import React, { useState, useEffect, Component } from "react";
import { Image, View, Text, Dimensions } from "react-native";
import { Magnetometer } from "expo-sensors";
import * as Location from "expo-location";
import { withNavigationFocus } from "react-navigation";
import { styles } from "../../../shared/Styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// !!! This file is a slightly modified version of a Compass component written by @RahulHaque

function getDistance(lat1, lon1, lat2, lon2) {
  function deg2rad(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }

  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  d = d * 0.621371; //km to miles
  return d;
}

//archtangent equation

const { height, width } = Dimensions.get("window");

class Screen extends Component {
  constructor(props) {
    super(props);

    this.Mounted = false;

    this.state = {
      target: [],
      permission: false,
      unsub: null,
      unsub2: null,
    };
  }

  componentDidMount() {
    Location.requestForegroundPermissionsAsync().then((response) => {
      //   console.log(response);
      if (response.granted) {
        this.setState({
          permission: true,
        });
      } else {
        null;
      }
    });
  }

  passUnsubscribe = (unsub) => {
    this.setState({ unsub: unsub });
  };

  passUnsubscribe2 = (unsub2) => {
    this.setState({ unsub2: unsub2 });
  };

  componentDidUpdate(prevProps) {
    // console.log(this.state.unsub2);
    if (prevProps.isFocused && !this.props.isFocused && this.state.unsub) {
      //   console.log("unsubbed: " + this.state.unsub);
      this.state.unsub.remove();
      this.setState({
        unsub: null,
      });
    }
    if (prevProps.isFocused && !this.props.isFocused && this.state.unsub2) {
      console.log("unsubbed: " + this.state.unsub2);
      this.state.unsub2.remove();
      this.setState({
        unsub2: null,
      });
    }
  }

  render() {
    console.log(this.props.isFocused);

    // if (this.props.isFocused) {
    if (this.state.permission && this.props.target) {
      return (
        <CompassWithTarget
          target={this.props.target}
          isFocused={this.props.isFocused}
          unsub={this.passUnsubscribe}
          unsub2={this.passUnsubscribe2}
        />
      );
    } else {
      return <Compass />;
    }
    // } else {
    //   return null;
    // }
  }
}

Compass = () => {
  const [subscription, setSubscription] = useState(null);

  const [magnetometer, setMagnetometer] = useState(0);

  useEffect(() => {
    _toggle();
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((data) => {
        setMagnetometer(_angle(data));
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const _angle = (magnetometer) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y, z } = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(angle);
  };

  const _direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return "NE";
    } else if (degree >= 67.5 && degree < 112.5) {
      return "E";
    } else if (degree >= 112.5 && degree < 157.5) {
      return "SE";
    } else if (degree >= 157.5 && degree < 202.5) {
      return "S";
    } else if (degree >= 202.5 && degree < 247.5) {
      return "SW";
    } else if (degree >= 247.5 && degree < 292.5) {
      return "W";
    } else if (degree >= 292.5 && degree < 337.5) {
      return "NW";
    } else {
      return "N";
    }
  };

  // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
  const _degree = (magnetometer) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <View style={{ alignItems: "center", flex: 1 }}>
        <View style={{ flex: 2 }}></View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "#fff",
              fontSize: height / 26,
              fontWeight: "bold",
            }}
          >
            Target: None
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: height / 26,
              fontWeight: "bold",
            }}
          >
            Facing: {_direction(_degree(magnetometer))}
          </Text>
        </View>
      </View>

      <View style={{ alignItems: "center", flex: 4, backgroundColor: "blue" }}>
        <View
          style={{
            alignItems: "center",
            flex: 1,
            backgroundColor: "brown",
            justifyContent: "center",
          }}
        >
          <View style={{ position: "absolute" }}>
            <Text
              style={{
                color: "#fff",
                fontSize: height / 27,
                width: width,
                // position: "absolute",
                textAlign: "center",
              }}
            >
              {_degree(magnetometer)}°
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: height / 27,
                width: width,
                // position: "absolute",
                textAlign: "center",
              }}
            >
              No Target
            </Text>
          </View>
          <Image
            source={require("../../../assets/compass/compass_pointer.png")}
            style={{
              // height: height / 26,
              resizeMode: "contain",
            }}
          />
          <View style={{ transform: [{ rotate: 360 - magnetometer + "deg" }] }}>
            <Image
              source={require("../../../assets/compass/compass_bg.png")}
              style={{
                height: width - 80,
                justifyContent: "center",
                alignItems: "center",
                resizeMode: "contain",
                // transform: [{ rotate: 360 - magnetometer + "deg" }],
              }}
            />
          </View>
        </View>
      </View>

      <View style={{ alignItems: "center", backgroundColor: "green" }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#fff" }}>Copyright @RahulHaque</Text>
        </View>
      </View>
    </View>
  );
};

CompassWithTarget = (props) => {
  const [subscription, setSubscription] = useState(null);

  const [magnetometer, setMagnetometer] = useState(0);

  const [targetAngle, setTargetAngle] = useState(0);
  const [watchSubscription, setWatchSubscription] = useState(null);
  const [targetDistance, setTargetDistance] = useState(0);

  const arcTan = (fromLat, fromLon, toLat, toLon) => {
    let lat = toLat - fromLat;
    let lon = toLon - fromLon;

    let angle = 0;

    return (Math.atan2(lat, lon) * 180) / Math.PI;
  };

  positionChange = (positionEvent) => {
    console.log("positionEvent");

    setTargetAngle(
      arcTan(
        positionEvent.coords.latitude,
        positionEvent.coords.longitude,
        props.target.obsLat,
        props.target.obsLon
      )
    );

    setTargetDistance(
      getDistance(
        positionEvent.coords.latitude,
        positionEvent.coords.longitude,
        props.target.obsLat,
        props.target.obsLon
      )
    );
  };

  useEffect(() => {
    console.log("useeffect");
    _toggleWatch();
    return () => {
      _watchUnsubscribe();
    };
  }, [props.isFocused]);

  const _toggleWatch = () => {
    // if (watchSubscription) {
    //   _watchUnsubscribe();
    // } else {
    //   _watchSubscribe();
    // }
    if (props.isFocused) {
      _watchSubscribe();
    }
  };

  const _watchSubscribe = () => {
    console.log("watch subscribe");

    Location.watchPositionAsync(
      { accuracy: 6, timeInterval: 100, distanceInterval: 1 },
      this.positionChange
    ).then((value) => {
      setWatchSubscription(value);
      props.unsub(value);
      //   console.log(value);
    });
  };

  const _watchUnsubscribe = () => {
    // console.log("unsubbed: " + watchSubscription);
    watchSubscription && navigator.geolocation.clearWatch(watchSubscription);
    setWatchSubscription(null);
  };

  useEffect(() => {
    _toggle();
    return () => {
      _unsubscribe();
    };
  }, [props.isFocused]);

  const _toggle = () => {
    // if (subscription) {
    //   _unsubscribe();
    // } else {
    //   _subscribe();
    // }

    if (props.isFocused) {
      _subscribe();
    }
  };

  const _subscribe = () => {
    const unsub2 = Magnetometer.addListener((data) => {
      console.log("magnetometer");
      setMagnetometer(_angle(data));
    });

    setSubscription(unsub2);
    props.unsub2(unsub2);
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  const _angle = (magnetometer) => {
    let angle = 0;
    if (magnetometer) {
      let { x, y, z } = magnetometer;
      if (Math.atan2(y, x) >= 0) {
        angle = Math.atan2(y, x) * (180 / Math.PI);
      } else {
        angle = (Math.atan2(y, x) + 2 * Math.PI) * (180 / Math.PI);
      }
    }
    return Math.round(angle);
  };

  const _direction = (degree) => {
    if (degree >= 22.5 && degree < 67.5) {
      return "NE";
    } else if (degree >= 67.5 && degree < 112.5) {
      return "E";
    } else if (degree >= 112.5 && degree < 157.5) {
      return "SE";
    } else if (degree >= 157.5 && degree < 202.5) {
      return "S";
    } else if (degree >= 202.5 && degree < 247.5) {
      return "SW";
    } else if (degree >= 247.5 && degree < 292.5) {
      return "W";
    } else if (degree >= 292.5 && degree < 337.5) {
      return "NW";
    } else {
      return "N";
    }
  };

  // Match the device top with pointer 0° degree. (By default 0° starts from the right of the device.)
  const _degree = (magnetometer) => {
    return magnetometer - 90 >= 0 ? magnetometer - 90 : magnetometer + 271;
  };

  return (
    <View style={{ backgroundColor: "black", flex: 1 }}>
      <View style={{ alignItems: "center", flex: 2 }}>
        <View style={{ flex: 1, margin: 10, backgroundColor: "green" }}>
          <Text
            style={{
              color: "#fff",
              fontSize: height / 26,
              fontWeight: "bold",
              textAlign: "center",
              marginHorizontal: 20,
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {props.target.species}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontSize: height / 26,
              fontWeight: "bold",
              textAlign: "center",
              marginHorizontal: 20,
            }}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {props.target.name}
          </Text>
          <Image
            source={{
              uri: props.target.image,
            }}
            style={{ height: 100 }}
          />
        </View>
      </View>

      <View style={{ alignItems: "center", flex: 4, backgroundColor: "blue" }}>
        <View
          style={{
            alignItems: "center",
            flex: 1,
            backgroundColor: "brown",
            justifyContent: "center",
          }}
        >
          <View style={{ position: "absolute" }}>
            <Text
              style={{
                color: "#fff",
                fontSize: height / 27,
                width: width,
                // position: "absolute",
                textAlign: "center",
              }}
            >
              {_degree(magnetometer)}°
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: height / 27,
                width: width,
                // position: "absolute",
                textAlign: "center",
              }}
            >
              {targetDistance.toFixed(3)}m
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: height / 50,
                width: width,
                // position: "absolute",
                textAlign: "center",
              }}
            >
              Target: {_direction(360 - _degree(targetAngle))}
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: height / 50,
                width: width,
                // position: "absolute",
                textAlign: "center",
              }}
            >
              Facing: {_direction(_degree(magnetometer))}
            </Text>
          </View>
          <Image
            source={require("../../../assets/compass/compass_pointer.png")}
            style={{
              // height: height / 26,
              resizeMode: "contain",
            }}
          />
          <View style={{ transform: [{ rotate: 360 - magnetometer + "deg" }] }}>
            <Image
              source={require("../../../assets/compass/compass_bg.png")}
              style={{
                height: width - 80,
                justifyContent: "center",
                alignItems: "center",
                resizeMode: "contain",
                // transform: [{ rotate: 360 - magnetometer + "deg" }],
              }}
            />
            <Image
              source={require("../../../assets/compass/compass_bg_target.png")}
              style={{
                position: "absolute",
                height: width - 80,
                justifyContent: "center",
                alignItems: "center",
                resizeMode: "contain",
                transform: [{ rotate: 360 - _degree(targetAngle) + "deg" }],
              }}
            />
          </View>
          {/* invisible point image to center compass */}
          <Image
            source={require("../../../assets/compass/compass_pointer.png")}
            style={{
              // height: height / 26,
              resizeMode: "contain",
              opacity: 0,
            }}
          />
        </View>
      </View>

      <View style={{ alignItems: "center", backgroundColor: "green" }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "#fff" }}>Copyright @RahulHaque</Text>
        </View>
      </View>
    </View>
  );
};

export default CompassComponent = withNavigationFocus(Screen);
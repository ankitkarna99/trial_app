import React from 'react';
import {View, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const IndexScreen = ({navigation}) => {
  React.useEffect(() => {
    setTimeout(async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token && token.length > 0) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Login');
        }
      } catch (err) {
        navigation.navigate('Login');
      }
    }, 1000);
    // eslint-disable-next-line
  }, []);

  return (
    <View style={styles.root}>
      <Image
        resizeMode="contain"
        source={require('../Images/logo.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = {
  root: {justifyContent: 'center', alignItems: 'center', height: '100%'},
  image: {height: 80},
};

export default IndexScreen;

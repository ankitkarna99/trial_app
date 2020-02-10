import React from 'react';
import {View, Text, Image} from 'react-native';
import {LoginButton, AccessToken} from 'react-native-fbsdk';
import myAxios from '../Apis';
import AsyncStorage from '@react-native-community/async-storage';

const LoginScreen = ({navigation}) => {
  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Image
          resizeMode="contain"
          source={require('../Images/logo.png')}
          style={styles.image}
        />
        <Text style={styles.headingText}>Login Screen</Text>
      </View>
      <View style={styles.body}>
        <LoginButton
          permissions={['email']}
          onLoginFinished={async (error, result) => {
            try {
              if (error) {
                console.log(error);
                console.log('Login failed: ' + error.message);
              } else if (result.isCancelled) {
                console.log('Login-cancelled!');
              } else {
                const {accessToken} = await AccessToken.getCurrentAccessToken();
                const {data} = await myAxios.post('/user/login/facebook', {
                  accessToken,
                });

                await AsyncStorage.setItem('token', data.token);

                navigation.navigate('Home');
              }
            } catch (err) {
              console.log(err);
            }
          }}
          onLogoutFinished={() => console.log('Logged out!')}
        />
      </View>
    </View>
  );
};

const styles = {
  root: {
    height: '100%',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#333333',
  },
  image: {
    height: 80,
  },
  body: {
    flex: 3,
    justifyContent: 'center',
    padding: 16,
    alignItems: 'center',
  },
};

export default LoginScreen;

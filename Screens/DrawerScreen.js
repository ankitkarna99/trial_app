import React from 'react';
import {Drawer, Divider, Avatar} from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import {LoginManager} from 'react-native-fbsdk';
import {Text, View} from 'react-native';
import UserContext from '../Contexts/UserContext';

const DrawerHeader = () => {
  const {userState} = React.useContext(UserContext);
  return (
    <View style={styles.header}>
      <Avatar.Image
        source={{
          uri: userState.picture,
        }}
      />
      <View>
        <Text style={styles.name}>{userState.name}</Text>
        <Text>{userState.email}</Text>
      </View>
    </View>
  );
};

const DrawerScreen = ({navigation}) => {
  return (
    <Drawer.Section>
      <DrawerHeader />
      <Divider />
      <View style={styles.body}>
        <Drawer.Item
          icon="home"
          label="Home"
          active={true}
          onPress={() => {}}
        />
        <Drawer.Item
          active={false}
          icon="fire"
          label="Logout"
          onPress={async () => {
            try {
              await AsyncStorage.setItem('token', '');
            } catch (e) {}
            LoginManager.logOut();
            navigation.closeDrawer();
            navigation.navigate('Login');
          }}
        />
      </View>
    </Drawer.Section>
  );
};

const styles = {
  header: {
    padding: 16,
  },
  name: {
    fontSize: 16,
    marginTop: 16,
  },
  body: {
    paddingTop: 4,
  },
};

export default DrawerScreen;

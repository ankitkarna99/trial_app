import React from 'react';
import {Appbar, Menu, Divider, Switch} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import Product from '../Components/Product';
import {View, Text} from 'react-native';
import ProductContext from '../Contexts/ProuctContext';
import myAxios from '../Apis';

const Products = () => {
  const productContext = React.useContext(ProductContext);

  return (
    <View>
      {productContext.products.map(product => (
        <Product
          key={product.id}
          product={product}
          addToWishList={productContext.addToWishList}
          removeFromWishList={productContext.removeFromWishList}
        />
      ))}
    </View>
  );
};

const WishList = () => {
  const productContext = React.useContext(ProductContext);
  const products = productContext.getWishedProducts();

  return (
    <View>
      {products.length === 0 && (
        <Text style={styles.nothingText}>
          Nothing is there in your wishlist!
        </Text>
      )}
      {products.map(product => (
        <Product
          key={product.id}
          product={product}
          addToWishList={productContext.addToWishList}
          removeFromWishList={productContext.removeFromWishList}
        />
      ))}
    </View>
  );
};

const MainScreen = ({navigation}) => {
  const [visible, setVisible] = React.useState(false);
  const [showWishes, setShowWishes] = React.useState(false);

  return (
    <SafeAreaView>
      <Appbar>
        <Appbar.Action
          icon="menu"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <Appbar.Content title="Trial App" />

        <Menu
          visible={visible}
          onDismiss={() => {
            setVisible(false);
          }}
          anchor={
            <Appbar.Action
              icon="dots-vertical"
              color="#FFF"
              onPress={() => {
                setVisible(!visible);
              }}
            />
          }>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
      </Appbar>
      <View>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Show Wishes</Text>
          <Switch
            value={showWishes}
            color="#673AB7"
            onValueChange={() => {
              setShowWishes(!showWishes);
            }}
          />
        </View>
        {!showWishes && <Products />}
        {showWishes && <WishList />}
      </View>
    </SafeAreaView>
  );
};

const styles = {
  switchContainer: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingTop: 16,
    paddingRight: 16,
  },
  switchText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  nothingText: {
    paddingLeft: 16,
    paddingTop: 16,
  },
};

export default MainScreen;

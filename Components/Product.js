import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
import {Button, Card} from 'react-native-paper';

const Product = ({product, addToWishList, removeFromWishList}) => {
  return (
    <Card style={styles.card}>
      <View style={styles.root}>
        <View style={styles.left}>
          <Image
            style={styles.image}
            source={{
              uri: product.image_url,
            }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.right}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>{product.description}</Text>
          {!product.isWished && (
            <Button
              mode="contained"
              icon="heart"
              onPress={() => {
                addToWishList(product.id);
              }}>
              Add to Wishlist
            </Button>
          )}
          {product.isWished && (
            <Button
              mode="contained"
              icon="delete"
              onPress={() => {
                removeFromWishList(product.id);
              }}>
              Remove from Wishlist
            </Button>
          )}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
  },
  card: {
    margin: 12,
    padding: 8,
  },
  root: {
    flexDirection: 'row',
  },
  left: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
  },
  right: {
    flex: 3,
    paddingLeft: 16,
  },
});

export default Product;

import React from 'react';
import myAxios from '../Apis';

const ProductContext = React.createContext({});

export const ProductProvider = ({children}) => {
  const [products, setProducts] = React.useState([]);

  const getProducts = async () => {
    try {
      const {data} = await myAxios.get('/product');
      setProducts(data);
    } catch (err) {
      setTimeout(getProducts, 5000);
    }
  };

  const getWishedProducts = () => {
    return products.filter(product => product.isWished);
  };

  const addToWishList = id => {
    myAxios.get('/wishlist/add/' + id);
    setProducts(
      products.map(product => {
        if (product.id === id) {
          product.isWished = true;
        }
        return product;
      }),
    );
  };

  const removeFromWishList = id => {
    myAxios.get('/wishlist/remove/' + id);

    setProducts(
      products.map(product => {
        if (product.id === id) {
          product.isWished = false;
        }

        return product;
      }),
    );
  };

  React.useEffect(() => {
    getProducts();
    //eslint-disable-next-line
  }, []);

  return (
    <ProductContext.Provider
      value={{products, getWishedProducts, addToWishList, removeFromWishList}}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;

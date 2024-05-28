import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import ProductListComponent from '../components/ProductList/ProductListComponent';
import AR_ViewComponent from '../components/AR_View/AR_ViewComponent';

export default function Index() {
  return (
    <SafeAreaView style={{
      flex: 1
    }}>
      <View style={styles.container}>
        <View style={styles.webViewContainer}>
          <AR_ViewComponent />
        </View>
        <View style={styles.productListContainer}>
          <ProductListComponent />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  webViewContainer: {
    flex: 1,
  },
  productListContainer: {
    height: 150, // Adjust the height as needed for the product list
  },
});

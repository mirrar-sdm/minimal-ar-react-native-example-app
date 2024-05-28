import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import ProductCardComponent from './ProductCardComponent';
import { BodyPartTypes, RenderTypes, type ProductInput } from '@mirrar-sdm/minimal-ar-react-native-sdk';
import { AR_Service } from '../../services/AR_Service';

const ProductDataList: ProductInput[] = [
  {
    id: 'Earring',
    bodyPartType: BodyPartTypes.ear,
    renderType: RenderTypes._2D,
    asset: {
      url_2D:
        'https://d1s0l7jckv1cut.cloudfront.net/Araya/Earrings/ARYE001B/1689244489/thumbnail/ARYE001B.png',
    },
    visualizationData: {
      height: 15,
      xOffset: 0,
      yOffset: -4,
    },
  },
  {
    id: 'Necklace',
    bodyPartType: BodyPartTypes.neck,
    renderType: RenderTypes._2D,
    asset: {
      url_2D:
        'https://s3.ap-south-1.amazonaws.com/mirrar/atuljeweller/inventory/Necklaces/DS2191A-N.png',
    },
    visualizationData: {
      height: 84,
      xOffset: 0,
      yOffset: 0,
      scalingFactor: 1.17,
      // faceHeight: 185.5
    },
    applyBlurr: true,
  },
  {
    id: 'Ring',
    bodyPartType: BodyPartTypes.finger,
    renderType: RenderTypes._2D,
    asset: {
      url_2D:
        'https://s3.ap-south-1.amazonaws.com/mirrar/Meghnademo/inventory/Rings/SLR17997.png',
    },
  },
  {
    id: 'Bracelet',
    bodyPartType: BodyPartTypes.wrist,
    renderType: RenderTypes._2D,
    asset: {
      url_2D:
        'https://s3.ap-south-1.amazonaws.com/mirrar/Meghnademo/inventory/Bracelets/SDC14579.png',
    },
  },
];

const ProductListComponent = () => {

  const handleProductPress = (product: ProductInput) => {
    console.log(product);
    
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={ProductDataList}
        renderItem={({item}) => (
          <ProductCardComponent
            product={item}
            handlePress={handleProductPress}
          />
        )}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  listContent: {
    paddingHorizontal: 10,
  },
});

export default ProductListComponent;

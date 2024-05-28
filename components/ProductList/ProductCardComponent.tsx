import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { AR_Service } from '../../services/AR_Service';
import type { ProductInput } from '@mirrar-sdm/minimal-ar-react-native-sdk';

interface ProductCardProps {
  product: ProductInput;
  handlePress: (product: ProductInput) => void;
}

const ProductCardComponent: React.FC<ProductCardProps> = ({
  product,
  handlePress,
}) => {
  const [selected, setSelected] = useState(false)

  const getImageURL = () => {
    if(product.asset?.url_2D) {
      let source =  product.asset!.url_2D

      if (typeof source === 'string') {
        return source;
      } else if (Array.isArray(source)) {
        // Handle array if needed, e.g., use the first element
        return source[0];
      }
    }

    return ""
  }

  useEffect(() => {
    if(selected) {
      AR_Service.addProduct(product)
    } else {
      AR_Service.removeProduct(product)
    }
  }, [selected])

  return (
    <View style={[styles.card, selected && styles.selectedCard]}>
      <TouchableOpacity
        onPress={() => {
          setSelected(!selected)
          handlePress(product);
        }}>
          {
            <Image source={{uri: getImageURL()}} style={styles.image} />
          }
        <View style={styles.info}>
          <Text style={styles.title}>{product.id}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    margin: 10,
    overflow: 'hidden',
    width: 100,
    objectFit: 'contain',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 60,
    objectFit: 'contain',
  },
  info: {
    padding: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center'
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  selectedCard: {
    borderColor: '#000',
    borderWidth: 2
  }
});

export default ProductCardComponent;

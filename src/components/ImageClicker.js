import { useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';

const ImageClicker = ({ images, style }) => {
  const [isFull, setIsFull] = useState(false);
  const imageUrls = images.map((image) => ({ props: { source: image } }));

  const onPress = () => setIsFull(!isFull);

  return (
    <View style={style}>
      <FlatList
        horizontal
        keyExtractor={(_item, index) => index.toString()}
        data={images}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={onPress}>
            <Image source={item} style={styles.image} />
          </TouchableOpacity>
        )}
      />

      <Modal visible={isFull} transparent={true}>
        <ImageViewer imageUrls={imageUrls} onClick={onPress} />
      </Modal>
    </View>
  );
};

export default ImageClicker;

const styles = StyleSheet.create({
  image: {
    height: '100%',
    marginRight: 10,
    resizeMode: 'cover', // contain, cover
    width: 300,
  },
});

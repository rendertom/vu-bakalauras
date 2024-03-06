import { useState } from 'react';
import { Image, Modal, TouchableOpacity, View } from 'react-native';

import ImageViewer from 'react-native-image-zoom-viewer';

const ImageClicker = ({ image, style }) => {
  const [isFull, setIsFull] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setIsFull(!isFull)}>
        <Image source={image} style={style} />
      </TouchableOpacity>

      <Modal visible={isFull} transparent={true}>
        <ImageViewer
          imageUrls={[{ props: { source: image } }]}
          onClick={() => setIsFull(!isFull)}
        />
      </Modal>
    </View>
  );
};

export default ImageClicker;

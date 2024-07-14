import { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { useTensorflowModel } from 'react-native-fast-tflite'
import * as ImagePicker from 'expo-image-picker';
import { convertToRGB } from 'react-native-image-to-rgb';
import ImageResizer from 'react-native-image-resizer';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabTwoScreen() {
  const model = useTensorflowModel(require('../../assets/model/current_model.tflite'))
  const actualModel = model.state === 'loaded' ? model.model : undefined

  const [image, setImage] = useState<string | null>(null)
  const [resizedImage, setResizedImage] = useState<string | null>(null)

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status !== 'granted') {
      console.log('Permission denied')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    })

    if (result.assets) {
      const image = result.assets[0]
      setImage(image.uri)
      const resizedImage = await resizeImage(image.uri, 224, 224)
      setResizedImage(resizedImage)
    }
  }


  const resizeImage = async (uri: string, width: number, height: number) => {
    try {
      const response = await ImageResizer.createResizedImage(uri, width, height, 'JPEG', 100, 0, undefined, true, { mode: "stretch" });
      return response.uri;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const makePrediction = async () => {
    console.log('Making prediction')
    if (!actualModel) {
      console.log('Model not ready')
      return
    }

    if (!resizedImage) {
      console.log('No image selected')
      return
    }
    try {
      const convertedArray = await convertToRGB(resizedImage);
      const floatArray = new Float32Array(224 * 224 * 3);
      for (let i = 0; i < convertedArray.length; i++) {
        floatArray[i] = convertedArray[i] / 255.0;
      }
      const result = await actualModel.run([floatArray]);

      const outputTensor = result[0];
      const numDetections = 151;
      let maxIndex = 0;

      for (let i = 0; i < numDetections; i++) {
        if (outputTensor[i] > outputTensor[maxIndex]) {
          maxIndex = i;
        }
      }
      console.log('Prediction:', maxIndex);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaView>
      <Text>SAS</Text>
      <View>
        <Text>{actualModel ? 'Modelo listo para usar' : 'Cargando modelo ...'}</Text>
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }}></Image>}
        <Button title='Seleccionar Imagen' onPress={pickImage} />
        <Button title='Hacer Predicción' onPress={makePrediction} />
      </View>
    </SafeAreaView>
  );
}

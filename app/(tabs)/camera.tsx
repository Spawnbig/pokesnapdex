import { useRef, useState } from 'react';
import { Image, View, Text, useWindowDimensions } from 'react-native';
import { useTensorflowModel } from 'react-native-fast-tflite'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, IconButton, ActivityIndicator } from 'react-native-paper';
import { Camera, useCameraDevice } from 'react-native-vision-camera'
import { ImageSelectorService, ModelService } from '@/services';

export default function CameraScreen() {
  const { colors } = useTheme();
  const model = useTensorflowModel(require('../../assets/model/current_model.tflite'))
  const actualModel = model.state === 'loaded' ? model.model : undefined
  const device = useCameraDevice('back')
  const camera = useRef<Camera>(null)
  const [image, setImage] = useState<string | null>(null)
  const [prediction, setPrediction] = useState<string | null>(null)
  const [confidence, setConfidence] = useState<number | null>(null)
  const { height } = useWindowDimensions()
  const heigthScreen = height / 3;
  const heigthCamera = heigthScreen - 20;

  const handleTakePicture = async () => {
    if (!actualModel) return;
    try {
      const photoUri = await ImageSelectorService.takePicture(camera)
      setImage(photoUri)
      const pred = await ModelService.makePrediction(actualModel, photoUri)
      setConfidence(pred.confidence)
      setPrediction(`${pred.pokemon?.name} - ${pred.confidence.toFixed(2)}%`)
    } catch (err) {
      console.log(err)
    }
  }

  const handlePickImage = async () => {
    try {
      const imageUri = await ImageSelectorService.pickImage()
      setImage(imageUri)
      if (!actualModel) return;
      const pred = await ModelService.makePrediction(actualModel, imageUri)
      setConfidence(pred.confidence)
      setPrediction(`${pred.pokemon?.name} - ${pred.confidence.toFixed(2)}%`)
    } catch (err) {
      console.log(err)
    }
  }

  const resetData = () => {
    setImage(null)
    setPrediction(null)
    setConfidence(null)
  }


  if (model.state === 'loading') {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <ActivityIndicator size={'large'} />
      </SafeAreaView>
    )
  }


  return (
    <SafeAreaView style={{ backgroundColor: colors.background, height: 'auto', flex: 1 }}>
      <Image source={require('../../assets/images/top-camera.png')} style={{ width: '100%' }} />
      <View style={{ height: heigthScreen, backgroundColor: 'silver', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
        <View style={{ height: heigthCamera, backgroundColor: 'black', width: '90%' }}>
          {image == null &&
            <Camera
              ref={camera}
              photo={true}
              style={{ width: '100%', height: '100%' }}
              device={device!}
              isActive={true}
            />}
          {image && <Image source={{ uri: image }} style={{ width: '100%', height: '100%' }} resizeMode='contain' />}
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
        {!image && <IconButton
          mode='contained'
          icon="camera"
          containerColor='black'
          iconColor='white'
          size={60}
          onPress={handleTakePicture}
        />}
      </View>
      {prediction && <Text style={{ color: 'white', textAlign: 'center' }}>{prediction}</Text>}
      {confidence &&
        <Text style={{ color: 'white', textAlign: 'center' }}>{confidence < 60 ?
          'We cannot identify the pokemon, please try again' :
          'Congrats! Search it in the pokedex'}
        </Text>}
      <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        {!image && <IconButton
          icon='image-area'
          mode='contained'
          containerColor='black'
          iconColor='white'
          onPress={handlePickImage}
          size={30}
        />}

        {image &&
          <IconButton
            icon='restart'
            mode='contained'
            containerColor='black'
            iconColor='white'
            onPress={resetData}
            size={30}
          />
        }

      </View>
    </SafeAreaView>
  );
}

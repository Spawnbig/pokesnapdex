import * as ImagePicker from "expo-image-picker";
import { RefObject } from "react";
import { Camera } from "react-native-vision-camera";

export const pickImage = async (): Promise<string> => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();

  if (status !== "granted") {
    throw new Error("Camera permissions not granted");
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [1, 1],
    quality: 1,
  });

  if (result.canceled) throw new Error("User cancelled image selection");

  const image = result.assets[0];
  return image.uri;
};

export const takePicture = async (
  camera: RefObject<Camera> | null
): Promise<string> => {
  if (!camera) throw new Error("Camera ref is null");
  if (!camera.current) throw new Error("Camera ref is null");

  const photo = await camera.current.takePhoto({
    enableShutterSound: true,
  });

  if (!photo) throw new Error("Failed to take photo");
  const photoUri = "file://" + photo.path;
  return photoUri;
};

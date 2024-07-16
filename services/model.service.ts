import { Prediction } from "@/interfaces/model";
import { getPokemonById, setViewedPokemon } from "@/repositories/pokemon_repo";
import { TensorflowModel } from "react-native-fast-tflite";
import ImageResizer from "react-native-image-resizer";
import { convertToRGB } from "react-native-image-to-rgb";

export const makePrediction = async (
  model: TensorflowModel,
  uri: string
): Promise<Prediction> => {
  const resizedImage = await resizeImage(uri, 224, 224);

  if (!resizedImage) throw new Error("Failed to resize image");

  try {
    const convertedArray = await convertToRGB(resizedImage);
    const floatArray = new Float32Array(224 * 224 * 3);
    for (let i = 0; i < convertedArray.length; i++) {
      floatArray[i] = convertedArray[i] / 255.0;
    }
    const Labels = require("../assets/model/labels.json");

    const result = await model.run([floatArray]);

    const outputTensor = result[0];
    const numDetections = 151;
    let maxIndex = 0;
    let maxValue = outputTensor[0];

    for (let i = 1; i < numDetections; i++) {
      if (outputTensor[i] > maxValue) {
        maxValue = outputTensor[i];
        maxIndex = i;
      }
    }
    const confidence = (maxValue as number) * 100;
    console.log(
      `Prediction: ${Labels[maxIndex]} with ${confidence.toFixed(
        2
      )}% confidence`
    );
    const pokemon = await getPokemonById(Labels[maxIndex]);
    if (confidence >= 60) await setViewedPokemon(pokemon.pokedex_number);
    return { pokemon, confidence };
  } catch (err) {
    console.log(err);
  }
  return { pokemon: null, confidence: 0 };
};

const resizeImage = async (uri: string, width: number, height: number) => {
  try {
    const response = await ImageResizer.createResizedImage(
      uri,
      width,
      height,
      "JPEG",
      100,
      0,
      undefined,
      true,
      { mode: "stretch" }
    );
    return response.uri;
  } catch (err) {
    console.error(err);
    return null;
  }
};

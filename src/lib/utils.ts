import { img } from 'src/utils/images';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
//
type featImageKey = keyof typeof img.features;

export const getFeatureImages = (image: featImageKey) => img.features[image]();

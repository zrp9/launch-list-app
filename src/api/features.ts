import axiosInstance, { endpoints } from 'src/lib/axios';

type FeatureData = {
  feats: Feature[];
};

export async function getFeatures(pg: number, limit: number) {
  const url = `${endpoints.feature.list}?page=${pg}&limit=${limit}`;
  const { data } = await axiosInstance.get<FeatureData>(url);
  return data.feats;
}

import { RecommendationRequest } from '@/app/models/RecommendationRequest';
import { HttpMethods } from '@/app/types/enums/HttpMethods';
import ApiService from '@/app/services/api.service';

const getRecommendations = async (request: RecommendationRequest) => {
  const response = await ApiService.makeApiRequest({
    url: `/api/recommendations`,
    method: HttpMethods.POST,
    body: request
  });

  const rawRecommendations = response.data;
  return rawRecommendations
    .filter(entry => entry.trim() !== "")
    .map(entry => {
      const parts = entry.replace(/^\d+\.\s+/, "").split(" - ");
      return {
        title: parts[0].replace(/"/g, ""),
        artist: parts[1] || "Unknown Artist"
      };
    });
}

export const RecommendsService = {
  getRecommendations
}
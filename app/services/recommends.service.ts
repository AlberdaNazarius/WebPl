import axios from 'axios';
import { RecommendationRequest } from '@/app/models/RecommendationRequest';

const getRecommendations = async (request: RecommendationRequest) => {
   const response = await axios.post(
    `${process.env.NEXT_PUBLIC_HOST_API}/recommendations`,
    request
  );

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
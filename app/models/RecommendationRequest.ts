export interface RecommendationRequest {
  genre: string;
  prompt: string;
  limit?: number;
  userId?: string;
}
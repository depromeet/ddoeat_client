export interface FeedStore {
  address: string;
  kakaoCategoryName: string;
  kakaoStoreId: number;
  location: {
    latitude: number;
    longitude: number;
  };
  storeId: number | null;
  storeName: string;
  thumbnailUrl: string;
  totalFeedCnt: number;
  totalRating: number;
}
export interface Feed {
  userId: number;
  profileImageUrl: string;
  nickname: string;
  feedId: number;
  description: string;
  feedImageUrl: string;
  createdAt: string;
  isFollowed: boolean;
  isMine: boolean;
  feedStoreResponse?: FeedStore;
  rating: number;
}

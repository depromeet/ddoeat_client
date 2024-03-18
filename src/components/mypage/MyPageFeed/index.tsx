import MyPageFeedContainer from './MyPageFeedContainer';
import MyPageFeedImage from './MyPageFeedImage';
import MyPageFeedStoreInfo from './MyPageFeedStoreInfo';

export const MyPageFeed = Object.assign(MyPageFeedContainer, {
  Image: MyPageFeedImage,
  StoreInfo: MyPageFeedStoreInfo,
});

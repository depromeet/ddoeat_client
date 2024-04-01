import FeedContainer from './FeedContainer';
import FeedDate from './FeedDate';
import FeedDescription from './FeedDescription';
import FeedDetailDescription from './FeedDetailDescription';
import FeedImage from './FeedImage';
import FeedProfile from './FeedProfile';

export const Feed = Object.assign(FeedContainer, {
  Date: FeedDate,
  Profile: FeedProfile,
  Image: FeedImage,
  Description: FeedDescription,
  DetailDescription: FeedDetailDescription,
});

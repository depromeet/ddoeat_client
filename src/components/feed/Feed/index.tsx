import FeedContainer from './FeedContainer';
import FeedDate from './FeedDate';
import FeedImage from './FeedImage';
import FeedProfile from './FeedProfile';

export const Feed = Object.assign(FeedContainer, {
  Date: FeedDate,
  Profile: FeedProfile,
  Image: FeedImage,
});

import MyPageFeed from '@components/mypage/MyPageFeed';
import BackgroundImage from 'public/assets/image/mypage/background.png';
import StoreImage from 'public/assets/image/search/store.png';
import FoodImage from 'public/assets/image/hamburger.jpeg';
import { Feed } from '@components/feed/Feed';

export default function page() {
  return (
    <div>
      <div className="flex mb-[24px]">
        <MyPageFeed alt="피드 이미지" src={BackgroundImage} />
        <MyPageFeed alt="피드 이미지" src={StoreImage} />
        <MyPageFeed alt="피드 이미지" src={BackgroundImage} />
      </div>

      <Feed>
        <Feed.Date>2023.04.01</Feed.Date>
        <Feed.Profile
          id="1"
          src={BackgroundImage}
          nickName="필환이"
          alt="프로필 이미지"
          isMyFeed={false}
        />
        <Feed.Image
          src={FoodImage}
          alt="피드 음식 사진"
          storeName="쉑쉑버거"
          storeCategory="양식"
          storeLocation="서울 강남"
        />
      </Feed>
    </div>
  );
}

// import Image from 'next/image';

// import PostItem from '@components/PostItem';
import MyLog from '@components/Log';

export default function Home() {
  return (
    <main>
      <MyLog
        date={'2022.02.03'}
        restaurantImgUrl={''}
        restaurantName={'또익또익'}
        visitNum={4}
        menuType={'양식'}
        rating={3.1}
        log={
          'DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription'
        }
      />
    </main>
  );
}

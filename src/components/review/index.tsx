'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

import StarRating from './StarRating';

import UploadView from '@components/common/UploadView';

interface ReviewContextType {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
}

export const ReviewContext = createContext<ReviewContextType>({
  rating: 0,
  setRating: () => {},
});

export default function Review() {
  const [rating, setRating] = useState(0);

  return (
    <ReviewContext.Provider value={{ rating, setRating }}>
      <StarRating />
      <UploadView />
    </ReviewContext.Provider>
  );
}

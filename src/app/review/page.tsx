'use client';

import { useState, useCallback } from 'react';

import ImageUploader from '@components/common/ImageUploader';
import StarRating from '@components/review/StarRating';

export default function Page() {
  const [rating, setRating] = useState(0);

  const handleRating = useCallback((index: number) => {
    setRating(index + 1);
  }, []);
  return (
    <div>
      <StarRating rating={rating} onClick={handleRating} />
      <ImageUploader />
    </div>
  );
}

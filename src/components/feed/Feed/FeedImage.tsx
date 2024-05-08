import Image, { ImageProps } from 'next/image';
import { useRouter } from 'next/navigation';

import RightArrowLogo from 'public/assets/icon24/right_arrow_24.svg';
import cn from '@utils/cn';
import { FeedStore } from 'src/types/feed';
import { convertObjectToQueryString } from '@utils/parser';

interface FeedImageProps extends ImageProps {
  storeName?: string;
  storeCategory?: string;
  storeLocation?: string;
  storeResponse?: FeedStore;
}

export default function FeedImage({
  src,
  alt,
  className,
  storeName,
  storeCategory,
  storeLocation,
  storeResponse,
  ...props
}: FeedImageProps) {
  const { push } = useRouter();

  const handleClickStoreInfoButton = () => {
    if (storeResponse) {
      const queryString = convertObjectToQueryString(storeResponse);
      push(`/?type=search&${queryString}&bottomSheetStatus=show`);
    }
  };

  return (
    <div
      className={cn(
        'relative w-full aspect-[3/2] rounded-[16px] overflow-hidden',
        className,
      )}
    >
      {storeResponse && (
        <div className="flex justify-between items-center absolute p-4 z-above top-0 left-0 right-0 bg-top-fade">
          <div className="flex flex-col gap-[4px]">
            <p className="text-gray-100 body-16-bold">{storeName}</p>
            <div className="flex items-center text-gray-300 caption-12-regular">
              <p className="after:inline-block after:w-[1px] after:h-[10px] after:align-middle after:bg-gray-300 after:mx-[4px]">
                {storeCategory}
              </p>
              <p>{storeLocation}</p>
            </div>
          </div>
          <button onClick={handleClickStoreInfoButton}>
            <RightArrowLogo />
          </button>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        fill
        objectFit="cover"
        objectPosition="center"
        {...props}
      />
    </div>
  );
}

interface MyPageFeedStoreInfoProps {
  storeName: string;
  storeCategory: string;
  storeLocation: string;
}

export default function MyPageFeedStoreInfo({
  storeName,
  storeCategory,
  storeLocation,
}: MyPageFeedStoreInfoProps) {
  return (
    <div className="flex flex-col">
      <p className="text-gray-700 body-14-bold">{storeName}</p>
      <div className="flex items-center text-gray-900 caption-12-regular">
        <p className="after:inline-block after:w-[2px] after:h-[10px] after:align-middle after:bg-gray-300 after:mx-[4px]">
          {storeCategory}
        </p>
        <p>{storeLocation}</p>
      </div>
    </div>
  );
}

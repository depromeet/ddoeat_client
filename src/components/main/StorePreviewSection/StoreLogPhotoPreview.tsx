import Image from 'next/image';

function StoreLogPhotoPreview({
  reviewImageUrls,
}: {
  reviewImageUrls: string[];
}) {
  return (
    <div className="flex w-full overflow-x-scroll p-[16px]">
      <div className="min-w-max flex gap-[8px]">
        {reviewImageUrls.map((url) => (
          <Image key={url} width={100} height={100} alt="" src={url} />
        ))}
      </div>
    </div>
  );
}

export default StoreLogPhotoPreview;

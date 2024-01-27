import Image from 'next/image';

function StoreLogPhotoPreview() {
  return (
    <div className="flex w-full overflow-x-scroll p-[16px]">
      <div className="min-w-max flex gap-[8px]">
        <Image
          width={100}
          height={100}
          alt="asdf"
          src="/assets/image/search/store.png"
        />{' '}
        <Image
          width={100}
          height={100}
          alt="asdf"
          src="/assets/image/search/store.png"
        />{' '}
        <Image
          width={100}
          height={100}
          alt="asdf"
          src="/assets/image/search/store.png"
        />{' '}
        <Image
          width={100}
          height={100}
          alt="asdf"
          src="/assets/image/search/store.png"
        />{' '}
        <Image
          width={100}
          height={100}
          alt="asdf"
          src="/assets/image/search/store.png"
        />{' '}
        <Image
          width={100}
          height={100}
          alt="asdf"
          src="/assets/image/search/store.png"
        />
      </div>
    </div>
  );
}

export default StoreLogPhotoPreview;

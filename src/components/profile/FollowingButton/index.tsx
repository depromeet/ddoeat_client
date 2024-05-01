import cn from '@utils/cn';

interface FollowingButtonProps {
  isFollowing: boolean;
  onClick: () => void;
  className?: string;
}

export default function FollowingButton({
  isFollowing,
  onClick,
  className,
}: FollowingButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-[75px] h-[34px] bg-gray-100 rounded-[20px]',
        !isFollowing && 'bg-primary-500 text-white',
        className,
      )}
    >
      {isFollowing ? '팔로잉' : '팔로우'}
    </button>
  );
}

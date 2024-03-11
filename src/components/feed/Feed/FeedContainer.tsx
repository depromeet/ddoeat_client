interface FeedContainerProps {
  children: React.ReactElement[];
}

export default function FeedContainer({ children }: FeedContainerProps) {
  return <div className="px-[12px]">{children}</div>;
}

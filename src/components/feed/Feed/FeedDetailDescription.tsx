interface FeedDetailDescriptionProps {
  description: string;
}

export default function FeedDetailDescription({
  description,
}: FeedDetailDescriptionProps) {
  return <p className="body-14-regular">{description}</p>;
}

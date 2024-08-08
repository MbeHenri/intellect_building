import PostItemSkeleton from "../Item/Skeleton";
interface Props {
  num?: number;
}
const PostListSkeleton: React.FC<Props> = ({ num }) => {
  return (
    <>
      {Array(num ?? 2).map((_, i) => (
        <PostItemSkeleton key={i} />
      ))}
    </>
  );
};

export default PostListSkeleton;

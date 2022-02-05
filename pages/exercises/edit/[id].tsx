import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  console.log(router.query.id);
  return <p>Post: {router.query.id}</p>;
};

export default Post;

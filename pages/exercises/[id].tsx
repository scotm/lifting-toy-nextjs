// import { PrismaClient } from "@prisma/client";
// import { useRouter } from "next/router";
// import Layout from "../../components/Layout";

// const prisma = new PrismaClient();

// function stringToNumber(s: string): number | undefined {
//   const n = parseFloat(s);
//   if (isNaN(n)) {
//     return undefined;
//   }
//   return n;
// }

// const Post = async () => {
//   const router = useRouter();
//   console.log(typeof router.query.id);
//   console.log(router.query);
//   // Number.parseInt(router.query.id)
//   // await prisma.exercise.findUnique({ where: { id: router.query.id } });
//   return <></>;
//   // return <Layout>{/* <p>Post: {router.query.id}</p> */}</Layout>;
// };

// export default Post;

import { Exercise, PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";

const prisma = new PrismaClient();

const Post = async () => {
  const router = useRouter();
  let { id } = router.query;
  if (id === undefined) {
    router.push("/404");
    return;
  }
  const id_db = Number.parseInt(Array.isArray(id) ? id[0] : id);
  let exercise: Partial<Exercise> = {};
  await prisma.exercise.findUnique({ where: { id: id_db } }).then((result) => {
    if (!!result) {
      exercise = result;
    }
  });

  return (
    <Layout title="{exercise?.title}">
      <p>{exercise?.description}</p>
    </Layout>
  );
};

export default Post;

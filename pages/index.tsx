import type { NextPage } from "next";
import Layout from "../components/PageLayout/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </Layout>
  );
};

export default Home;

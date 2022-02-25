import type { NextPage } from "next";
import Footer from "../components/PageLayout/Footer";
import Navbar from "../components/PageLayout/Navbar";
import ShowWorkoutTemplates from "../components/ShowWorkoutTemplates";
import HeroPage from "../components/HeroPage";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <HeroPage />
      <ShowWorkoutTemplates />
      <Footer />
    </>
  );
};

export default Home;

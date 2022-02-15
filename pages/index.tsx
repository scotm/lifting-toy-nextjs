import type { NextPage } from "next";
import Footer from "../components/PageLayout/Footer";
import Navbar from "../components/PageLayout/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <div
        className="relative flex content-center items-center justify-center pt-16 pb-32"
        style={{ minHeight: "95vh" }}
      >
        <div
          className="absolute top-0 h-full w-full bg-cover bg-top"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80)",
          }}
        >
          <span
            id="blackOverlay"
            className="absolute h-full w-full bg-black opacity-75"
          ></span>
        </div>
        <div className="container relative mx-auto" data-aos="fade-in">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-6/12">
              <div>
                <h1 className="text-5xl font-semibold text-white">
                  Feel The <span className="text-orange-500">Power</span>
                </h1>
                <p className="mt-4 text-lg text-gray-300">
                  Welcome to The Power Room. We are a fitness and training
                  tracking program that focuses on pushing you to your absolute
                  limit.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="pointer-events-none absolute top-auto bottom-0 left-0 right-0 w-full overflow-hidden"
          style={{ height: "70px", transform: "translateZ(0px)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Footer />
    </>
  );
};

export default Home;

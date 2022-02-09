import * as React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export interface IAppProps {
  children: React.ReactNode;
  title?: string;
}

// React.FC<IAppProps> = ({ title, children })

export default function Layout(props: IAppProps) {
  return (
    <>
      <Navbar />
      <div className="mx-auto mt-8 max-w-4xl">
        <h1 className="text-center text-4xl font-extrabold">
          {props.title ?? "Default Title"}
        </h1>
        {props.children}
        <Footer></Footer>
      </div>
    </>
  );
}

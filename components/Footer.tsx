import * as React from "react";

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
  return (
    <footer className="grid grid-cols-3 gap-x-8 gap-y-4">
      <div className="bg-red-700 text-white">
        <h1></h1>
      </div>
      <div>02</div>
      <div>03</div>
      <div>04</div>
      <div>05</div>
      <div>06</div>
    </footer>
  );
}

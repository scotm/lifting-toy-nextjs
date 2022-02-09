import * as React from "react";

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
  return (
    <footer className="m-2 grid grid-cols-3 gap-x-8 gap-y-4">
      <div className="rounded-lg bg-red-700 p-2 text-white">
        <h4>About this software</h4>
        <p></p>
      </div>
      <div className="rounded-lg bg-red-700 p-2 text-white">
        <h4>Making heavy things move is good</h4>
        <p>
          Regular resistance training can decrease the risk of heart disease by
          lowering body fat, decreasing blood pressure, improving cholesterol,
          and lowering the stress placed on the heart. Muscular fitness enhances
          your quality of life.
        </p>
      </div>
      <div className="rounded-lg bg-red-700 p-2 text-white">
        <h4>Keep track of yer gainz</h4>
        <p>
          That which gets measured gets improved. Nothing motivates us more than
          seeing our progress.
        </p>
      </div>
    </footer>
  );
}

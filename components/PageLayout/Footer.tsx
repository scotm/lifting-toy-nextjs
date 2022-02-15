import Link from "next/link";

export interface IFooterProps {}

export default function Footer(props: IFooterProps) {
  return (
    <footer className="m-2 grid grid-cols-3 gap-x-8 gap-y-4">
      <div className="rounded-lg bg-red-700 p-2 text-white">
        <h4 className="text-xl font-bold">About this software</h4>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas illo,
          expedita amet, tempora, minima possimus debitis eos quidem adipisci
          ducimus eligendi voluptatum exercitationem harum pariatur saepe
          perspiciatis sint et inventore!
        </p>
        <p>
          Latest source code can be{" "}
          <Link href="https://github.com/scotm/lifting-toy-nextjs">
            found on GitHub.
          </Link>
        </p>
      </div>
      <div className="rounded-lg bg-red-700 p-2 text-white">
        <h4 className="text-xl font-bold">Resistance Training</h4>
        <p>
          Regular resistance training can decrease the risk of heart disease by
          lowering body fat, decreasing blood pressure, improving cholesterol,
          and lowering the stress placed on the heart. Muscular fitness enhances
          your quality of life.
        </p>
      </div>
      <div className="rounded-lg bg-red-700 p-2 text-white">
        <h4 className="text-xl font-bold">Tracking yer gainz</h4>
        <p>
          That which gets measured gets improved. Nothing motivates us more than
          seeing our progress.
        </p>
      </div>
    </footer>
  );
}

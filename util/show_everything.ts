export default function show_everything(myObject: object) {
  const util = require("util");
  console.log(
    util.inspect(myObject, { showHidden: false, depth: null, colors: true })
  );
}

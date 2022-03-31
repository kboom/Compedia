import renderer from "react-test-renderer";
import { Checkbox } from "./Checkbox.atom";

const noop = () => {};

// https://jestjs.io/docs/api#describeeachtablename-fn-timeout
test.each<{ checked: boolean; readOnly: boolean }>([
  { checked: true, readOnly: true },
  { checked: true, readOnly: false },
  { checked: false, readOnly: true },
  { checked: false, readOnly: false },
])("with %s", async ({ checked, readOnly }) => {
  const tree = renderer
    .create(<Checkbox checked={checked} readOnly={readOnly} onCheck={noop} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

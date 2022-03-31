import renderer from "react-test-renderer";
import { Button } from "./Button.component";

it("renders correctly when there are no tasks", () => {
  const tree = renderer.create(<Button>test string</Button>).toJSON();
  expect(tree).toMatchSnapshot();
});

import {
  MyButton,
  EnhancedButton,
  MyHeader,
  EnhancedHeader,
} from "./withClick";
import EnhancedGreeter from "./SimpleHOC";

export default function HOCDemo() {
  return (
    <>
      <MyButton>MyButton</MyButton>
      <MyButton className="btn btn-secondary">MyButton</MyButton>

      <EnhancedButton>Enhanced Button</EnhancedButton>

      <MyHeader>MyHeader</MyHeader>
      <EnhancedHeader>EnhancedHeader</EnhancedHeader>

      <EnhancedGreeter name="MK" location="IST" />
    </>
  );
}

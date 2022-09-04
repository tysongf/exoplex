import { Footer as ArwesFooter, Paragraph } from "arwes";
import Centered from "./Centered";

const Footer = () => {
  return <ArwesFooter animate>
    <Centered>
      <Paragraph style={{ fontSize: 11, margin: "10px 20px" }}>
        No affiliation with NASA or SpaceX. For educational purposes only.
      </Paragraph>
    </Centered>
  </ArwesFooter>
};

export default Footer;

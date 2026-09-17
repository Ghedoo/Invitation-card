import { couple } from "../../data/content";
import OrnamentDivider from "../../components/OrnamentDivider/OrnamentDivider";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <OrnamentDivider />
        <p className="site-footer__names">
          {couple.groom} <span>&amp;</span> {couple.bride}
        </p>
        <p className="site-footer__note">بمحبة، نرحب بكم لمشاركتنا هذه اللحظة</p>
      </div>
    </footer>
  );
}

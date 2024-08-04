import CartCheckout from "../../components/Cart/checkout";
import FooterSection from "../../components/Footer/section";
import Header from "../../components/Header";
import ScroolToTop from "../../components/ScroolToTop";
import TitleSection from "../../components/Title/section";

function Checkout() {
  return (
    <div className="page-wrapper">
      <Header />
      <TitleSection page="Checkout" />
      <CartCheckout />
      <FooterSection />
      <ScroolToTop />
    </div>
  );
}

export default Checkout;

import CartList from "../../components/Cart/list";
import FooterSection from "../../components/Footer/section";
import Header from "../../components/Header";
import ScroolToTop from "../../components/ScroolToTop";
import TitleSection from "../../components/Title/section";

function Cart() {
  return (
    <div className="page-wrapper">
      <Header />
      <TitleSection page="Shoping Cart" />
      <CartList />
      <FooterSection />
      <ScroolToTop />
    </div>
  );
}

export default Cart;

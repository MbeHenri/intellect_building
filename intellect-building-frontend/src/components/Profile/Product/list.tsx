import { useCallback, useEffect, useState } from "react";
import { ProductSimple } from "../../../models/product";
import EmptyLayer from "../../EmptyLayer";
import { useLoading } from "../../../utils/hooks";
import useService from "../../../providers/Service/hooks";
import ProfileProductRowSkeleton from "./Item/Skeleton";
import ProfileProductItemRow from "./Item";
import { Link } from "react-router-dom";

const ProfileProductList: React.FC = () => {
  const [products, setProducts] = useState<ProductSimple[]>([]);

  // chargement du service
  const { intbuildService } = useService();
  // etat de chargement des réponses
  const { setError, setLoading, loading } = useLoading();

  useEffect(() => {
    setLoading(true);
    intbuildService
      .getTrainings()
      .then((products) => {
        setProducts(products);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {};
  }, [intbuildService, setError, setLoading]);

  const handleDelete = useCallback(
    (product: ProductSimple) => {
      setProducts(products.filter((p) => p.uuid !== product.uuid));
    },
    [products]
  );

  if (loading) {
    return (
      <section className="cart-section">
        <div className="auto-container">
          <div className="cart-outer">
            <div className="table-outer">
              <table className="cart-table">
                <thead className="cart-header">
                  <tr>
                    <th className="prod-column">Product</th>
                    <th className="price">Price</th>
                    <th>Quantity</th>
                    <th>Remove</th>
                  </tr>
                </thead>

                <tbody>
                  {Array(2).map((_, i) => {
                    return <ProfileProductRowSkeleton key={i} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-section">
      <div className="auto-container">
        {/* <!--Cart Outer--> */}
        {products.length > 0 ? (
          <div className="cart-outer">
            <div className="table-outer">
              <div className="pull-right">
                <Link to="add" className="theme-btn btn-style-two">
                  <span className="txt">
                    <span className="fa fa-plus pr-2"></span>Add
                  </span>
                </Link>
              </div>

              <table className="cart-table">
                <thead className="cart-header">
                  <tr>
                    <th className="prod-column">Product</th>
                    <th className="price">Price</th>
                    <th>Quantity</th>
                    <th>Remove</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product, i) => {
                    return (
                      <ProfileProductItemRow
                        handleDelete={() => handleDelete(product)}
                        product={product}
                        key={i}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <EmptyLayer text="no product" />
        )}
      </div>
    </section>
  );
};

export default ProfileProductList;

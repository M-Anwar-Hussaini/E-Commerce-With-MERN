import MetaData from "./layouts/MetaData";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductItem from "./product/ProductItem";

const Home = () => {
  const { data, isLoading } = useGetProductsQuery();
  console.log(data, isLoading);

  return (
    <>
      <MetaData title={"Buy Best Products Online"} />
      <div className="row">
        <div className="col-6 col-md-12">
          <h1 id="products_heading" className="text-secondary">
            Latest Products
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product) => (
                <ProductItem product={product} key={product?.id} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;

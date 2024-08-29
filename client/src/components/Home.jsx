import MetaData from "./layouts/MetaData";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductItem from "./product/ProductItem";
import Loader from "./layouts/Loader";
import toast from "react-hot-toast";
import { useEffect } from "react";
import CustomPagination from "./layouts/CustomPagination";
import { useSearchParams } from "react-router-dom";
import Filters from "./layouts/Filters";

const Home = () => {
  let [searchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const keyword = searchParams.get("keyword") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const params = { page, keyword };
  min !== null && (params.min = min);
  max !== null && (params.max = max);
  const { data, isLoading, error, isError } = useGetProductsQuery(params);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;
  const columnSize = keyword ? 4 : 3;

  return (
    <>
      <MetaData title={"Buy Best Products Online"} />
      <div className="row">
        {keyword && (
          <div className="col-6 col-md-3 mt-3">
            <Filters />
          </div>
        )}
        <div className={keyword ? "col-6 col-md-9" : "col-6 col-md-12"}>
          <h1 id="products_heading" className="text-secondary">
            {keyword
              ? `${data?.products?.length} Products found with keyword ${keyword}.`
              : "Latest Products"}
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data?.products?.map((product) => (
                <ProductItem
                  product={product}
                  key={product?.id}
                  columnSize={columnSize}
                />
              ))}
            </div>
          </section>
          <CustomPagination
            resPerPage={data?.resPerPage}
            filteredProductsCount={data?.filteredProductsCount}
          />
        </div>
      </div>
    </>
  );
};

export default Home;

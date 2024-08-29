import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import PropTypes from "prop-types";

export default function CustomPagination({
  resPerPage,
  filteredProductsCount,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const navigate = useNavigate();
  useEffect(() => {
    setCurrentPage(page);
  }, []);

  const setCurrentPageNo = (pageNo) => {
    setCurrentPage(pageNo);
    if (searchParams.has("page")) {
      searchParams.set("page", pageNo);
    } else {
      searchParams.append("page", pageNo);
    }
    const path = `${window.location.pathname}?${searchParams.toString()}`;
    navigate(path);
  };

  return (
    <div className="d-flex justify-content-center my-5">
      {filteredProductsCount > resPerPage && (
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={resPerPage}
          totalItemsCount={filteredProductsCount}
          pageRangeDisplayed={5}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="First"
          lastPageText="Last"
          itemClass="page-item"
          linkClass="page-link"
        />
      )}
    </div>
  );
}

CustomPagination.propTypes = {
  resPerPage: PropTypes.number,
  filteredProductsCount: PropTypes.number,
};

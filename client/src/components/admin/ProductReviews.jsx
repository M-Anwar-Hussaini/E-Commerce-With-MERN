import { useEffect, useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { MDBDataTable } from 'mdbreact';
import { useLazyGetProductReviewsQuery } from '../../redux/api/productsApi';
import toast from 'react-hot-toast';
import Loader from '../layouts/Loader';

export default function ProductReviews() {
  const [productId, setProductId] = useState('');
  const [getReviews, { isLoading, error, data }] =
    useLazyGetProductReviewsQuery();
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getReviews(productId);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <AdminLayout>
      <div className="row justify-content-center my-5">
        <div className="col-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="productId_field" className="form-label">
                Enter Product ID
              </label>
              <input
                type="text"
                id="productId_field"
                className="form-control"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <button
              id="search_button"
              type="submit"
              className="btn btn-primary w-100 py-2"
            >
              SEARCH
            </button>
          </form>
        </div>
      </div>
      <h5 className="mt-3 text-center">
        Product name: <b></b>
      </h5>
      {data?.reviews?.length > 0 ? (
        <MDBDataTable
          data={{
            columns: [
              {
                label: 'Review ID',
                field: 'reviewId',
                searchable: true,
                sort: 'asc',
              },
              {
                label: 'Rating',
                field: 'rating',
                searchable: true,
                sort: 'asc',
              },
              {
                label: 'Comment',
                field: 'comment',
                searchable: true,
                sort: 'asc',
              },
              {
                label: 'User',
                field: 'user',
                searchable: true,
                sort: 'asc',
              },
              {
                label: 'Actions',
                field: 'actions',
                searchable: true,
                sort: 'asc',
              },
            ],
            rows:
              data?.reviews?.length > 0
                ? data?.reviews?.map((review) => ({
                    reviewId: review?._id,
                    rating: review?.rating,
                    comment: review?.comment,
                    user: review?.user?.name,
                    actions: (
                      <>
                        <button className="btn btn-outline-danger ms-2">
                          <i className="fa fa-trash"></i>
                        </button>
                      </>
                    ),
                  }))
                : [],
          }}
          className="px-3"
          bordered
          striped
          hover
        />
      ) : (
        <p className="text-center mt-5">No reviews found</p>
      )}
    </AdminLayout>
  );
}

import Loader from '../layouts/Loader';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import MetaData from '../layouts/MetaData';
import AdminLayout from '../layouts/AdminLayout';
import {
  useAdminOrderListQuery,
  useDeleteOrderMutation,
} from '../../redux/api/orderApi';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const ListOrders = () => {
  const { data, isLoading } = useAdminOrderListQuery();
  const [deleteOrder, { isSuccess, error, isLoading: isLoadingForDelete }] =
    useDeleteOrderMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success('The Order was deleted successfully');
    }
  }, [error, isSuccess]);

  const hadnleDeleteOrder = (id) => {
    deleteOrder(id);
  };

  if (isLoading || isLoadingForDelete) {
    <Loader />;
  }

  const setOrders = () => {
    const orders = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Payment Status',
          field: 'paymentStatus',
          sort: 'asc',
        },
        {
          label: 'Order Status',
          field: 'orderStatus',
          sort: 'asc',
        },

        {
          label: 'Actions',
          field: 'actions',
          sort: 'asc',
        },
      ],
      rows: [],
    };

    data?.orders?.forEach((order) => {
      orders.rows.push({
        id: order?._id,
        paymentStatus: order?.paymentInfo?.status?.toUpperCase(),
        orderStatus: order?.orderStatus,
        actions: (
          <>
            <Link
              className="btn btn-outline-primary"
              to={`/admin/orders/${order?._id}`}
            >
              <i className="fa fa-pencil"></i>
            </Link>

            <button
              className="btn btn-outline-danger ms-2"
              onClick={() => hadnleDeleteOrder(order?._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return orders;
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={'All Products'} />

      <h1 className="my-5">{data?.products?.length} Orders</h1>

      <MDBDataTable
        data={setOrders()}
        className="px-3"
        bordered
        striped
        hover
      />
    </AdminLayout>
  );
};

export default ListOrders;

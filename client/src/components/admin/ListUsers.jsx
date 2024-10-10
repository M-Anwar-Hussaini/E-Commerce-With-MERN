import { useEffect } from 'react';
import Loader from '../layouts/Loader';
import toast from 'react-hot-toast';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';
import MetaData from '../layouts/MetaData';

import AdminLayout from '../layouts/AdminLayout';
import {
  useDeleteUserMutation,
  useListAllUsersQuery,
} from '../../redux/api/userApi';

const ListUsers = () => {
  const { data, isLoading, error: listError } = useListAllUsersQuery();
  const [
    deleteUser,
    { isSuccess, error: deleteError, isLoading: deleteLoading },
  ] = useDeleteUserMutation();

  useEffect(() => {
    if (listError) {
      toast.error(listError?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success('User deleted successfully');
    }
  }, [listError, deleteError, isSuccess]);

  const handleDelete = (id) => {
    deleteUser(id);
  };

  const setProducts = () => {
    const users = {
      columns: [
        {
          label: 'ID',
          field: 'id',
          sort: 'asc',
        },
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
        },
        {
          label: 'Email',
          field: 'email',
          sort: 'asc',
        },

        {
          label: 'Role',
          field: 'role',
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

    data?.users?.forEach((user) => {
      users.rows.push({
        id: user?._id,
        name: user?.name?.substring(0, Math.min(20, user?.name?.length)),
        email: user?.email?.substring(0, Math.min(20, user?.email?.length)),
        role: user?.role,
        actions: (
          <>
            <Link
              to={`/admin/users/${user?._id}`}
              className="btn btn-sm btn-outline-primary"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-sm btn-outline-danger ms-2"
              onClick={() => handleDelete(user?._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return users;
  };

  if (isLoading || deleteLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={'All Users'} />

      <h1 className="my-5">{data?.users?.length} Users(s)</h1>

      <MDBDataTable
        data={setProducts()}
        className="px-3"
        bordered
        striped
        hover
      />
    </AdminLayout>
  );
};

export default ListUsers;

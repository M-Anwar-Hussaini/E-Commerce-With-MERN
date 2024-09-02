import SideMenu from "./SideMenu";
import PropTypes from "prop-types";

const UserLayout = ({ children }) => {
  return (
    <div>
      <div className="mt-2 mb-4 py-4">
        <h2 className="text-center fw-bolder">User Settings</h2>
      </div>

      <div className="container">
        <div className="row justify-content-around">
          <div className="col-12 col-lg-3">
            <SideMenu />
          </div>
          <div className="col-12 col-lg-8 user-dashboard">{children}</div>
        </div>
      </div>
    </div>
  );
};

UserLayout.propTypes = {
  children: PropTypes.node,
};

export default UserLayout;

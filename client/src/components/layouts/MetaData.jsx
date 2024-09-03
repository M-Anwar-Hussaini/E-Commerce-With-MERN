import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - E-Commerce`}</title>
    </Helmet>
  );
};
MetaData.propTypes = {
  title: PropTypes.string,
};

export default MetaData;

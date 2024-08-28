import { Helmet } from "react-helmet";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - E-Commerce`}</title>
    </Helmet>
  );
};

export default MetaData;

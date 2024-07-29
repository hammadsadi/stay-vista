import PropTypes from "prop-types";
import queryString from "query-string";
import { useNavigate, useSearchParams } from "react-router-dom";

const CategoryBox = ({ label, icon: Icon }) => {
  const [params, setParams] = useSearchParams();
  const categoryName = params.get("query");
  const navigate = useNavigate();
  // handleCatagoriesData
  const handleCatagoriesData = () => {
    const currentQueries = { query: label };
    const url = queryString.stringifyUrl({
      url: "/",
      query: currentQueries,
    });
    navigate(url);
  };
  return (
    <div
      onClick={handleCatagoriesData}
      className={`flex 
  flex-col 
  items-center 
  justify-center 
  gap-2
  p-3
  border-b-2
  hover:text-neutral-800
  transition
  cursor-pointer ${
    categoryName === label ? "border-b-neutral-800 text-neutral-800" : ""
  }`}
    >
      <Icon size={26} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

CategoryBox.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.elementType,
};

export default CategoryBox;

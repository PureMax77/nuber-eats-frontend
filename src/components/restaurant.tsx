import { Link } from "react-router-dom";

interface IRestaurantProps {
  id: string;
  coverImg: string;
  name: string;
  categoryName?: string;
}

export const Restaurant: React.FC<IRestaurantProps> = ({
  id,
  coverImg,
  name,
  categoryName,
}) => {
  return (
    <Link to={`/restaurants/${id}`}>
      <div className="flex flex-col">
        <div
          style={{ backgroundImage: `url(${coverImg})` }}
          className="bg-red-500 bg-cover bg-center mb-3 py-32"
        ></div>
        <h3 className="text-xl font-medium">{name}</h3>
        <span className="border-t mt-2 py-2 text-xs opacity-50 border-gray-400">
          {categoryName}
        </span>
      </div>
    </Link>
  );
};

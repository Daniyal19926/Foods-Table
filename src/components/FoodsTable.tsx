import { Food } from "../services/fakeFoodService";
import Favourite from "./Favourite";
interface Props {
  foods: Food[];
  onSort(path: string): void;
  onDelete(id: string): void;
  onFavour(id: string): void;
}
function FoodsTable({ foods, onSort, onDelete, onFavour }: Props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col" onClick={() => onSort("name")}>
            Name
          </th>
          <th scope="col" onClick={() => onSort("category.name")}>
            Category
          </th>
          <th scope="col" onClick={() => onSort("price")}>
            Price
          </th>
          <th scope="col" onClick={() => onSort("numberInStock")}>
            Stock
          </th>
          <th />
          <th />
        </tr>
      </thead>
      <tbody>
        {foods.map((food) => (
          <tr key={food._id}>
            <td>{food.name}</td>
            <td>{food.category.name}</td>
            <td>{food.price}</td>
            <td>{food.numberInStock}</td>
            <td>
              <Favourite
                isFavoured={Boolean(food.isFavoured)}
                onFavor={() => onFavour(food._id)}
              />
            </td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(food._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default FoodsTable;

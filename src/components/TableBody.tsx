import { Food } from "../services/fakeFoodService";
import Favourite from "./Favourite";

interface Props {
  foods: Food[];
  onDelete(id: string): void;
  onFavour(id: string): void;
}

function TableBody({ foods, onDelete, onFavour }: Props) {
  return (
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
  );
}
export default TableBody;

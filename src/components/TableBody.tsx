import _ from "lodash";
import { Food } from "../services/fakeFoodService";
import Favourite from "./Favourite";
import { Column } from "./TableHeader";

interface Props {
  foods: Food[];
  columns: Column[];
  onDelete(id: string): void;
  onFavour(id: string): void;
}

function TableBody({ foods, columns, onDelete, onFavour }: Props) {
  return (
    <tbody>
      {foods.map((food) => (
        <tr key={food._id}>
          {columns.map(
            (column) =>
              "path" in column && (
                <td key={column.path}>{_.get(food, column.path)}</td>
              )
          )}

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

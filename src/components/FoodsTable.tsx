import { Food } from "../services/fakeFoodService";
import Favourite from "./Favourite";

import TableBody from "./TableBody";
import TableHeader, { Column } from "./TableHeader";
export interface SortColumn {
  path: string;
  order: "asc" | "desc";
}

interface Props {
  foods: Food[];
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
  onDelete(id: string): void;
  onFavour(id: string): void;
}

function FoodsTable({ foods, sortColumn, onSort, onDelete, onFavour }: Props) {
  const columns: Column[] = [
    { path: "name", label: "Name" },
    { path: "category.name", label: "Category" },
    { path: "price", label: "Price" },
    { path: "numberInStock", label: "Stock" },
    {
      key: "favourite",
      content: (food) => (
        <Favourite
          isFavoured={Boolean(food.isFavoured)}
          onFavor={() => onFavour(food._id)}
        />
      ),
    },
    {
      key: "delete",
      content: (food) => (
        <button className="btn btn-danger" onClick={() => onDelete(food._id)}>
          Delete
        </button>
      ),
    },
  ];
  return (
    <table className="table">
      <TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />
      <TableBody
        columns={columns}
        foods={foods}
        onDelete={onDelete}
        onFavour={onFavour}
      />
    </table>
  );
}
export default FoodsTable;

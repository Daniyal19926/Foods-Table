import { Column, Food, SortColumn } from "@types";
import { Favourite, Table } from "@components/common";
import { Link } from "react-router-dom";
import { auth } from "@services";

interface Props {
  foods: Food[];
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
  onDelete(id: string): void;
  onFavour(id: string): void;
}

function FoodsTable({ foods, sortColumn, onSort, onDelete, onFavour }: Props) {
  const user = auth.getCurrentUser();
  const columns: Column<Food>[] = [
    {
      key: "name",
      path: "name",
      label: "Name",

      content: (food) => <Link to={`/foods/${food.id}`}>{food.name}</Link>,
    },

    { path: "category.name", label: "Category" },
    { path: "price", label: "Price" },
    { path: "numberInStock", label: "Stock" },
    {
      key: "favourite",
      content: (food) => (
        <Favourite
          isFavoured={Boolean(food.isFavoured)}
          onFavor={() => onFavour(food.id)}
        />
      ),
    },
    {
      key: "delete",
      content: (food) => (
        <>
          {user?.isAdmin && (
            <button
              className="btn btn-danger"
              onClick={() => onDelete(food.id)}
            >
              Delete
            </button>
          )}
        </>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      items={foods}
      onSort={onSort}
      sortColumn={sortColumn}
    />
  );
}
export default FoodsTable;

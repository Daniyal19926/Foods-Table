import { TableHeader, Tablebody } from ".";
import { Column, Id, SortColumn } from "../../services/types";

interface Props<T extends Id> {
  items: T[];
  columns: Column<T>[];
  sortColumn: SortColumn;
  onSort(sortColumn: SortColumn): void;
}

function Table<T extends Id>({ items, columns, sortColumn, onSort }: Props<T>) {
  return (
    <table className="table">
      <TableHeader onSort={onSort} sortColumn={sortColumn} columns={columns} />
      <Tablebody columns={columns} items={items} />
    </table>
  );
}
export default Table;

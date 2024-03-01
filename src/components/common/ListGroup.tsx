import { Category } from "@types";

interface Props {
  items: Category[];
  selectedItem: Category;
  onItemSelect(category: Category): void;
}
function ListGroup({ items, selectedItem, onItemSelect }: Props) {
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item.id}
          onClick={() => onItemSelect(item)}
          className={`  list-group-item ${
            item.id === selectedItem.id ? "active" : ""
          }`}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
}
export default ListGroup;

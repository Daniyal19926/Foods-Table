import { useState } from "react";
import _ from "lodash";

import { paginate } from "@utils";

import { Category, SortColumn } from "@types";
import { ListGroup, Pagination, SearchBox } from "@components/common";
import { FoodsTable } from "@components";
import { auth, deleteFood } from "@services";
import { Link } from "react-router-dom";
import { useCategories, useFoods } from "@hooks";

const DEFAULT_CATEGORY: Category = { id: "", name: "All Categories" };
const DEFAULT_SORT_COLUMN: SortColumn = { path: "name", order: "asc" };

const PAGE_SIZE = 4;
export default function FoodsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const categories = useCategories();
  const { foods, setFoods } = useFoods();
  const [selectedPage, setSelectedPage] = useState(1);

  const [selectedCategory, setSelectedCategory] =
    useState<Category>(DEFAULT_CATEGORY);

  const [sortColumn, setSortColumn] = useState(DEFAULT_SORT_COLUMN);
  const user = auth.getCurrentUser();

  async function handleDelete(id: string) {
    const newFoods = foods.filter((food) => food.id !== id);
    setFoods(newFoods);
    await deleteFood(id);
  }

  function handleFavour(id: string) {
    const newFoods = foods.map((food) => {
      if (food.id === id) {
        food.isFavoured = !food.isFavoured;
      }
      return food;
    });
    setFoods(newFoods);
  }

  function handleCategorySelect(category: Category) {
    setSelectedCategory(category);
    setSearchQuery("");
    setSelectedPage(1);
  }
  function handleSearch(value: string) {
    setSearchQuery(value);
    setSelectedCategory(DEFAULT_CATEGORY);
  }
  if (foods.length === 0) return <p>There are no foods in the database.</p>;

  //const filteredFoods = selectedCategory.id
  //  ? foods.filter((food) => food.category.id === selectedCategory.id)
  //: foods;
  let filteredFoods = foods;

  if (searchQuery) {
    filteredFoods = foods.filter((food) =>
      food.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } else if (selectedCategory.id) {
    filteredFoods = foods.filter(
      (food) => food.category.id === selectedCategory.id
    );
  }
  const sortedFoods = _.orderBy(
    filteredFoods,
    sortColumn.path,
    sortColumn.order
  );

  const paginatedFoods = paginate(sortedFoods, PAGE_SIZE, selectedPage);

  return (
    <div className="row container pt-3">
      <div className="col-3">
        <ListGroup
          items={[DEFAULT_CATEGORY, ...categories]}
          selectedItem={selectedCategory}
          onItemSelect={handleCategorySelect}
        />
      </div>
      <div className="col">
        {user && (
          <Link to="/foods/new" className="btn btn-primary mb-2">
            New Food
          </Link>
        )}
        <p>There are {filteredFoods.length} foods in the database. </p>
        <SearchBox value={searchQuery} onChange={handleSearch} />

        <FoodsTable
          foods={paginatedFoods}
          sortColumn={sortColumn}
          onDelete={handleDelete}
          onFavour={handleFavour}
          onSort={setSortColumn}
        />
        <Pagination
          totalCount={filteredFoods.length}
          pageSize={PAGE_SIZE}
          selectedPage={selectedPage}
          onPageSelect={setSelectedPage}
        />
      </div>
    </div>
  );
}

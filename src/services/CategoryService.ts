import axios from "axios";
import { Category } from "@types";

export async function getCategories() {
  return axios.get<Category[]>(
    "https://server.intensivecode.se/api/categories"
  );
}

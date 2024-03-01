import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getFood, saveFood } from "@services";
import { useEffect } from "react";
import { Food } from "@types";
import { useCategories } from "@hooks";
const schema = z.object({
  id: z.string().optional(),
  categoryId: z.string().min(1, { message: "You must select a category" }),
  name: z.string().min(1, { message: "Name is required" }),
  numberInStock: z
    .number({ invalid_type_error: "Stock must be a number" })
    .min(1, { message: "Minimum stock is 1" })
    .max(100, { message: "Max 100" }),
  price: z
    .number({ invalid_type_error: "Price must be a number" })

    .min(1, { message: "min pris 1kr" })
    .max(20, "max prix 20kr"),
});

type FormData = z.infer<typeof schema>;
function FoodFormPage() {
  const { id } = useParams();
  const categories = useCategories();
  const navigate = useNavigate();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  //const navigate = useNavigate();

  useEffect(() => {
    async function fetch() {
      if (!id || id === "new") return;
      const { data: food } = await getFood(id);
      if (!food) return navigate("/not-found");

      reset(mapToFormData(food));
    }
    fetch();
  }, []);
  function mapToFormData(food: Food): FormData {
    return {
      id: food.id,
      name: food.name,
      categoryId: food.category.id,
      numberInStock: food.numberInStock,
      price: food.price,
    };
  }

  async function onSubmit(data: FormData) {
    console.log("data", data);
    await saveFood(data);
    navigate("/foods");
  }

  return (
    <div>
      <h1 className="mb-4 p-3"> Food Form {id}</h1>;
      <div className="p-2">
        <form onSubmit={handleSubmit(onSubmit)} className="p-2">
          <div className="mb-3">
            <label className="form-label">Name </label>
            <input
              {...register("name")}
              className="form-control login-input  "
            />
            {errors.name && (
              <p className="text-danger">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Category </label>

            <select
              {...register("categoryId")}
              className="form-select input-360"
            >
              <option />
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Number in Stock </label>
            <input
              {...register("numberInStock", { valueAsNumber: true })}
              className="form-control login-input  "
            />
            {errors.numberInStock && (
              <p className="text-danger">{errors.numberInStock.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Price</label>
            <input
              {...register("price", { valueAsNumber: true })}
              className="form-control login-input "
            />
            {errors.price && (
              <p className="text-danger">{errors.price.message}</p>
            )}
          </div>
          <div className="d-grid justify-content-start mt-4 ">
            <button className="btn btn-primary" disabled={!isValid}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FoodFormPage;

import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getCategories, saveFood } from "@services";
const schema = z.object({
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
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  //const navigate = useNavigate();
  function onSubmit(data: FormData) {
    console.log("data", data);
    saveFood(data);
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
              {getCategories().map((category) => (
                <option key={category._id} value={category._id}>
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

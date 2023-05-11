import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import Base from "../core/Base";
import { getProduct, getCategories, updateProduct } from "./helper/adminapicall";

const UpdateProduct = ({match}) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preLoad = (productId) => {
    getProduct(productId).then((data) => {
    //     console.log(productId)
    //   console.log(data);
      if (data.error) {
          console.log(data.err)
        setValues({ ...values, error: data.error });
      } else {
        preloadCategories();
        setValues({
            ...values,
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category._id,
            stock: data.stock,
            formData: new FormData(),

        });
        //   console.log("CATE: ", categories);
      }
    });
  };

  const preloadCategories = () => {
      getCategories().then(data => {
        if (data.error) {
            console.log(data.err)
          setValues({ ...values, error: data.error });
        }
        else {
            setValues({
                categories: data,
                formData: new FormData(),
            })
        }
      })

  }

  useEffect(() => {
    preLoad(match.params.productId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updateProduct(match.params.productId ,user._id, token, formData)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({ ...values,
            name: "",
            description: "",
            price: "",
            photo: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
         });
        }
      })
      .catch(err => console.log(err));
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
      <div className="alert alert-success mt-3"
      style={{display : createdProduct ? "" : "none"}}
      >
          <h4>{createdProduct} Updated successfully</h4>
      </div>
  );

  const warningMessage = () => (
    <div className="alert alert-danger mt-3"
      style={{display : error ? "" : "none"}}
      >
          <h4>Failed to update product</h4>
      </div>
  );

  const createProductForm = () => (
    <form>
      <span>Post Photo</span>
      <div className="form-group">
        <div class="d-grid gap-2 col-12 mx-auto">
          <label className="btn btn-block btn-success">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="choose a file"
            />
          </label>
        </div>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control mt-1"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control mt-1"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control mt-1"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control mt-1"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}

        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control mt-1"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mt-2 mb-2"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Update Products Here!"
      description="Welcome to Product Creation Section"
      className="container bg-info p-4"
    >
      <Link className="btn btn-sm btn-secondary mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
            {successMessage()}
            {warningMessage()}
            {createProductForm()}</div>
      </div>
    </Base>
  );
};

export default UpdateProduct;

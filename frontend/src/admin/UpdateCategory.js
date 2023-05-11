import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper/index";
import Base from "../core/Base";
import { getCategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = ({match}) => {

    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();


  const preLoad = (categoryId) => {
    getCategory(categoryId).then(data => {
        if(data.error) {
            setError(data.error)
        }
        else {
            setName(data.name);
        }
    })
  };


  useEffect(() => {
    preLoad(match.params.categoryId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // Backend Request fired
    updateCategory( match.params.categoryId, user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(data.error);
          //console.log(data.err);
        } else {
          setError("");
          setSuccess(true);
          //console.log(data);
          setName("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (name) => (event) => {
    setError("");
    setName(event.target.value);
    setSuccess(false);
  };

  const successMessage = () => {
    if( success ) {
      //console.log(success);
      return <h4 className="text-success">Category Created successful</h4>
    }
  };

  const warningMessage = () => {
    if( error ) {
      console.log(error);
      return <h4 className="text-danger">Failed to Create Category</h4>
    }
  };

  const updateCategoryForm = () => (
    <form>
      <div className="form-group">
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange("name")}
          value={name}
          autoFocus
          required
          //placeholder="For example: Summer"
        />
        <button onClick={onSubmit} className="btn btn-outline-info">
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Update Category Here!"
      description="Welcome to Category Creation Section"
      className="container bg-info p-4"
    >
      <Link className="btn btn-sm btn-secondary mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
            {successMessage()}
            {warningMessage()}
            {updateCategoryForm()}</div>
      </div>
    </Base>
  );
};

export default UpdateCategory;

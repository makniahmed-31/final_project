import React from 'react'

const CategoryForm = ({handleSubmit,name,setName}) => {
    return(
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            autoFocus
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            className="form-control"
          />
          <br />
          <button className="btn btn-outline-primary">Add New</button>
        </div>
      </form>
  
    )
}

export default CategoryForm;

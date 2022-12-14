import React from 'react';
import { useState } from 'react'

function Form({ moviesearch }) {
  const [formData, setFormData] = useState({
    searchterm: "",
  });

  // πΈπΈπΈ
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(`formdata: ${JSON.stringify(formData)}`);
  };

  // πΈπΈπΈ
  const handleSubmit = (event) => {
    event.preventDefault();
    moviesearch({searchTerm: formData.searchterm});
  };


  // π’π’π’
  return (
    <React.Fragment>
      <form className="formy" onSubmit={handleSubmit}>
        <input
          className="form-input-text"
          type="text"
          name="searchterm"
          onChange={handleChange}
          value={formData.searchterm} />
        <input className="form-input-submit" type="submit" value="submit" />
      </form>
    </React.Fragment>
  )
}

export default Form
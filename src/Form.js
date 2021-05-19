import React from "react"

const Form = (props) => {
  
    //state for form
    const [formData, setFormData] = React.useState(props.bird)

    //functions
    const handleSubmit = (event) => {
        event.preventDefault() //prevent form from refreshing
        props.handleSubmit(formData) //submit to parents' desired function
        props.history.push("/") //push back to display page
    }

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Name of Bird"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
            />
            <input
                type="text"
                name="img"
                placeholder="Image URL"
                value={formData.img}
                onChange={handleChange}
            />
            <input type="submit" value={props.label} />

        </form>
    )
};

export default Form;

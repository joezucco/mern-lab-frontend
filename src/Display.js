const Display = (props) => {
  //deconstruct birds from props
  const { birds, selectBird, history } = props;

  //JSX for when I have birds
  const loaded = () => (
    <div style={{ textAlign: "center" }}>
      {birds.map((bird) => (
        <article key={bird._id}>
          <img src={bird.img} />
          <h1>{bird.name}</h1>
          <h3>{bird.description}</h3>
              <button 
            onClick={() => {
              selectBird(bird);
              history.push("/edit");
            }}
          >
            Edit
          </button>
              <button
                  
            onClick={() => {
              props.deleteBird(bird);
            }}
          >
            Delete
          </button>
        </article>
      ))}
    </div>
  );

  const loading = () => <h1>Loading...</h1>;

  return birds.length > 0 ? loaded() : loading();
};

export default Display;

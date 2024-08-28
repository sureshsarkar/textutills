const Username = ({ handleChange, setValue }) => {
  return (
    <div className="mb-3">
      <label for="username" className="form-label">
        Username
      </label>
      <input
        type="text"
        className="form-control"
        name="username"
        onChange={handleChange}
        value={setValue}
      />
    </div>
  );
};

export default Username;

const Email = ({ handleChange, setValue }) => {
  return (
    <div className="mb-3">
      <label for="email" className="form-label">
        Email
      </label>
      <input
        type="email"
        className="form-control"
        name="email"
        onChange={handleChange}
        value={setValue}
      />
    </div>
  );
};

export default Email;

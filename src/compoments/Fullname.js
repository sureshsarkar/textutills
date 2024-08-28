const Fullname = ({ handleChange, setValue }) => {
  return (
    <div className="mb-3">
      <label for="fullname" className="form-label">
        Fullname
      </label>
      <input
        type="text"
        className="form-control"
        name="fullname"
        onChange={handleChange}
        value={setValue}
      />
    </div>
  );
};

export default Fullname;

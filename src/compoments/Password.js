const Password = ({ handleChange, setValue }) => {
  return (
    <div class="mb-3">
      <label for="exampleInputPassword1" className="form-label">
        Password
      </label>
      <input
        type="password"
        className="form-control"
        onChange={handleChange}
        name="password"
        value={setValue}
      />
    </div>
  );
};

export default Password;

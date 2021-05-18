import React from "react";

function NativeSelect() {
  return (
    <div>
      <select name="cars" id="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>
      <input type="submit" value="Submit" />
    </div>
  );
}

export default NativeSelect;

import { memo } from "react";
import { useAppContext } from "../provider";

import { HANDLE_VIEW_TYPE } from "../reducers/types";

function NativeSelect() {
  const { dispatch } = useAppContext();
  return (
    <div>
      <select
        onChange={(e) => {
          dispatch({
            type: HANDLE_VIEW_TYPE,
            payload: e.target.value,
          });
        }}
        className="px-8 outline-black text-black"
        name="Grid"
        id="cars"
      >
        <option value="grid">Grid</option>
        <option value="list">List</option>
      </select>
    </div>
  );
}

export default memo(NativeSelect);

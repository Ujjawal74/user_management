import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getReq } from "../../utils/network";
import { API_URL } from "../../utils/network";
import { STATUS } from "../../utils/network";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    data: [],
    status: STATUS.WAITING,
  },
  reducers: {
    setUsers(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = STATUS.WAITING;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUS.IDLE;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = STATUS.ERROR;
      });
  },
});

// Thunk Middleware for asynchronous call
// reducers are pure functions so no side effects in that

export const fetchUsers = createAsyncThunk("fetch", async () => {
  const url = `${API_URL}/users`;
  const res = await getReq(url);
  return res.users;
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isStaff: boolean | null;
  username: string | null;
}

const initialState: UserState = {
  isStaff: null,
  username: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsStaff(state, action: PayloadAction<boolean>) {
      state.isStaff = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    clearUser(state) {
      state.isStaff = null;
      state.username = null;
    },
  },
});

export const { setIsStaff, setUsername, clearUser } = userSlice.actions;
export default userSlice.reducer;

// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import api from "../../api/api";

// export interface ErrorResponse {
//   timestamp: string;
//   message: string;
//   details: string;
// }

// interface AuthState {
//   status: "idle" | "loading" | "succeeded" | "failed";
//   loading: boolean;
//   error: ErrorResponse | null;
//   jwtToken: string | null;
//   username: string | null;
// }
// const initialState: AuthState = {
//   loading: false,
//   error: null,
//   status: "idle",
//   jwtToken: null,
//   username: null
// };

// interface SignupUserParams {
//   username: string;
//   email: string;
//   password: string;
// }
// interface Signinresponse {
//   jwtToken: string;
//   username: string;
// }
// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     resetAuthState: (state) => {
//       state.status = "idle";
//       state.loading = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(signupUser.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(signupUser.fulfilled, (state) => {
//         state.status = "succeeded";
//       })
//       .addCase(signupUser.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload as ErrorResponse;
//       })
//       .addCase(signinUser.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(signinUser.fulfilled, (state, action: PayloadAction<Signinresponse>) => {
//         state.status = "succeeded";
//         state.jwtToken = action.payload.jwtToken;
//         state.username = action.payload.username;
//       })
//       .addCase(signinUser.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload as ErrorResponse;
//       })
//   },
// });

// export const { resetAuthState } = authSlice.actions;

// export default authSlice.reducer;

// export const signupUser = createAsyncThunk<string, SignupUserParams>("auth/signupUser", async (params, { rejectWithValue }) => {
//   try {
//     const response = await api.post(`/auth/signup`, params);
//     return response.data;
//   } catch (error: any) {
//     const errorResponse: ErrorResponse = error.response?.data || {
//       timestamp: Date().toString(),
//       message: "Unknown error",
//       details: "",
//     };

//     return rejectWithValue(errorResponse);
//   }
// });

// export const signinUser = createAsyncThunk<Signinresponse, {username: string, password: string}>("auth/signinUser", async (params, { rejectWithValue }) => {
//   try {
//     const response = await api.post(`/auth/signin`, params);
//     return response.data;
//   } catch (error: any) {
//     const errorResponse: ErrorResponse = error.response?.data || {
//       timestamp: Date().toString(),
//       message: "Unknown error",
//       details: "",
//     };

//     return rejectWithValue(errorResponse);
//   }
// });
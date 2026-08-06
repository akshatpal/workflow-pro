import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

interface ProjectState {
  selectedProject:
    | string
    | null;
}

const initialState: ProjectState =
  {
    selectedProject: null,
  };

const projectSlice =
  createSlice({
    name: "project",

    initialState,

    reducers: {
      setSelectedProject(
        state,
        action: PayloadAction<string>
      ) {
        state.selectedProject =
          action.payload;
      },

      clearSelectedProject(
        state
      ) {
        state.selectedProject =
          null;
      },
    },
  });

export const {
  setSelectedProject,
  clearSelectedProject,
} = projectSlice.actions;

export default projectSlice.reducer;
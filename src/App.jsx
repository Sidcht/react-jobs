import React from "react";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import supabase from "./lib/supabase";

const App = () => {
  // Add New Job
  const addJob = async (newJob) => {
    console.log("Adding:", newJob);

    const { data, error } = await supabase
      .from("jobs")
      .insert([newJob])
      .select();

    console.log("Data:", data);
    console.log("Error:", error);

    if (error) {
      console.error(error);
      throw error;
    }
  };

  // Delete Job
  const deleteJob = async (id) => {
    const { error } = await supabase.from("jobs").delete().eq("id", id);

    if (error) {
      console.error(error);
      throw error;
    }
  };

  // Update Job
  const updateJob = async (job) => {
    const { id, ...updatedFields } = job;

    const { data, error } = await supabase
      .from("jobs")
      .update(updatedFields)
      .eq("id", id)
      .select();

    console.log("Data:", data);
    console.log("Error:", error);

    if (error) {
      console.error(error);
      throw error;
    }
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
};

export default App;

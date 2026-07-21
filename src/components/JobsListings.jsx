import { useState, useEffect } from "react";
import React from "react";
import JobListing from "./JobListing";
import Spinner from "./Spinner";
import supabase from "../lib/supabase";
import SearchBar from "./SearchBar";
import SortDropDown from "./SortDropDown";

const JobsListings = ({ isHome = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedsearchTerm, setDebouncedSearchTerm] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let query = supabase.from("jobs").select("*");
        if (debouncedsearchTerm.trim() != "") {
          query = query.or(
            `title.ilike.%${debouncedsearchTerm}%,description.ilike.%${debouncedsearchTerm}%,company_name.ilike.%${debouncedsearchTerm}%,location.ilike.%${debouncedsearchTerm}`,
          );
        }
        const sortOptions = {
          "title-asc": ["title", true],
          "title-desc": ["title", false],
          "company-asc": ["company_name", true],
          "company-desc": ["company_name", false],
          "location-asc": ["location", true],
          "location-desc": ["location", false],
        };

        if (sortBy !== "default") {
          const [column, ascending] = sortOptions[sortBy];
          query = query.order(column, { ascending });
        }
        if (isHome) {
          query = query.limit(3);
        }

        const { data, error } = await query;

        if (error) throw error;

        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [debouncedsearchTerm, sortBy, isHome]);

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <SortDropDown sortBy={sortBy} setSortBy={setSortBy} />
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? "Recent Jobs" : "Browse Jobs"}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobsListings;

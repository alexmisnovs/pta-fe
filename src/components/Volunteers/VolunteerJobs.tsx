"use client";

// Step 1: Import necessary modules
import { useQuery } from "@apollo/client";
import { EventsWithVolunteeringJobsDocument } from "@/gql/graphql";

import { useEffect, useState } from "react";
import VolunteerJobItem from "./VolunteerJobItem";
import JobForm from "@/components/Volunteers/JobForm";
import VolunteerForm from "./VolunteerForm";

const VolunteerJobs = () => {
  const [volunteerId, setVolunteerId] = useState("");

  const { loading, error, data, refetch } = useQuery(EventsWithVolunteeringJobsDocument);

  const events = data?.events;
  // console.log(events);

  // return;
  useEffect(() => {
    // Check if volunteerId is already stored in local storage
    const storedVolunteerId = localStorage.getItem("volunteerId");
    if (storedVolunteerId) {
      setVolunteerId(storedVolunteerId);
    }
  }, []);
  // console.log(volunteerId);
  if (loading) {
    return "Loading...";
  }

  if (error) return `Error! ${error.message}`;

  return (
    <>
      <div className=" bg-base-100">
        <div className="container">
          <h2 className="text-3xl font-bold text-center my-8">Current Volunteering Jobs</h2>
          {/* make column layout */}
          <div className="flex flex-wrap -mx-4">
            {events?.map(event => (
              <VolunteerJobItem key={event?.documentId || ""} {...event} />
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            {volunteerId ? (
              ""
            ) : (
              <div className="flex-1">
                <div className="flex-1">
                  <VolunteerForm />
                </div>
              </div>
            )}
            <div className="flex-1">
              <JobForm
                events={
                  events?.filter((event): event is NonNullable<typeof event> => event !== null) ||
                  []
                }
                onSubmitSuccess={() => refetch()}
                onVolunteerSearchSuccess={(id: string): void => {
                  setVolunteerId(id);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VolunteerJobs;

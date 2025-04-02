"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

type EventProps = {
  __typename?: "Event";
  documentId?: string;
  heading?: string | null;
  slug?: string | null;
  featuredImage?: {
    __typename?: "UploadFile";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formats?: any | null;
  } | null;
  volunteer_jobs: Array<{
    __typename?: "VolunteerJob";
    documentId: string;
    name?: string | null;
    volunteer?: {
      __typename?: "Volunteer";
      name?: string | null;
      email?: string | null;
    } | null;
  } | null>;
};

type JobFormProps = {
  events: EventProps[];
  onSubmitSuccess?: () => void; // Add this line
  onVolunteerSearchSuccess?: (id: string) => void; // Add this line
};

const JobForm = ({ events, onSubmitSuccess, onVolunteerSearchSuccess }: JobFormProps) => {
  // const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [volunteerId, setVolunteerId] = useState("");
  const [volunteerName, setVolunteerName] = useState(""); // Add this line
  const [volunteerJobs, setVolunteerJobs] = useState<
    Array<{
      id?: number;
      documentId?: string;
      name?: string | null;
      event?: {
        heading?: string | null;
      };
    } | null>
  >([]);
  const [documentId, setDocumentId] = useState<string>("");
  // const [error, setError] = useState<Error | null>(null);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    // Check if volunteerId is already stored in local storage
    const storedVolunteerId = localStorage.getItem("volunteerId");
    if (storedVolunteerId) {
      setVolunteerId(storedVolunteerId);
    }
    const storedVolunteerName = localStorage.getItem("volunteerName");
    if (storedVolunteerName) {
      setVolunteerName(storedVolunteerName);
    }
    // Add this: retrieve volunteer jobs from localStorage
    const storedVolunteerJobs = localStorage.getItem("volunteerJobs");
    if (storedVolunteerJobs) {
      setVolunteerJobs(JSON.parse(storedVolunteerJobs));
    }
  }, []);

  const eventOptions = events?.map((event: EventProps) => (
    <option key={event.documentId} value={event.documentId}>
      {event.heading}
    </option>
  ));

  // Filter jobs based on selected event and only show jobs without volunteers
  const availableJobs =
    events
      .find(event => event.documentId === documentId)
      ?.volunteer_jobs.filter(job => !job?.volunteer)
      .map(job =>
        job ? (
          <option key={job.documentId} value={job.documentId}>
            {job.name}
          </option>
        ) : null
      ) || [];

  const handleVolunteerSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/volunteers?filters[email][$eq]=${email}&fields[0]=documentId&fields[1]=name&populate[volunteer_jobs][populate][event][fields][0]=heading&populate[volunteer_jobs][fields][0]=documentId&populate[volunteer_jobs][fields][1]=name`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (result.ok) {
        const data = await result.json();
        setLoading(false);
        const volunteerId = data.data[0].documentId;
        const volunteerName = data.data[0].name;
        const volunteerJobs = data.data[0].volunteer_jobs;

        // Transform the jobs data to include event information
        const formattedJobs = volunteerJobs.map(
          (job: {
            documentId: string;
            name: string | null;
            event?: { heading?: string | null };
          }) => ({
            documentId: job.documentId,
            name: job.name,
            event: {
              heading: job.event?.heading || null,
            },
          })
        );

        setVolunteerJobs(formattedJobs);
        localStorage.setItem("volunteerJobs", JSON.stringify(formattedJobs));
        setVolunteerName(volunteerName);
        setVolunteerId(volunteerId);
        localStorage.setItem("volunteerId", volunteerId);
        localStorage.setItem("volunteerName", volunteerName);
        onVolunteerSearchSuccess?.(volunteerId);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to find volunteer");
      console.log(error);
    }
  };
  const resetForm = () => {
    // Only reset the form fields, not the volunteer information
    setDocumentId("");
    setSelectedJob("");
  };

  const resetFormAndRerender = () => {
    resetForm();
    setFormKey(prevKey => prevKey + 1);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/volunteer-jobs/${selectedJob}`,
        {
          method: "PUT",
          body: JSON.stringify({
            data: {
              volunteer: {
                connect: [{ documentId: volunteerId }],
              },
            },
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (result.ok) {
        toast.success(`Thank you ${volunteerName}, you've applied for this job!`, {
          duration: 4000,
          position: "bottom-center",
          style: {
            background: "#4CAF50",
            color: "#fff",
          },
        });
        // Update local state after successful submission
        const updatedJobs = [...volunteerJobs];
        const selectedJobDetails = events
          .find(event => event.documentId === documentId)
          ?.volunteer_jobs.find(job => job?.documentId === selectedJob);

        if (selectedJobDetails) {
          updatedJobs.push({
            documentId: selectedJobDetails.documentId,
            name: selectedJobDetails.name,
            event: {
              heading: events.find(event => event.documentId === documentId)?.heading || null,
            },
          });
          setVolunteerJobs(updatedJobs);
          localStorage.setItem("volunteerJobs", JSON.stringify(updatedJobs));
        }

        setLoading(false);
        resetForm();
        resetFormAndRerender();
        onSubmitSuccess?.();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
      console.log(error);
    }
  };

  const handleRemoveJob = async (jobId: string) => {
    try {
      setLoading(true);
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/volunteer-jobs/${jobId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            data: {
              volunteer: {
                disconnect: [{ documentId: volunteerId }],
              },
            },
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (result.ok) {
        const updatedJobs = volunteerJobs.filter(job => job?.documentId !== jobId);
        setVolunteerJobs(updatedJobs);
        localStorage.setItem("volunteerJobs", JSON.stringify(updatedJobs));
        toast.success("Job removed successfully");
        onSubmitSuccess?.(); // Trigger parent rerender
      }
    } catch (error) {
      toast.error("Failed to remove job");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {localStorage.getItem("volunteerId") ? (
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <p>Welcome back {volunteerName}</p>
            <p>Jobs you applied to help with:</p>

            {volunteerJobs?.map(job => {
              return (
                <div key={job?.documentId} className="flex items-center justify-between">
                  <p>
                    {job?.name} - {job?.event?.heading}
                  </p>
                  <button
                    onClick={() => job?.documentId && handleRemoveJob(job.documentId)}
                    className="text-custom-red hover:text-custom-blue"
                    disabled={loading}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              );
            })}
            <button
              onClick={() => {
                localStorage.removeItem("volunteerId");
                localStorage.removeItem("volunteerName");
                localStorage.removeItem("volunteerJobs"); // Add this line
                setVolunteerId("");
                setVolunteerName("");
                setVolunteerJobs([]); // Add this line
                window.location.reload();
              }}
              className="btn w-24 bg-custom-red hover:bg-custom-blue text-white font-bold py-2 px-4 rounded border-inherit"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="text-3xl font-bold text-center mb-8">Volunteer Sign in</h2>
              <form onSubmit={handleVolunteerSearch} className="space-y-4">
                <input
                  className="input input-bordered w-full"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                />

                <br />

                <button
                  type="submit"
                  className="btn bg-custom-red hover:bg-custom-blue text-white font-bold py-2 px-4 rounded border-inherit"
                  disabled={loading}
                >
                  {loading ? "Searching for volunteer..." : "Login"}
                </button>
                <br />
              </form>
            </div>
          </div>
        </>
      )}

      {volunteerId && (
        <>
          <div className="card bg-base-100 shadow-xl mt-10">
            <div className="card-body">
              <h3>Select Event and apply for event form</h3>
              <form key={formKey} onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="jobId" value={documentId} required />
                <input type="hidden" name="volunteerId" value={volunteerId} required />
                <select
                  className="input input-bordered w-full"
                  value={documentId}
                  onChange={e => setDocumentId(e.target.value)}
                  required
                >
                  <option value="">Select an event</option>
                  {eventOptions}
                </select>
                <select
                  className="input input-bordered w-full"
                  value={selectedJob}
                  onChange={e => setSelectedJob(e.target.value)}
                  disabled={!documentId}
                  required
                >
                  <option value="">Select a job</option>
                  {availableJobs}
                </select>
                <br />

                <button
                  type="submit"
                  className="btn bg-custom-red hover:bg-custom-blue text-white font-bold py-2 px-4 rounded border-inherit"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "do it"}
                </button>
                <br />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JobForm;

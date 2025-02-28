"use client";
// import {useState} from "react"
// import { useMutation } from "@apollo/client";
// import { CreateVolunteerDocument, CreateVolunteerMutationVariables } from "@/gql/graphql";

// function VolunteerForm() {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [phone, setPhone] = useState("")

//   const [addVolunteer, { data, loading, error }] = useMutation(CreateVolunteerDocument);

//   if (loading) return "Submitting...";
//   if (error) return `Submission error! ${error.message}`;

//   // const events = data.events;
//   console.log(data);

//   return <h1>Hello form</h1>;

//   return (
//     <div className="max-w-md mx-auto card bg-base-100 shadow-xl">
//       <div className="card-body">
//         <h2 className="card-title text-2xl mb-4">Become a Volunteer</h2>
//         <form className="space-y-4" onSubmit={e => {
//           e.preventDefault();
//           addVolunteer({ variables: { type: input.value } });
//           input.value = '';
//           >
//           <input type="text" placeholder="Your Name" className="input input-bordered w-full" />
//           <input type="email" placeholder="Email Address" className="input input-bordered w-full" />
//           <input type="text" placeholder="Phone Number" className="input input-bordered w-full" />
//           <button className="btn btn-primary w-full">Join Us </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default VolunteerForm;

// Step 1: Import necessary modules
import { useMutation, gql } from "@apollo/client";
import React, { useState } from "react";
// import { CreateVolunteerDocument, CreateVolunteerMutationVariables } from "@/gql/graphql";

// Step 2: Define the GraphQL mutation
const SUBMIT_VOLUNTEER = gql`
  mutation SubmitVolunteer($input: VolunteerInput!) {
    createVolunteer(data: $input) {
      name
      email
    }
  }
`;

const VolunteerForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [yearGroup, setYearGroup] = useState("");

  const [createVolunteer, { data, loading, error }] = useMutation(SUBMIT_VOLUNTEER);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createVolunteer({ variables: { input: { name, email, phoneNumber, yearGroup } } });
      // Handle successful submission (e.g., show a success message)

      console.log("something happened" + data);
    } catch (e) {
      // Handle error (e.g., show an error message)
      console.log(e);
    }
  };

  return (
    <div className="max-w-md mx-auto card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">Become a Volunteer</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="input input-bordered w-full"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your Name"
            required
          />
          <input
            className="input input-bordered w-full"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your Email"
            required
          />

          <input
            className="input input-bordered w-full"
            type="text"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            placeholder="Your Phone"
            required
          />
          <input
            className="input input-bordered w-full"
            type="text"
            value={yearGroup}
            onChange={e => setYearGroup(e.target.value)}
            placeholder="Year group of your child"
            required
          />
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Submitting..." : "Join Us"}
          </button>
          {error && <p>Error submitting form: {error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default VolunteerForm;

"use client";
import React, { useState } from "react";

const Form = () => {
  const [inputs, setInputs] = useState({
    bookerFirstName: "",
    bookerLastName: "",
    bookerPhone: "",
    bookerEmail: "",
    bookerOcassion: "",
    bookerRequests: "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="First name"
        name="bookerFirstName"
        onChange={handleChangeInput}
        value={inputs.bookerFirstName}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Last name"
        name="bookerLastName"
        onChange={handleChangeInput}
        value={inputs.bookerLastName}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Phone number"
        name="bookerPhone"
        onChange={handleChangeInput}
        value={inputs.bookerPhone}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Email"
        name="bookerEmail"
        onChange={handleChangeInput}
        value={inputs.bookerEmail}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Ocassion (optional)"
        name="bookerOcassion"
        onChange={handleChangeInput}
        value={inputs.bookerOcassion}
      />
      <input
        type="text"
        className="border rounded p-3 w-80 mb-4"
        placeholder="Requests (optional)"
        name="bookerRequests"
        onChange={handleChangeInput}
        value={inputs.bookerRequests}
      />
      <button className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300">
        Complete reservation
      </button>
      <p className="mt-4 text-sm">
        By clicking “Complete reservation” you agree to the OpenTable Terms of
        Use and Privacy Policy. Standard text message rates may apply. You may
        opt out of receiving text messages at any time.
      </p>
    </div>
  );
};

export default Form;

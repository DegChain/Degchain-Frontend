import React from "react";
import Link from "next/link";
import axios from "axios";
import { RiLoader4Line } from "react-icons/ri";

const Support = () => {
  const [formState, setFormState] = React.useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await axios.post("/api/submit", formState);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <section className="bg-black w-full text-black px-10 py-4">
        <h1 className="p-5 pl-0 text-2xl font-medium text-white mb-2">Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <label htmlFor="name" className="text-white">
                Name:
              </label>
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                id="name"
                onChange={handleChange}
                className="mt-1 px-3 placeholder:italic placeholder:text-slate-400 bg-white w-full border border-slate-300 rounded-md py-2"
              />
            </div>

            <div>
              <label htmlFor="phone" className="text-white">
                Phone Number:
              </label>
              <input
                type="text"
                placeholder="7720****"
                name="phone"
                id="phone"
                onChange={handleChange}
                className="mt-1 px-3 placeholder:italic placeholder:text-slate-400 bg-white w-full border border-slate-300 rounded-md py-2"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-white">
                Email:
              </label>
              <input
                type="text"
                placeholder="eg. bcs_20xx@iiitm.ac.in"
                name="email"
                id="email"
                onChange={handleChange}
                className="mt-1 px-3 placeholder:italic placeholder:text-slate-400 bg-white w-full border border-slate-300 rounded-md py-2"
              />
            </div>
          </div>
          <div className="my-3">
            <label htmlFor="message" className="text-white">
              Message:
            </label>
            <textarea
              placeholder="Tell us about your idea"
              name="message"
              id="message"
              onChange={handleChange}
              className="mt-1 px-3 placeholder:italic placeholder:text-slate-400 bg-white w-full border border-slate-300 rounded-md py-2"
            />
          </div>
          <button type="submit" className="bg-white text-black text-lg w-24 h-8 px-2 rounded-full m-1">
            {isLoading ? <RiLoader4Line className="animate-spin mr-2" /> : null}
            Go
          </button>
          {isSubmitted && <p className="text-green-500 font-semibold">Form submitted successfully!</p>}
        </form>
      </section>

      <Link href="/admin">Admin</Link>
      <Link href="/user">User</Link>
    </div>
  );
};

export default Support;

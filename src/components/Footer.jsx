import { useState } from 'react';
import StarsBackground from './StarsBackground';

// Web3Forms Access Key - Replace with your actual key if needed
const WEB3FORMS_ACCESS_KEY = "dbbbf7da-8cb4-4328-a3ad-2db876738fcd";

function SuggestionsForm() {
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          ...formData,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });

        // Remove the success message after 5 seconds
        setTimeout(() => {
          setStatus("idle");
        }, 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-md bg-white/5 border border-white/10 p-6 rounded-2xl shadow-lg backdrop-blur-sm">
      <h3 className="text-2xl font-bold text-white mb-4" style={{ textShadow: "0 0 4px #fbbf24" }}>Share your suggestions</h3>

      {status === "success" && (
        <div className="p-4 mb-4 text-green-400 bg-green-400/10 border border-green-400/20 rounded-lg text-sm text-center">
          Your message has been sent successfully! Thank you for your suggestions.
        </div>
      )}

      {status === "error" && (
        <div className="p-4 mb-4 text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg text-sm text-center">
          An error occurred while sending. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
            className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors placeholder:text-gray-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors placeholder:text-gray-500"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message or Suggestion</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Write your suggestion here..."
            className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg text-white focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors placeholder:text-gray-500 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 w-full px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-20 bg-black text-white py-12 px-6 mt-auto font-inherit flex flex-col justify-center">
      <StarsBackground/>
      <div className="w-full mx-auto flex flex-col items-center gap-12">
        {/* Centered Suggestions Form */}
        <div className="w-full flex justify-center">
          <SuggestionsForm />
        </div>
      </div>

      {/* Copyrights */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Heliosphere. All rights reserved.</p>
      </div>
    </footer>
  );
}

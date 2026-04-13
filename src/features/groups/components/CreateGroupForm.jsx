import { useState } from "react";
import { useCreateGroup } from "../hooks/useCreateGroup";
import { useNavigate } from "react-router-dom";
import { COUNTRIES_CITIES, COUNTRY_LIST } from "../../../lib/countries";

const TOPICS = [
  "Programming",
  "Language",
  "Math",
  "Science",
  "Design",
  "Business",
  "Art",
];

export default function CreateGroupForm() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [meeting_link, setMeeting_link] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [errors, setErrors] = useState({});

  const availableCities = country ? COUNTRIES_CITIES[country] : [];

  const { mutate, isPending } = useCreateGroup();

  const validateForm = () => {
    const newErrors = {};

    if (!topic) newErrors.topic = "Topic is required";

    if (!title) {
      newErrors.title = "Title is required";
    } else if (title.length > 20) {
      newErrors.title = `Title is too long (${title.length}/20)`;
    }

    if (!description) {
      newErrors.description = "Description is required";
    } else if (description.length < 100) {
      newErrors.description = `Too short! Need ${100 - description.length} more characters`;
    } else if (description.length > 500) {
      newErrors.description = `Too long! (${description.length}/500)`;
    }
    if (!meeting_link) {
      newErrors.meeting_link = "Meeting link is required";
    } else if (!meeting_link.startsWith("http")) {
      newErrors.meeting_link = "Please enter a valid meeting link";
    }
    if (!country) newErrors.country = "Country is required";
    if (!city) newErrors.city = "City is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    mutate(
      {
        title,
        topic,
        description,
        date: new Date().toISOString(),
        meeting_link,
        country,
        city,
      },
      {
        onSuccess: () => {
          setDescription("");
          setMeeting_link("");
          setTitle("");
          setTopic("");
          setCountry("");
          setCity("");
          setErrors({});
          navigate("/");
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 w-full mx-auto p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 mb-8"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-black text-gray-900 dark:text-gray-50">Create New Group</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Fill in the details to launch your interest group
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Topic Select */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
            Interest *
          </label>
          <select
            className={`w-full p-4 border-2 rounded-2xl outline-none transition-all cursor-pointer ${
              errors.topic
                ? "border-red-100 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 text-red-900 dark:text-red-400 focus:border-red-300 dark:focus:border-red-800"
                : "border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-white"
            }`}
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              if (errors.topic) setErrors({ ...errors, topic: null });
            }}
          >
            <option value="" disabled className="dark:bg-gray-900">
              Select an Interest
            </option>
            {TOPICS.map((t) => (
              <option key={t} value={t} className="dark:bg-gray-900">
                {t}
              </option>
            ))}
          </select>
          {errors.topic && (
            <p className="text-red-500 dark:text-red-400 text-xs font-bold ml-1">
              {errors.topic}
            </p>
          )}
        </div>

        {/* Title Input */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
            Title *
          </label>
          <input
            type="text"
            placeholder="e.g. Photography Club"
            className={`w-full p-4 border-2 rounded-2xl outline-none transition-all ${
              errors.title
                ? "border-red-100 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 text-red-900 dark:text-red-400 focus:border-red-300 dark:focus:border-red-800"
                : "border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-white"
            }`}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors({ ...errors, title: null });
            }}
          />
          <div className="flex justify-between items-center px-1">
            {errors.title ? (
              <p className="text-red-500 dark:text-red-400 text-xs font-bold">{errors.title}</p>
            ) : ( 
              <div />
            )}
            <span
              className={`text-[10px] font-bold ${title.length > 20 ? "text-red-500 dark:text-red-400" : "text-gray-400 dark:text-gray-500"}`}
            >
              {title.length}/20
            </span>
          </div>
        </div>

        {/* Meeting Link Input */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
            Group Link *
          </label>
          <input
            type="text"
            placeholder="https://meet.google.com/xyz"
            className={`w-full p-4 border-2 rounded-2xl outline-none transition-all ${
              errors.meeting_link
                ? "border-red-100 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 text-red-900 dark:text-red-400 focus:border-red-300 dark:focus:border-red-800"
                : "border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-white"
            }`}
            value={meeting_link}
            onChange={(e) => {
              setMeeting_link(e.target.value);
              if (errors.meeting_link)
                setErrors({ ...errors, meeting_link: null });
            }}
          />
          {errors.meeting_link && (
            <p className="text-red-500 dark:text-red-400 text-xs font-bold ml-1">
              {errors.meeting_link}
            </p>
          )}
        </div>

        {/* Country Select */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
            Country *
          </label>
          <select
            className={`w-full p-4 border-2 rounded-2xl outline-none transition-all cursor-pointer ${
              errors.country
                ? "border-red-100 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 text-red-900 dark:text-red-400 focus:border-red-300 dark:focus:border-red-800"
                : "border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-white"
            }`}
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setCity(""); // reset city when country changes
              if (errors.country) setErrors({ ...errors, country: null });
            }}
          >
            <option value="" disabled className="dark:bg-gray-900">Select a Country</option>
            {COUNTRY_LIST.map((c) => (
              <option key={c} value={c} className="dark:bg-gray-900">{c}</option>
            ))}
          </select>
          {errors.country && (
            <p className="text-red-500 dark:text-red-400 text-xs font-bold ml-1">{errors.country}</p>
          )}
        </div>

        {/* City Select */}
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
            City *
          </label>
          <select
            className={`w-full p-4 border-2 rounded-2xl outline-none transition-all cursor-pointer ${
              !country
                ? "border-gray-50 dark:border-gray-800 bg-gray-100 dark:bg-gray-950 text-gray-400 dark:text-gray-700 cursor-not-allowed"
                : errors.city
                ? "border-red-100 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 text-red-900 dark:text-red-400 focus:border-red-300 dark:focus:border-red-800"
                : "border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-white"
            }`}
            value={city}
            disabled={!country}
            onChange={(e) => {
              setCity(e.target.value);
              if (errors.city) setErrors({ ...errors, city: null });
            }}
          >
            <option value="" disabled className="dark:bg-gray-900">
              {country ? "Select a City" : "Select a country first"}
            </option>
            {availableCities.map((c) => (
              <option key={c} value={c} className="dark:bg-gray-900">{c}</option>
            ))}
          </select>
          {errors.city && (
            <p className="text-red-500 dark:text-red-400 text-xs font-bold ml-1">{errors.city}</p>
          )}
        </div>

        {/* Description Input */}
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
            Description *
          </label>
          <textarea
            placeholder="What's your group about? Be detailed (min 100 characters)"
            className={`w-full p-4 border-2 rounded-2xl outline-none transition-all min-h-[150px] resize-none ${
              errors.description
                ? "border-red-100 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 text-red-900 dark:text-red-400 focus:border-red-300 dark:focus:border-red-800"
                : "border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-white"
            }`}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description)
                setErrors({ ...errors, description: null });
            }}
          />
          <div className="flex justify-between items-center px-1">
            {errors.description ? (
              <p className="text-red-500 dark:text-red-400 text-xs font-bold">
                {errors.description}
              </p>
            ) : (
              <div />
            )}
            <span
              className={`text-[10px] font-bold ${(description.length !== 0 && description.length < 100) || description.length > 500 ? "text-red-500 dark:text-red-400" : "text-gray-400 dark:text-gray-500"}`}
            >
              {description.length}/500 (min 100)
            </span>
          </div>
        </div>
      </div>

      <button
        disabled={isPending}
        className="mt-8 w-full cursor-pointer bg-indigo-600 text-white font-black py-4 rounded-2xl hover:bg-indigo-700 disabled:bg-gray-200 dark:disabled:bg-gray-800 dark:disabled:text-gray-600 transition-all shadow-xl shadow-indigo-100 dark:shadow-none hover:shadow-indigo-200 flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            Creating...
          </>
        ) : (
          "Launch Group"
        )}
      </button>
    </form>
  );
}

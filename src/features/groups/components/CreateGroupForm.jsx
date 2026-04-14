import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateGroup } from "../hooks/useCreateGroup";
import { useNavigate } from "react-router-dom";
import { COUNTRIES_CITIES, COUNTRY_LIST } from "../../../lib/countries";
import { groupSchema } from "../../../lib/groupSchema";
import { PLATFORMS, getPlatform } from "../../../lib/platforms";

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
  const { mutate, isPending } = useCreateGroup();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      title: "",
      topic: "",
      platform: "",
      description: "",
      meeting_link: "",
      country: "",
      city: "",
    },
  });

  const selectedCountry = watch("country");
  const selectedPlatform = watch("platform");
  const selectedTitle = watch("title") || "";
  const selectedDescription = watch("description") || "";
  const availableCities = selectedCountry ? COUNTRIES_CITIES[selectedCountry] : [];

  const platformConfig = selectedPlatform ? getPlatform(selectedPlatform) : null;

  useEffect(() => {
    setValue("city", "");
  }, [selectedCountry, setValue]);

  useEffect(() => {
    setValue("meeting_link", "");
  }, [selectedPlatform, setValue]);

  const onSubmit = (data) => {
    mutate(
      {
        ...data,
        date: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          navigate("/");
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-gray-900 w-full mx-auto p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 mb-8"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-black text-gray-900 dark:text-gray-50">Create New Group</h3>
        <p className="text-gray-500 dark:text-gray-400">
          Fill in the details to launch your interest group
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
            Interest *
          </label>
          <select
            {...register("topic")}
            className={`w-full p-4 border-2 rounded-2xl outline-none transition-all cursor-pointer ${
              errors.topic
                ? "border-red-100 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 text-red-900 dark:text-red-400 focus:border-red-300 dark:focus:border-red-800"
                : "border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-white"
            }`}
          >
            <option value="" disabled>
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
              {errors.topic.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
            Title *
          </label>
          <input
            type="text"
            placeholder="e.g. Photography Club"
            {...register("title")}
            className={`w-full p-4 border-2 rounded-2xl outline-none transition-all ${
              errors.title
                ? "border-red-100 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 text-red-900 dark:text-red-400 focus:border-red-300 dark:focus:border-red-800"
                : "border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-white"
            }`}
          />
          <div className="flex justify-between items-center px-1">
            {errors.title ? (
              <p className="text-red-500 dark:text-red-400 text-xs font-bold">{errors.title.message}</p>
            ) : ( 
              <div />
            )}
            <span
              className={`text-[10px] font-bold ${selectedTitle.length > 20 ? "text-red-500 dark:text-red-400" : "text-gray-400 dark:text-gray-500"}`}
            >
              {selectedTitle.length}/20
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
            Platform *
          </label>
          <select
            {...register("platform")}
            className={`w-full p-4 border-2 rounded-2xl outline-none transition-all cursor-pointer ${
              errors.platform
                ? "border-red-100 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 text-red-900 dark:text-red-400 focus:border-red-300 dark:focus:border-red-800"
                : "border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-white"
            }`}
          >
            <option value="" disabled>
              Select a Platform
            </option>
            {PLATFORMS.map((p) => (
              <option key={p.key} value={p.key} className="dark:bg-gray-900">
                {p.label}
              </option>
            ))}
          </select>
          {errors.platform && (
            <p className="text-red-500 dark:text-red-400 text-xs font-bold ml-1">
              {errors.platform.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
            Group Link *
          </label>
          <input
            type="text"
            placeholder={
              platformConfig
                ? platformConfig.placeholder
                : "Select a platform first"
            }
            disabled={!selectedPlatform}
            {...register("meeting_link")}
            className={`w-full p-4 border-2 rounded-2xl outline-none transition-all ${
              !selectedPlatform
                ? "border-gray-50 dark:border-gray-800 bg-gray-100 dark:bg-gray-950 text-gray-400 dark:text-gray-700 cursor-not-allowed"
                : errors.meeting_link
                ? "border-red-100 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 text-red-900 dark:text-red-400 focus:border-red-300 dark:focus:border-red-800"
                : "border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-white"
            }`}
          />
          {errors.meeting_link && (
            <p className="text-red-500 dark:text-red-400 text-xs font-bold ml-1">
              {errors.meeting_link.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
            Country *
          </label>
          <select
            {...register("country")}
            className={`w-full p-4 border-2 rounded-2xl outline-none transition-all cursor-pointer ${
              errors.country
                ? "border-red-100 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 text-red-900 dark:text-red-400 focus:border-red-300 dark:focus:border-red-800"
                : "border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-white"
            }`}
          >
            <option value="" disabled>Select a Country</option>
            {COUNTRY_LIST.map((c) => (
              <option key={c} value={c} className="dark:bg-gray-900">{c}</option>
            ))}
          </select>
          {errors.country && (
            <p className="text-red-500 dark:text-red-400 text-xs font-bold ml-1">{errors.country.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
            City *
          </label>
          <select
            disabled={!selectedCountry}
            {...register("city")}
            className={`w-full p-4 border-2 rounded-2xl outline-none transition-all cursor-pointer ${
              !selectedCountry
                ? "border-gray-50 dark:border-gray-800 bg-gray-100 dark:bg-gray-950 text-gray-400 dark:text-gray-700 cursor-not-allowed"
                : errors.city
                ? "border-red-100 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 text-red-900 dark:text-red-400 focus:border-red-300 dark:focus:border-red-800"
                : "border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-white"
            }`}
          >
            <option value="" disabled>
              {selectedCountry ? "Select a City" : "Select a country first"}
            </option>
            {availableCities.map((c) => (
              <option key={c} value={c} className="dark:bg-gray-900">{c}</option>
            ))}
          </select>
          {errors.city && (
            <p className="text-red-500 dark:text-red-400 text-xs font-bold ml-1">{errors.city.message}</p>
          )}
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
            Description *
          </label>
          <textarea
            placeholder="What's your group about? Be detailed (min 50 characters)"
            {...register("description")}
            className={`w-full p-4 border-2 rounded-2xl outline-none transition-all min-h-[150px] resize-none ${
              errors.description
                ? "border-red-100 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 text-red-900 dark:text-red-400 focus:border-red-300 dark:focus:border-red-800"
                : "border-gray-50 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-900 text-gray-900 dark:text-white"
            }`}
          />
          <div className="flex justify-between items-center px-1">
            {errors.description ? (
              <p className="text-red-500 dark:text-red-400 text-xs font-bold">
                {errors.description.message}
              </p>
            ) : (
              <div />
            )}
            <span
              className={`text-[10px] font-bold ${(selectedDescription.length !== 0 && selectedDescription.length < 50) || selectedDescription.length > 500 ? "text-red-500 dark:text-red-400" : "text-gray-400 dark:text-gray-500"}`}
            >
              {selectedDescription.length}/500 (min 50)
            </span>
          </div>
        </div>
      </div>

      <button
        disabled={isPending}
        type="submit"
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

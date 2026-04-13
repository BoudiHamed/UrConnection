import { Link } from "react-router-dom";
import { useDeleteGroup } from "../hooks/useDeleteGroup";

export default function GroupCard({ group }) {
  const { id, title, description, topic, date, meeting_link, country, city } = group;
  const { mutate: deleteGroup, isPending } = useDeleteGroup();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 hover:shadow-xl dark:hover:shadow-indigo-900/10 transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="flex justify-between items-start mb-6">
        <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest border border-indigo-100 dark:border-indigo-800 line-clamp-2">
          {topic}
        </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (confirm("Are you sure?")) deleteGroup(id);
          }}
          disabled={isPending}
          className="text-gray-300 dark:text-gray-600 text-bold hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-2 py-0.5 cursor-pointer hover:text-red-500 dark:hover:text-red-400 transition-colors "
        >
          {isPending ? "..." : "✕"}
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors  line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-col gap-1 mb-6">
        <span className="flex items-center text-xs text-gray-500 dark:text-gray-400 font-bold">
          📅 {new Date(date).toLocaleDateString()}
        </span>
        {country && (
          <span className="flex items-center text-xs text-gray-500 dark:text-gray-400 font-bold">
            📍 {[city, country].filter(Boolean).join(", ")}
          </span>
        )}
      </div>

      <div className="space-y-3">
        <a
          href={meeting_link}
          target="_blank"
          rel="noreferrer"
          className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-100 dark:shadow-none"
        >
          Connect Now
        </a>

        <Link
          to={`/groups/${id}`}
          className="block w-full text-center text-indigo-600 dark:text-indigo-400 font-bold py-2 hover:scale-120 rounded-xl transition-all"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

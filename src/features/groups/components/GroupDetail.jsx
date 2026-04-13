import { useParams, useNavigate } from 'react-router-dom';
import { useGroup } from '../hooks/useGroup';

export default function GroupDetail() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const { data: group, isLoading, error } = useGroup(groupId);

  if (isLoading) return (
    <div className="flex justify-center p-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 p-4 rounded-lg text-red-700 text-center">
      Error loading group: {error.message}
    </div>
  );

  if (!group) return <div className="text-center p-10 text-gray-500">Group not found.</div>;

  const { title, topic, description, date, meeting_link } = group;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
        {/* Header - Indigo background */}
        <div className="bg-indigo-600 dark:bg-indigo-950 p-8 md:p-12 text-white">
          <button 
            onClick={() => navigate('/')}
            className="mb-8 flex items-center cursor-pointer text-indigo-100 hover:text-white hover:scale-105 transition-all font-medium"
          >
            ← Back to Groups
          </button>
          
          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest border border-white/20">
            {topic}
          </span>
          
          <h1 className="text-4xl md:text-5xl font-black mt-6 leading-tight">
            {title}
          </h1>
          
          <div className="mt-8 flex flex-wrap gap-4 text-indigo-100">
            <div className="flex items-center bg-white/10 px-4 py-2 rounded-xl">
              <span className="mr-2">📅</span>
              {new Date(date).toLocaleDateString(undefined, { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-8 md:p-12">
          <div className="mb-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <span className="w-8 h-8 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center mr-3 text-sm">📝</span>
              Description
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
              {description}
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
              <span className="w-8 h-8 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center mr-3 text-sm">🚀</span>
              Ready to connect?
            </h3>
            
            <a
              href={meeting_link}
              target="_blank"
              rel="noreferrer"
              className="group block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-indigo-100 dark:shadow-none transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center gap-2">
                Join This Group
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </a>
            
            <p className="text-center text-sm text-gray-400">
              Make sure you have the meeting app installed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

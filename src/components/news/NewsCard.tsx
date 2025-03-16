import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';

interface NewsCardProps {
  title: string;
  summary: string;
  source: string;
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
}

export default function NewsCard({
  title,
  summary,
  source,
  date,
  readTime,
  imageUrl,
  tags
}: NewsCardProps) {
  return (
    <div className="card hover:border-gray-700 transition-colors cursor-pointer">
      <div className="flex gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
          <p className="text-text-gray text-sm mb-3 line-clamp-2">{summary}</p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="bg-gray-800 text-text-gray text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center text-text-gray text-xs">
            <span className="font-medium text-white">{source}</span>
            <span className="mx-2">•</span>
            <CalendarIcon className="h-3 w-3 mr-1" />
            <span>{date}</span>
            <span className="mx-2">•</span>
            <ClockIcon className="h-3 w-3 mr-1" />
            <span>{readTime}</span>
          </div>
        </div>
        
        <div className="w-24 h-24 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0">
          <div className="w-full h-full bg-gray-700 flex items-center justify-center text-xs text-text-gray">
            Image
          </div>
        </div>
      </div>
    </div>
  );
} 
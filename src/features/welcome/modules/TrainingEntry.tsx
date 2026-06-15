import React from 'react';
import { GraduationCap, ExternalLink, Play } from 'lucide-react';
import { WelcomePageModule } from '@/configs/types';

interface TrainingEntryProps {
  module: WelcomePageModule;
}

const TrainingEntry: React.FC<TrainingEntryProps> = ({ module }) => {
  const courses = module.props?.courses || [
    { id: 't1', name: '新员工入职培训', category: '必修', duration: '2小时', enrolled: true },
    { id: 't2', name: '产品功能实操', category: '选修', duration: '1.5小时', enrolled: false },
    { id: 't3', name: '安全合规培训', category: '必修', duration: '45分钟', enrolled: false },
  ];

  const categoryStyle = (cat: string) => {
    if (cat === '必修') return 'bg-red-50 text-red-600';
    return 'bg-blue-50 text-blue-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <GraduationCap size={20} className="text-[var(--primary-color)]" />
          <h2 className="text-lg font-semibold text-gray-900">{module.title}</h2>
        </div>
        {module.link && (
          <a
            href={module.link}
            className="flex items-center gap-1 text-sm text-[var(--primary-color)] hover:underline"
          >
            培训中心 <ExternalLink size={14} />
          </a>
        )}
      </div>

      <div className="space-y-3">
        {courses.map((course: any) => (
          <div
            key={course.id}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--primary-color)]/10 rounded-lg flex items-center justify-center">
                <Play size={18} className="text-[var(--primary-color)]" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{course.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs px-1.5 py-0.5 rounded ${categoryStyle(course.category)}`}>
                    {course.category}
                  </span>
                  <span className="text-xs text-gray-400">{course.duration}</span>
                </div>
              </div>
            </div>
            {course.enrolled ? (
              <span className="text-xs text-green-600 font-medium">已报名</span>
            ) : (
              <button className="px-3 py-1 text-xs bg-[var(--primary-color)] text-white rounded-md hover:opacity-90 transition-opacity">
                报名
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingEntry;

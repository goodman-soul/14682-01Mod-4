import React from 'react';
import { CheckCircle2, Circle, Clock, ExternalLink } from 'lucide-react';
import { WelcomePageModule } from '@/configs/types';

interface ProjectProgressProps {
  module: WelcomePageModule;
}

const ProjectProgress: React.FC<ProjectProgressProps> = ({ module }) => {
  const projects = module.props?.projects || [
    { name: '系统架构升级', progress: 85, status: 'in-progress', deadline: '2026-07-15' },
    { name: '数据迁移', progress: 100, status: 'completed', deadline: '2026-05-30' },
    { name: '安全审计', progress: 42, status: 'in-progress', deadline: '2026-08-01' },
    { name: 'API 网关重构', progress: 10, status: 'in-progress', deadline: '2026-09-10' },
  ];

  const statusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle2 size={16} className="text-green-500" />;
    return <Clock size={16} className="text-amber-500" />;
  };

  const statusLabel = (status: string) => {
    if (status === 'completed') return '已完成';
    return '进行中';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-semibold text-gray-900">{module.title}</h2>
        {module.link && (
          <a
            href={module.link}
            className="flex items-center gap-1 text-sm text-[var(--primary-color)] hover:underline"
          >
            查看全部 <ExternalLink size={14} />
          </a>
        )}
      </div>

      <div className="space-y-4">
        {projects.map((project: any, idx: number) => (
          <div key={idx} className="group">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                {statusIcon(project.status)}
                <span className="text-sm font-medium text-gray-800">{project.name}</span>
              </div>
              <span className="text-xs text-gray-500">
                {project.status === 'completed' ? '✓ ' : `截止 ${project.deadline}`}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    project.status === 'completed' ? 'bg-green-500' : 'bg-[var(--primary-color)]'
                  }`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-600 w-10 text-right">
                {project.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectProgress;

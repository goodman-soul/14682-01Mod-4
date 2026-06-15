import React from 'react';
import { Megaphone, Phone, ExternalLink, AlertTriangle, Info } from 'lucide-react';
import { WelcomePageModule } from '@/configs/types';

interface AnnouncementsHotlineProps {
  module: WelcomePageModule;
}

const AnnouncementsHotline: React.FC<AnnouncementsHotlineProps> = ({ module }) => {
  const isAnnouncements = module.type === 'announcements';
  const announcements = module.props?.announcements || [
    { id: 'a1', title: '系统维护通知：6月20日凌晨2:00-4:00', level: 'warning', date: '2026-06-12' },
    { id: 'a2', title: '新版功能已上线：审批流程优化', level: 'info', date: '2026-06-10' },
    { id: 'a3', title: '端午节放假安排：6月28日-30日', level: 'info', date: '2026-06-08' },
  ];

  const hotlines = module.props?.hotlines || [
    { id: 'h1', name: '技术支持', number: '400-888-0001', available: '7×24' },
    { id: 'h2', name: '业务咨询', number: '400-888-0002', available: '工作日 9:00-18:00' },
    { id: 'h3', name: '紧急热线', number: '400-888-9999', available: '7×24' },
  ];

  const levelIcon = (level: string) => {
    if (level === 'warning') return <AlertTriangle size={16} className="text-amber-500" />;
    return <Info size={16} className="text-blue-500" />;
  };

  if (isAnnouncements) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Megaphone size={20} className="text-[var(--primary-color)]" />
            <h2 className="text-lg font-semibold text-gray-900">{module.title}</h2>
          </div>
          {module.link && (
            <a
              href={module.link}
              className="flex items-center gap-1 text-sm text-[var(--primary-color)] hover:underline"
            >
              更多公告 <ExternalLink size={14} />
            </a>
          )}
        </div>

        <div className="space-y-3">
          {announcements.map((item: any) => (
            <div
              key={item.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="mt-0.5">{levelIcon(item.level)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 leading-snug">{item.title}</p>
                <p className="text-xs text-gray-400 mt-1">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Phone size={20} className="text-[var(--primary-color)]" />
          <h2 className="text-lg font-semibold text-gray-900">{module.title}</h2>
        </div>
        {module.link && (
          <a
            href={module.link}
            className="flex items-center gap-1 text-sm text-[var(--primary-color)] hover:underline"
          >
            联系我们 <ExternalLink size={14} />
          </a>
        )}
      </div>

      <div className="space-y-3">
        {hotlines.map((line: any) => (
          <div
            key={line.id}
            className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-gray-800">{line.name}</p>
              <p className="text-xs text-gray-400">{line.available}</p>
            </div>
            <a
              href={`tel:${line.number}`}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-700 rounded-md text-sm font-medium hover:bg-green-100 transition-colors"
            >
              <Phone size={14} />
              {line.number}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementsHotline;

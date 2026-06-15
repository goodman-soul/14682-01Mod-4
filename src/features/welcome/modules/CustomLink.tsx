import React from 'react';
import { Link2, ExternalLink } from 'lucide-react';
import { WelcomePageModule } from '@/configs/types';

interface CustomLinkProps {
  module: WelcomePageModule;
}

const CustomLink: React.FC<CustomLinkProps> = ({ module }) => {
  const links = module.props?.links || [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Link2 size={20} className="text-[var(--primary-color)]" />
          <h2 className="text-lg font-semibold text-gray-900">{module.title}</h2>
        </div>
      </div>

      {links.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {links.map((link: any, idx: number) => (
            <a
              key={idx}
              href={link.url}
              className="flex items-center gap-2 p-3 rounded-lg border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all text-sm text-gray-700 hover:text-[var(--primary-color)]"
            >
              <ExternalLink size={14} />
              <span className="font-medium">{link.label}</span>
            </a>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-sm text-gray-400">暂无快捷链接</div>
      )}
    </div>
  );
};

export default CustomLink;

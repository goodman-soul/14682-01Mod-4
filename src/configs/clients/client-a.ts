import { ClientConfig } from '../types';

export const config: ClientConfig = {
  id: 'client-a',
  name: '企业客户 A',
  features: {
    enableAnalytics: true,
    enableSocialSharing: false,
    enableAdvancedSearch: true,
  },
  modules: ['dashboard', 'reports'],
  theme: {
    primaryColor: '#3b82f6',
    secondaryColor: '#1e40af',
    logoUrl: '/logos/client-a.png',
    borderRadius: '0.5rem',
  },
  welcomePage: {
    modules: [
      {
        id: 'a-progress',
        type: 'project-progress',
        title: '项目进度总览',
        order: 1,
        visible: true,
        link: '/reports',
        props: {
          projects: [
            { name: '系统架构升级', progress: 85, status: 'in-progress', deadline: '2026-07-15' },
            { name: '数据迁移', progress: 100, status: 'completed', deadline: '2026-05-30' },
            { name: '安全审计', progress: 42, status: 'in-progress', deadline: '2026-08-01' },
            { name: 'API 网关重构', progress: 10, status: 'in-progress', deadline: '2026-09-10' },
          ],
        },
      },
      {
        id: 'a-announce',
        type: 'announcements',
        title: '重要公告',
        order: 2,
        visible: true,
        link: '/dashboard',
        props: {
          announcements: [
            { id: 'a1', title: '系统维护通知：6月20日凌晨2:00-4:00', level: 'warning', date: '2026-06-12' },
            { id: 'a2', title: '新版功能已上线：审批流程优化', level: 'info', date: '2026-06-10' },
          ],
        },
      },
    ],
  },
};

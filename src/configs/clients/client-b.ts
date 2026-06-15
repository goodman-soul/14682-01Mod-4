import { ClientConfig } from '../types';

export const config: ClientConfig = {
  id: 'client-b',
  name: '企业客户 B',
  features: {
    enableAnalytics: false,
    enableSocialSharing: true,
    enableAdvancedSearch: false,
  },
  modules: ['dashboard', 'social-feed'],
  theme: {
    primaryColor: '#10b981',
    secondaryColor: '#065f46',
    logoUrl: '/logos/client-b.png',
    borderRadius: '0.25rem',
  },
  welcomePage: {
    modules: [
      {
        id: 'b-training',
        type: 'training-entry',
        title: '培训中心',
        order: 1,
        visible: true,
        link: '/social-feed',
        props: {
          courses: [
            { id: 't1', name: '新员工入职培训', category: '必修', duration: '2小时', enrolled: true },
            { id: 't2', name: '产品功能实操', category: '选修', duration: '1.5小时', enrolled: false },
            { id: 't3', name: '安全合规培训', category: '必修', duration: '45分钟', enrolled: false },
          ],
        },
      },
      {
        id: 'b-progress',
        type: 'project-progress',
        title: '我的学习进度',
        order: 2,
        visible: true,
        props: {
          projects: [
            { name: '入职培训', progress: 70, status: 'in-progress', deadline: '2026-07-01' },
            { name: '安全合规', progress: 30, status: 'in-progress', deadline: '2026-08-15' },
          ],
        },
      },
    ],
  },
};

import { ClientConfig } from '../types';

export const config: ClientConfig = {
  id: 'client-c',
  name: '企业客户 C',
  features: {
    enableAnalytics: true,
    enableSocialSharing: false,
    enableAdvancedSearch: false,
  },
  modules: ['dashboard'],
  theme: {
    primaryColor: '#8b5cf6',
    secondaryColor: '#5b21b6',
    logoUrl: '/logos/client-c.png',
    borderRadius: '0.375rem',
  },
  welcomePage: {
    modules: [
      {
        id: 'c-announce',
        type: 'announcements',
        title: '企业公告',
        order: 1,
        visible: true,
        link: '/dashboard',
        props: {
          announcements: [
            { id: 'c1', title: '端午节放假通知：6月28日-30日', level: 'info', date: '2026-06-08' },
            { id: 'c2', title: '办公室搬迁：7月1日启用新址', level: 'warning', date: '2026-06-05' },
            { id: 'c3', title: '年度体检安排：7月15日起', level: 'info', date: '2026-06-01' },
          ],
        },
      },
      {
        id: 'c-hotline',
        type: 'hotline',
        title: '服务热线',
        order: 2,
        visible: true,
        link: '/dashboard',
        props: {
          hotlines: [
            { id: 'h1', name: '技术支持', number: '400-888-0001', available: '7×24' },
            { id: 'h2', name: '业务咨询', number: '400-888-0002', available: '工作日 9:00-18:00' },
            { id: 'h3', name: '紧急热线', number: '400-888-9999', available: '7×24' },
          ],
        },
      },
      {
        id: 'c-links',
        type: 'custom-link',
        title: '常用快捷入口',
        order: 3,
        visible: true,
        props: {
          links: [
            { label: 'OA 系统', url: 'https://oa.example.com' },
            { label: 'HR 自助', url: 'https://hr.example.com' },
            { label: 'IT 服务台', url: 'https://it.example.com' },
            { label: '知识库', url: 'https://wiki.example.com' },
          ],
        },
      },
    ],
  },
};

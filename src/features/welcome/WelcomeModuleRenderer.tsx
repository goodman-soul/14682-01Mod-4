import React from 'react';
import { WelcomePageModule, WelcomeModuleError, WelcomeModuleType } from '@/configs/types';
import ProjectProgress from './modules/ProjectProgress';
import TrainingEntry from './modules/TrainingEntry';
import AnnouncementsHotline from './modules/AnnouncementsHotline';
import CustomLink from './modules/CustomLink';

const MODULE_TYPES: WelcomeModuleType[] = [
  'project-progress',
  'training-entry',
  'announcements',
  'hotline',
  'custom-link',
];

export function validateWelcomeConfig(modules: WelcomePageModule[]): WelcomeModuleError[] {
  const errors: WelcomeModuleError[] = [];

  if (!modules || modules.length === 0) {
    errors.push({
      moduleId: '__root__',
      moduleTitle: '欢迎页配置',
      field: 'modules',
      message: '欢迎页模块列表为空，至少需要配置一个模块',
    });
    return errors;
  }

  const idSet = new Set<string>();
  const orderSet = new Set<number>();

  modules.forEach((mod) => {
    if (!mod.id || mod.id.trim() === '') {
      errors.push({
        moduleId: mod.id || '__missing__',
        moduleTitle: mod.title || '(无标题)',
        field: 'id',
        message: '模块 id 不能为空',
      });
    } else if (idSet.has(mod.id)) {
      errors.push({
        moduleId: mod.id,
        moduleTitle: mod.title,
        field: 'id',
        message: `模块 id "${mod.id}" 重复，每个模块 id 必须唯一`,
      });
    } else {
      idSet.add(mod.id);
    }

    if (!mod.title || mod.title.trim() === '') {
      errors.push({
        moduleId: mod.id,
        moduleTitle: mod.title || '(无标题)',
        field: 'title',
        message: '模块标题不能为空',
      });
    }

    if (!MODULE_TYPES.includes(mod.type)) {
      errors.push({
        moduleId: mod.id,
        moduleTitle: mod.title,
        field: 'type',
        message: `未知的模块类型 "${mod.type}"，可选值：${MODULE_TYPES.join(', ')}`,
      });
    }

    if (typeof mod.order !== 'number' || mod.order < 0) {
      errors.push({
        moduleId: mod.id,
        moduleTitle: mod.title,
        field: 'order',
        message: '模块排序值必须为非负数字',
      });
    } else if (orderSet.has(mod.order)) {
      errors.push({
        moduleId: mod.id,
        moduleTitle: mod.title,
        field: 'order',
        message: `排序值 ${mod.order} 与其他模块重复，建议使用不重复的值`,
      });
    } else {
      orderSet.add(mod.order);
    }

    if (mod.link !== undefined && mod.link !== '') {
      try {
        new URL(mod.link);
      } catch {
        if (!mod.link.startsWith('/')) {
          errors.push({
            moduleId: mod.id,
            moduleTitle: mod.title,
            field: 'link',
            message: `跳转链接 "${mod.link}" 不是有效的 URL 或路径（需以 http(s):// 或 / 开头）`,
          });
        }
      }
    }
  });

  return errors;
}

const moduleRenderer: Record<WelcomeModuleType, React.FC<{ module: WelcomePageModule }> | null> = {
  'project-progress': ProjectProgress,
  'training-entry': TrainingEntry,
  announcements: AnnouncementsHotline,
  hotline: AnnouncementsHotline,
  'custom-link': CustomLink,
};

interface WelcomeModuleRendererProps {
  module: WelcomePageModule;
  error?: WelcomeModuleError;
}

const WelcomeModuleRenderer: React.FC<WelcomeModuleRendererProps> = ({ module, error }) => {
  const Component = moduleRenderer[module.type];

  if (!Component) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700 text-sm font-medium">
          ⚠ 无法渲染模块「{module.title}」：未注册的模块类型 "{module.type}"
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative">
        <div className="absolute -top-2 -left-2 z-10 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full shadow">
          配置错误
        </div>
        <div className="ring-2 ring-red-400 ring-offset-2 rounded-lg overflow-hidden">
          <Component module={module} />
        </div>
        <div className="mt-2 bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-red-700 text-xs font-medium">
            模块「{error.moduleTitle}」字段 {error.field} 错误：{error.message}
          </p>
        </div>
      </div>
    );
  }

  return <Component module={module} />;
};

export default WelcomeModuleRenderer;

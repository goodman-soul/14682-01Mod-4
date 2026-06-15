import React, { useMemo, useState } from 'react';
import { currentConfig } from '@/configs';
import { WelcomeModuleError } from '@/configs/types';
import WelcomeModuleRenderer, { validateWelcomeConfig } from './WelcomeModuleRenderer';

const WelcomePage: React.FC = () => {
  const [showPreview, setShowPreview] = useState(false);

  const sortedModules = useMemo(() => {
    return [...currentConfig.welcomePage.modules]
      .filter((m) => m.visible)
      .sort((a, b) => a.order - b.order);
  }, []);

  const allModules = useMemo(() => {
    return [...currentConfig.welcomePage.modules].sort((a, b) => a.order - b.order);
  }, []);

  const errors = useMemo(() => validateWelcomeConfig(allModules), [allModules]);

  const errorMap = useMemo(() => {
    const map = new Map<string, WelcomeModuleError>();
    errors.forEach((e) => map.set(e.moduleId, e));
    return map;
  }, [errors]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">欢迎页</h1>
          <p className="text-gray-500 mt-1">{currentConfig.name} · 专属欢迎页</p>
        </div>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className={`px-4 py-2 text-sm rounded-lg transition-colors ${
            showPreview
              ? 'bg-red-50 text-red-600 hover:bg-red-100'
              : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
        >
          {showPreview ? '关闭预览' : '配置预览'}
        </button>
      </div>

      {errors.length > 0 && !showPreview && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-amber-800 text-sm font-medium mb-2">
            ⚠ 检测到 {errors.length} 项配置问题，点击「配置预览」查看详情
          </p>
          <ul className="space-y-1">
            {errors.map((e, i) => (
              <li key={i} className="text-xs text-amber-700">
                模块「{e.moduleTitle}」· {e.field}：{e.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showPreview && errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-5">
          <h3 className="text-red-800 font-semibold mb-3">配置校验报告</h3>
          <p className="text-red-700 text-sm mb-4">
            共 {errors.length} 项错误，问题模块已用红色边框标注：
          </p>
          <div className="space-y-2">
            {errors.map((e, i) => (
              <div
                key={i}
                className="flex items-start gap-2 bg-white rounded-md p-3 border border-red-100"
              >
                <span className="shrink-0 mt-0.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    模块「{e.moduleTitle}」
                  </p>
                  <p className="text-xs text-red-600 mt-0.5">
                    字段 <code className="bg-red-100 px-1 rounded">{e.field}</code>：{e.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showPreview ? (
        <div className="space-y-6">
          {allModules.map((mod) => (
            <WelcomeModuleRenderer
              key={mod.id}
              module={mod}
              error={errorMap.get(mod.id)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {sortedModules.length > 0 ? (
            sortedModules.map((mod) => (
              <WelcomeModuleRenderer key={mod.id} module={mod} />
            ))
          ) : (
            <div className="text-center py-16 text-gray-400">
              暂无可见的欢迎页模块
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WelcomePage;

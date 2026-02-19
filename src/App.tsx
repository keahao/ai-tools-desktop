import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Zap } from 'lucide-react';
import { useStore } from './store/useStore';
import ToolsGrid from './components/ToolsGrid';
import Workspace from './components/Workspace';
import SettingsModal from './components/SettingsModal';
import { tools } from './utils/tools';

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const { currentTool, config } = useStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              AI Tools Hub
            </h1>
            <p className="text-sm text-slate-400">9款专业AI工具 · 一站式智能解决方案</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowSettings(true)}
          className="p-3 rounded-xl bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50 transition-all"
        >
          <Settings className="w-5 h-5 text-indigo-400" />
        </button>
      </header>

      {/* Warning if no API key */}
      {!config && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-6 mb-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm"
        >
          ⚠️ 请先配置 API Key。
          <button
            onClick={() => setShowSettings(true)}
            className="ml-2 underline hover:text-amber-100"
          >
            前往设置
          </button>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {!currentTool ? (
            <ToolsGrid key="grid" tools={tools} />
          ) : (
            <Workspace key="workspace" tool={currentTool} />
          )}
        </AnimatePresence>
      </main>

      {/* Settings Modal */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
}

export default App;

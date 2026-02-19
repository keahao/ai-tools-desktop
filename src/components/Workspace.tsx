import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Tool } from '../types';

interface Props {
  tool: Tool;
}

export default function Workspace({ tool }: Props) {
  const { setCurrentTool } = useStore();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setOutput('✨ 正在生成...');

    // TODO: 调用 API
    setTimeout(() => {
      setOutput(`这是 ${tool.name} 的生成结果...\n\n您输入的内容：${input}`);
      setLoading(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <button
        onClick={() => setCurrentTool(null)}
        className="flex items-center gap-2 px-4 py-2 mb-6 rounded-xl bg-slate-800/50 border border-slate-700 hover:bg-slate-700/50 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>返回</span>
      </button>

      <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
        <div className="flex items-center gap-4 mb-6">
          <div 
            className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl"
            style={{ 
              background: `linear-gradient(135deg, ${tool.color}22, ${tool.color}11)`,
              borderColor: `${tool.color}44`,
              borderWidth: 1
            }}
          >
            {tool.icon}
          </div>
          <h2 className="text-2xl font-bold">{tool.name}</h2>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="描述您的需求，AI 将为您生成专业内容..."
          className="w-full h-40 p-4 bg-slate-900/50 border border-slate-700 rounded-xl resize-none focus:outline-none focus:border-indigo-500 transition-colors"
        />

        <button
          onClick={handleGenerate}
          disabled={loading || !input.trim()}
          className="mt-4 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              生成中...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              生成内容
            </>
          )}
        </button>

        {output && (
          <div className="mt-6 p-6 bg-slate-900/50 border border-slate-700 rounded-xl whitespace-pre-wrap">
            {output}
          </div>
        )}
      </div>
    </motion.div>
  );
}

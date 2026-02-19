import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';
import { Tool } from '../types';

interface Props {
  tools: Tool[];
}

export default function ToolsGrid({ tools }: Props) {
  const { setCurrentTool, config } = useStore();

  const handleClick = (tool: Tool) => {
    if (!config) return;
    setCurrentTool(tool);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool, index) => (
        <motion.div
          key={tool.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.02, y: -5 }}
          onClick={() => handleClick(tool)}
          className="cursor-pointer group"
        >
          <div className="relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 p-6 transition-all group-hover:border-indigo-500/50 group-hover:shadow-xl group-hover:shadow-indigo-500/10">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4 transition-transform group-hover:scale-110"
              style={{ 
                background: `linear-gradient(135deg, ${tool.color}22, ${tool.color}11)`,
                borderColor: `${tool.color}44`,
                borderWidth: 1
              }}
            >
              {tool.icon}
            </div>
            
            <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
            <p className="text-sm text-slate-400">{tool.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

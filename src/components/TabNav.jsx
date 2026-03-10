import { motion, useTransform } from 'framer-motion';

const tabs = [
    { id: 'about', label: 'About', bg: 'bg-tab-teal', hover: 'hover:brightness-110' },
    { id: 'skills', label: 'Skills', bg: 'bg-tab-blue', hover: 'hover:brightness-110' },
    { id: 'projects', label: 'Projects', bg: 'bg-tab-red', hover: 'hover:brightness-110' },
    { id: 'contact', label: 'Contact', bg: 'bg-tab-yellow', hover: 'hover:brightness-110' },
];

export default function TabNav({ activeTab, onTabChange, paperY }) {
    const negatedPaperY = useTransform(paperY, (y) => -y);

    return (
        <nav className="flex gap-1 sm:gap-1.5 pointer-events-none">
            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <motion.button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        style={{ y: isActive ? 0 : negatedPaperY, minWidth: '3.5rem' }}
                        className={`
                            px-3 sm:px-6 md:px-10
                            py-2 sm:py-3 md:py-3.5
                            rounded-t-xl
                            font-[family-name:var(--font-handwritten)]
                            text-white text-[0.6rem] sm:text-xs md:text-sm
                            uppercase tracking-wider
                            cursor-pointer select-none
                            pointer-events-auto
                            ${tab.bg} ${tab.hover}
                            ${isActive
                                ? 'shadow-lg brightness-110 relative pb-3 sm:pb-4 md:pb-5'
                                : 'shadow-md opacity-85 hover:opacity-100'
                            }
                        `}
                        whileHover={{ y: isActive ? -2 : undefined }}
                        whileTap={{ scale: 0.96 }}
                    >
                        {tab.label}
                    </motion.button>
                );
            })}
        </nav>
    );
}
import FolderLayout from './components/FolderLayout';
import MobileLayout from './components/MobileLayout';
import useIsMobile from './hooks/useIsMobile';
import './App.css';

function App() {
    const isMobile = useIsMobile();

    if (isMobile) {
        return (
            <div className="min-h-screen w-full bg-charcoal overflow-x-hidden">
                <MobileLayout />
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start lg:justify-center pt-4 sm:pt-6 md:pt-6 lg:pt-12 px-4 sm:px-8 md:px-12 pb-0 overflow-x-hidden bg-charcoal">
            <FolderLayout />
        </div>
    );
}

export default App;

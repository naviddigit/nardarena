import { useState } from 'react';
import ButtonDemo from '@features/demo/pages/ButtonDemo';
import InputDemo from '@features/demo/pages/InputDemo';
import AvatarDemo from '@features/demo/pages/AvatarDemo';
import BadgeDemo from '@features/demo/pages/BadgeDemo';
import SpinnerDemo from '@features/demo/pages/SpinnerDemo';
import DividerDemo from '@features/demo/pages/DividerDemo';
import CardDemo from '@features/demo/pages/CardDemo';
import { DemoNav } from '@features/demo/components/DemoNav';
import { DebugPanel } from '@shared/components/organisms/DebugPanel';

function App() {
  const [currentDemo, setCurrentDemo] = useState('card');

  const renderDemo = () => {
    switch (currentDemo) {
      case 'button':
        return <ButtonDemo />;
      case 'input':
        return <InputDemo />;
      case 'avatar':
        return <AvatarDemo />;
      case 'badge':
        return <BadgeDemo />;
      case 'spinner':
        return <SpinnerDemo />;
      case 'divider':
        return <DividerDemo />;
      case 'card':
        return <CardDemo />;
      default:
        return <SpinnerDemo />;
    }
  };

  return (
    <>
      <DemoNav currentDemo={currentDemo} onNavigate={setCurrentDemo} />
      {renderDemo()}
      <DebugPanel />
    </>
  );
}

export default App;
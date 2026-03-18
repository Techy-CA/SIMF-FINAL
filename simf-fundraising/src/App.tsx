// App.tsx
import CampaignPage from './pages/CampaignPage';

export default function App() {
  return <CampaignPage onBack={function (): void {
    throw new Error('Function not implemented.');
  } } />;
}

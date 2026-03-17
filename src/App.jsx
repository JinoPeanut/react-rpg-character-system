import DerivedStatsPanel from "./features/characters/components/DerivedStatsPanel";
import JobPanel from "./features/characters/components/JobPanel";
import LevelPanel from "./features/characters/components/LevelPanel";
import StatPanel from "./features/characters/components/StatPanel";
import EquipmentPanel from "./features/characters/components/EquipmentPanel";
import InventoryPanel from "./features/characters/components/InventoryPanel"
function App() {


  return (
    <div>
      <h1>Character build</h1>
      <LevelPanel />
      <StatPanel />
      <DerivedStatsPanel />
      <JobPanel />
      <InventoryPanel />
      <EquipmentPanel />
    </div>
  )
}

export default App


/* 
  components: 공용 UI
  data: 캐릭터 기본스탯
  features: 기능 단위
  store: 전역 상태
  hooks: 커스텀 훅
  api: 서버 요청
  pages: 페이지
*/
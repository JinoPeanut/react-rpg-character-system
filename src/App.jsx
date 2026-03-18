import EquipmentPanel from "./features/characters/components/EquipmentPanel";
import TabMenu from "./features/layout/TabMenu"
function App() {


  return (
    <div>
      <h1>Character build</h1>
      <TabMenu />
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
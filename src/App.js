import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CreateGroup from "./components/CreateGroup";
import AddMembers from "./components/AddMembers";
import {RecoilRoot} from "recoil";
import ExpenseMain from "./components/ExpenseMain";
import 'bootstrap/dist/css/bootstrap.min.css';
import {ROUTERS} from "./Router"
function App() {
  return (
    <BrowserRouter>
    <RecoilRoot>
      <Routes>
        <Route path = "/" element={<Navigate to={ROUTERS.CREATE_GROUP}/>}/>
        <Route path = {ROUTERS.CREATE_GROUP} element={<CreateGroup />} />
        <Route path={ROUTERS.ADD_MEMBERS} element={<AddMembers />} />
        <Route path={ROUTERS.EXPENSE_MAIN} element={<ExpenseMain />} />
      </Routes>
    </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;

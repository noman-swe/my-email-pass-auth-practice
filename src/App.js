import { Route, Routes } from 'react-router-dom';
import './App.css';
// import RegForm from './components/RegForm/RegForm';
import SignInOptions from './components/SignInOptions/SignInOptions';
import RegForm from './components/RegForm/RegForm';
import Main from './components/Main/Main';

function App() {
  return (
    <div className="">
      <Routes>
        <Route path={'/'} element={<SignInOptions></SignInOptions>}></Route>
        <Route path={'/emailPassword'} element={<RegForm></RegForm>}>Email Password</Route>
        <Route path={'/main'} element={<Main></Main>}></Route>

      </Routes>
    </div>
  );
}

export default App;

import './App.scss';
import NotePage from './pages/NotePage';
import NotesListPage from './pages/NotesListPage';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'; //HashRouter for github pages

function App() {
  return (
    <HashRouter>
      <div className="container">
        <div className='app'>
          <h1 className='app__header'>Notes App</h1>
          <Routes>
            <Route path="/" element={<NotesListPage></NotesListPage>}></Route>
            <Route path="/note/:id" element={<NotePage></NotePage>}></Route>
          </Routes>
        </div>
      </div>
    </HashRouter >
  );
}

export default App;

import { NativeRouter, Routes, Route} from 'react-router-native';
import { HomePage } from './components/pages/HomePage';
import { AddBookPage } from './components/pages/AddBookPage';
import { DetailsModal } from './components/pages/DetailsModal';

export default function App() {
  return <NativeRouter>
    <Routes>
      <Route path= '/' element= {<HomePage/>}/>
      <Route path= '/add' element= {<AddBookPage/>}/>
      <Route path= '/edit/:id' element= {<DetailsModal/>}/>
    </Routes>
  </NativeRouter>
}

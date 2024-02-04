import { NativeRouter, Routes, Route} from 'react-router-native';
import { HomePage } from './components/pages/HomePage';
import { Text } from 'react-native';

export default function App() {
  return <NativeRouter>
    <Routes>
      <Route path= '/' element= {<HomePage/>}/>
    </Routes>
  </NativeRouter>
}

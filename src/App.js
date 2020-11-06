import "./App.css";
// import Form from "../src/components/Form/Form"
// import Button from "../src/components/Button/Button"
import Ui from "../src/components/ui/ui";
import Fileupload from "../src/components/Fileupload/Fileupload";
// import DnD from '../src/components/DnD/DnD'
import store from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Provider store={store}>
          <Ui />
        </Provider>
      </div>
    </div>
  );
}

export default App;

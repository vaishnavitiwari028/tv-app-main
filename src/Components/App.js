import VideosProvider, { CustomizationProvider } from "../context";
import Footer from "./Footer";
import "./globalStyles.css";
import Sidebarcontroller from "./Sidebarcontroller";
import TV from "./TV";
import VideoList from "./VideoList";

const App = () => {
  return (
    <VideosProvider>
      <CustomizationProvider>
        <Sidebarcontroller />
        <TV />
      </CustomizationProvider>
      <VideoList />
      <Footer />
    </VideosProvider>
  );
};

export default App;

import {Header,Profile,Cards,Footer} from './components';
import { useRef } from "react";

function App() {
  const cardRef = useRef(null);

  const handleNewPost = (newPost) => {
    if(cardRef.current)(
      cardRef.current.handleNewPost(newPost)
    )
  }
  return (
      <div>
        <Header />
        <Profile  onNewPost={handleNewPost}/>
        <Cards  ref={cardRef}/>
        <Footer />
      </div>
  );
}

export default App;

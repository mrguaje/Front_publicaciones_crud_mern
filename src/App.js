import { HomePage, PostForm, NotFound } from "./pages"
import { Bin } from "./pages/Bin.js"
import { QueSoy } from "./pages/QueSoy"
import {Routes, Route} from 'react-router-dom'
import { PostProvider } from "./context/postContext"
import {Toaster} from 'react-hot-toast'


function App() {
  return (
    <div className='bg-zinc-100 min-h-screen flex items-center'>
     <div className='px-10 container m-auto'>
        <PostProvider>
          <Routes>
            <Route path='/' element={<HomePage/>} />
            <Route path='/new' element={<PostForm/>} />
            <Route path='/:id' element={<PostForm/>} />
            <Route path='*' element={<NotFound/>} />
            <Route path='quesoy' element={<QueSoy/>} />
            <Route path='bin' element={<Bin/>} />
            </Routes>
            <Toaster />
        </PostProvider>
      </div>
    </div>
  )
}

export default App
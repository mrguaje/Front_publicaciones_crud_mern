import toast from "react-hot-toast";
import { usePosts } from "../context/postContext";


export function PostCard({ post }) {
const { deletePost, updatePost } = usePosts();


  const HandleDelete = (id) => {
    toast(
      (t) => (
        <div>
          <p className="text-white">
            Quieres eliminar la publicacion <strong>{id}</strong>?
          </p>
          <div>
            <button
              className="bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-sm mx-2"
              onClick={(e) => {
                if (post.state==="a") {
                  post.state="i";
                  console.log(post.state);
                      updatePost(id, post); 
                      console.log(post.state)
                    }  
                     else if (post.state==="i") {
                      deletePost(id);
                    } 
                    toast.dismiss(t.id);
                    window.location.reload();
              }
            } 
          >
              Eliminar
              
            </button>
            <button
              className="bg-slate-400 hover:bg-slate-500 px-3 py-2 text-white rounded-sm mx-2"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        duration: "4000",
        style: {
          background: "#202020"
        }
      }
    );
  };
  return (
    <div
      className="bg-slate-200 text-slate-500 rounded-md shadow-md shadow-zinc-400 hover:bg-slate-200 hover:cursor-pointer"
      //onClick={() => navigate(`/${post._id}`)}
    >
      <div className="px-4 py-7">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-semibold">{post.title}</h3>
          <button
            className="bg-rose-700 text-white text-sm px-2 py-1 rounded-sm"
            onClick={(e) => {
              e.stopPropagation();
              HandleDelete(post._id);
            }}
          >
            Eliminar
          </button>
        </div>
        <p className="text-gray-400">{post.description}</p>
      </div>
      {post.image && <img src={post.image.url} alt={post.title} />}
    </div>
  );
}
import { usePosts } from "../context/postContext";
import { Link } from "react-router-dom";
import { PostCard } from "../components/PostCard";
import { VscEmptyWindow } from "react-icons/vsc";

export function Bin() {
  const { posts } = usePosts();

  const renderBin = () => {

    console.log(posts)
    console.log(posts.length)
    if (posts.length === 0)
      return (
        <div className="flex flex-col justify-center items-center bg-zinc-100">
          <VscEmptyWindow className="w-48 h-48 text-white" />
          <h1 className="text-white text-2xl"> No hay publicaciones </h1>
        </div>
      );

    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 bg-zinc-100">


{
  posts.map(function(post) {
    console.log(post.state);
    if (post.state==="i") {
      return <PostCard key={post._id} post={post} />;
    }
    return null;
  })};

      </div>
    );
  };

  function Navbar() {
  return (
    <header className="flex items-center fixed top-0 w-full h-8 bg-zinc-10 z-9999 mt-2">

    <a href="/">
     <img src="https://cdn-icons-png.flaticon.com/512/3183/3183035.png" alt="Logo" className="static w-8 y-8 self-start m-5	" />
    </a> 
    <div className="flex space-x-4 space-x-reverse">
    <Link
      to="/"
      className="bg-white rounded-sm px-4 py-2 text-emerald-600 hover:bg-teal-500 m-2 "
    >
      Mis Publicaciones
    </Link>

    <Link
      to="/"
      className="bg-teal-500 m-2 rounded-sm px-4 py-2 text-white hover:bg-teal-600"
    >Papelera
    </Link>

    <Link
      to="/new"
      className="bg-emerald-600 rounded px-4 py-2 text-white hover:bg-teal-500 m-2 "
    >
      Crear Publicacion
    </Link>
    </div>
  </header>
  );
}


  return (
    <main>
      <Navbar />

      <h1 className="text-2xl text-emerald-600 font-bold mb-3 mt-12">
      Publicaciones({posts.filter(post => post.state==="i").length})
      </h1>
      

      {renderBin()}
    </main>
  );
}


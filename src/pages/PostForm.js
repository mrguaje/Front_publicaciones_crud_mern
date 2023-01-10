  import { Formik, Form, Field, ErrorMessage } from "formik";
  import { Link, useParams } from "react-router-dom";
  import * as Yup from "yup";
  import { usePosts } from "../context/postContext";
  import { useNavigate } from "react-router-dom";
  import { AiOutlineLoading3Quarters } from "react-icons/ai";
  import { useEffect, useState } from "react";

  export function PostForm() {
    const { createPost, getPost, updatePost } = usePosts();
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();
    const [post, setPost] = useState({
      title: "",
      description: "",
      createdDate: Date.now()
    });
    console.log(post)
    const params = useParams();

    useEffect(() => {
      (async () => {
        if (params.id) {
          const post = await getPost(params.id);
          setPost({
            title: post.title,
            description: post.description,
            image: post.image,
            createdDate: post.createdDate,
          });
          
        }
      })();

    }, [params.id, getPost]); 

    return (
      <div className="flex items-center justify-center">
        <div className="bg-zinc-300 p-10 shadow-md shadow-zinc-400">
          <header className="flex justify-between items-center py-4 text-emerald-800">
            <h3 className="text-2xl ">Publicacion</h3>
            <Link to="/" className="text-gray-600 text-sm hover:text-gray-300">
              Atras
            </Link>
          </header>
          <Formik
            initialValues={post}
            enableReinitialize
            validationSchema={Yup.object({
              title: Yup.string().required("El titulo es requerido"),
              description: Yup.string().required("La descripcion es requerida"),
              //image: Yup.mixed().required("La imagen es requerida"),
            })}
            onSubmit={async (values, actions) => {
              if (post.id) {

                await updatePost(post.id, values)           

              } else {
                await createPost(values);
              }
              actions.resetForm();
              actions.setSubmitting(false);
              navigate("/");
              window.location.reload();
              
              console.log(values)

            if (values.image) {
              console.log("adentro")
              const imageUrl = URL.updatePost(values.image);
              setPost({
                image: imageUrl.image,
              }, [values.image] )
            }

            }}
          >
            {({ setFieldValue, isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <label
                  htmlFor="createdDate"
                  className="text-sm font-bold mb-2 text-emerald-600 inline mr-2"
                >
                  Fecha de creacion:
                </label>
                <Field
                    name="createdDate"
                    render={({ field }) => (
                      <div className="px-3 py-2 rounded text-purple-700 w-full inline ">
                        {new Date(field.value).toLocaleDateString()}      
                      </div>
                    )}
                />
          

                <label
                  htmlFor="title"
                  className="text-sm block font-bold mb-2 text-emerald-600 mt-3"
                >
                  Titulo
                </label>
                <Field
                  className="px-3 py-2 focus:outline-none rounded bg-white text-emerald-400 w-full"
                  placeholder="Titulo de la Publicacion"
                  name="title"
                  // autoFocus
                />
                <ErrorMessage
                  component="p"
                  name="title"
                  className="text-red-400 text-sm"
                />

                <label
                  htmlFor="description"
                  className="text-sm block font-bold mb-2 text-emerald-600"
                >
                  Descripcion
                </label>
                <Field
                  component="textarea"
                  name="description"
                  id="description"
                  placeholder="Escribe una descripcion"
                  rows="3"
                  className="px-3 py-2 focus:outline-none rounded bg-white text-emerald-400 w-full"
                />
                <ErrorMessage
                  component="p"
                  name="description"
                  className="text-red-400 text-sm"
                />

                <label
                  htmlFor="image"
                  className="text-sm block font-bold mb-2 text-emerald-600"
                >
                  Imagen
                </label>
                <input
                  type="file"
                  name="image"
                  className="px-3 py-2 focus:outline-none rounded bg-white text-emerald-400 w-full"
                  onChange={(e) => {
                    setFieldValue("image", e.currentTarget.files[0])
                    setImageUrl(URL.createObjectURL(e.currentTarget.files[0]))
                    console.log(imageUrl)
                  }
                  }
                />
                <ErrorMessage
                  component="p"
                  name="image"
                  className="text-red-400 text-sm"
                />


                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-teal-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-emerald-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <AiOutlineLoading3Quarters className="animate-spin h-5 w-5" />
                  ) : (
                    "Guardar"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
    </div>
  );
}

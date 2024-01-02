import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react"
import AuthContext from "context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PostProps } from "./PostList";


export default function PostForm(){

  const params = useParams();
  const [post, setPost] = useState<PostProps | null>(null);
  const [isCreate, setIsCreate] = useState<boolean>(true);
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();


  const onSubmit = async( e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post.id) {
        // post 값이 있다면 데이터 수정 (게시글 수정)
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          title: title,
          summary: summary,
          content: content,
          updatedAt: new Date()?.toLocaleDateString(),
        });
        toast?.success("게시글을 수정했습니다.")
        navigate(`/posts/${post.id}`);

      } else {
        // post 값이 없다면 데이터 생성 (게시글 등록)
        await addDoc(collection(db, "posts"), {
          title: title,
          summary: summary,
          content: content,
          createdAt: new Date()?.toLocaleDateString(),
          email: user?.email,
          uid: user?.uid,
        });
        toast?.success("게시글을 생성했습니다.")
        navigate("/");
      }

    } catch (e: any) {
      console.log(e);
      toast?.error(e?.code);
    }
  }

  const onChange = ( e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target: { name, value },} = e;

    if (name === "title") {
      setTitle(value);
    }
    if (name === "summary") {
      setSummary(value);
    }
    if (name === "content") {
      setContent(value);
    }
  }

  const getPost = async (id:string) => {
    if(id) {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostProps)});
    }
  };

  useEffect(() => {
    if(params?.id) {
      getPost(params?.id);
      setIsCreate(false)
    }
  }, [params?.id]);

  useEffect(() => {
    if(post) {
      setTitle(post?.title)
      setSummary(post?.summary)
      setContent(post?.content)
    }
  }, [post]);

  return(
    <form onSubmit={onSubmit} className="form">
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input 
          type="text" 
          name="title" 
          id="title" 
          required 
          onChange={onChange}
          value={title}
        />
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input 
          type="text" 
          name="summary" 
          id="summary" 
          required 
          onChange={onChange}
          value={summary}
        />
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea 
          name="content" 
          id="content" 
          required 
          onChange={onChange}
          value={content}
        />
      </div>
      <div className="form__block">
        {
          isCreate ?
          <input type="submit" value="등록하기" className="form__btn--submit" />
          :
          <input type="submit" value="수정하기" className="form__btn--update-submit" />
        }
      </div>
    </form>
  )
}
import { Link } from "react-router-dom";
import { BsSun, BsMoonFill } from "react-icons/bs";
import { useContext } from "react";
import ThemeContext from "context/ThemContext";

export default function Header() {

  const context = useContext(ThemeContext);
  console.log("context", context);

  return (
    <header>
        <Link to="/" className="header__logo">React Blog</Link>
      <div>
        <Link to="/posts/new">글쓰기</Link>
        <Link to="/posts">게시글</Link>  
        <Link to="/profile">프로필</Link>
      </div>

      <>
        {context.theme === "light" ? (
          <BsSun onClick={context.toggleMode} className="footer__theme-btn" />
          ) : (
          <BsMoonFill onClick={context.toggleMode} className="footer__theme-btn" />
          )
        }
      </>
    </header>
  )
}
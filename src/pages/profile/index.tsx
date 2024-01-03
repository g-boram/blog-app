import PostList from "components/PostList";
import Profile from "components/Profile";

export default function ProfilePage(){
  return(
    <>
      <Profile />
      <PostList hasNavigation={false} defaultTab="my"/>
    </>
  )
}
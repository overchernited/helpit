import Post from "../Post"
import MyPost from "../../MyPost"

const PostLoader = () => {
    return (
        <>
            <div class="flex justify-center h-full w-[90vw] md:w-[50vw] my-9" >
                <MyPost />
            </div >
            <div class="h-full w-[90vw] md:w-[50vw] flex items-center flex-col gap-5 pb-5"
            >

                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </>
    )
}

export default PostLoader
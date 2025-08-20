// import React from "react";
// import Link from "next/link";

// interface IPostData {
//     userId: number;
//     id: number;
//     title: string;
//     body: string;
// }
// export async function generateMetadata({ params }: { params: { postId: string } }) {
//     const { postId } = await params;
//     const post = await fetchData(postId);
//     return { title: `Номер статьи ${post.id.toString()}`, description: post.body };
// }
// async function fetchData(postId: string): Promise<IPostData> {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
//     const result = await res.json();
//     return result;
// }

const Post = async () => {
    // const { postId } = await params;
    // const postData = await fetchData(postId);
    // const { title, body, id } = postData;
    return (
        <section>
            {/* <div>{id}</div>
            <div>{title}</div>
            <div>{body}</div> */}
            {/* <Link href="/">На главную</Link> */}
        </section>
    );
};

export default Post;

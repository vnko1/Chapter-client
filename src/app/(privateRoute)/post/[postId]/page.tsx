import React from "react";

function PostPage({ params }: { params: { postId: string } }) {
  return <div>PostPage: {params.postId}</div>;
}

export default PostPage;

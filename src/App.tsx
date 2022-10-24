import React, { useEffect, useState } from "react";

export type getPlaceHolderObjectType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

interface styleComments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
interface styleUsers {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const HomePage = () => {
  const [posts, setPosts] = useState<Array<getPlaceHolderObjectType>>([]);
  const [comments, setComments] = useState<Array<styleComments>>([]);
  const [users, setUsers] = useState<Array<styleUsers>>([]);

  const getPlaceHolderAPIPosts = async () => {
    const result = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await result.json();
    setPosts(data);
  };
  const getPlaceHolderAPIComments = async () => {
    const result = await fetch("https://jsonplaceholder.typicode.com/comments");
    const data = await result.json();
    setComments(data);
  };

  const getPlaceHolderApiUsers = async () => {
    const result = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await result.json();
    setUsers(data);
  };

  useEffect(() => {
    getPlaceHolderAPIPosts();
    getPlaceHolderAPIComments();
    getPlaceHolderApiUsers();
  }, []);

  return (
    <div>
      {posts.map((post: getPlaceHolderObjectType) => {
        return (
          <>
            {users.map((user: styleUsers) => {
              if (post.userId === user.id)
                return (
                  <div>
                    <h1>Nome Utente: {user.name}</h1>
                  </div>
                );
              else return "";
            })}
            <div key={post.id}>
              <h1>Title: {post.title}</h1>
              <h3>Description: {post.body}</h3>
              <h2>COMMENTI</h2>

              {comments.map((comment: styleComments) => {
                if (comment.postId === post.id)
                  return (
                    <div
                      key={comment.id}
                      style={{ margin: "30px 0", border: "1px solid black" }}
                    >
                      <h3 key={"name"}>Name: {comment.name}</h3>
                      <h3 key={"comment"}>Comment: {comment.body}</h3>
                    </div>
                  );
                else return "";
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default HomePage;

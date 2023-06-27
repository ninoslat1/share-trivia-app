"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";

const UpdateTrivia = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const triviaId = searchParams.get("id");

  const [post, setPost] = useState({ trivia: "", tag: "", });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getTriviaDetails = async () => {
      const response = await fetch(`/api/trivia/${triviaId}`);
      const data = await response.json();

      setPost({
        trivia: data.trivia,
        tag: data.tag,
      });
    };

    if (triviaId) getTriviaDetails();
  }, [triviaId]);

  const updateTrivia = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!triviaId) return alert("Missing Trivia Id!");

    try {
      const response = await fetch(`/api/trivia/${triviaId}`, {
        method: "PATCH",
        body: JSON.stringify({
          trivia: post.trivia,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateTrivia}
    />
  );
};

export default UpdateTrivia;
"use client";

import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
    const router = useRouter();
    const {data: session} = useSession();
    const [submitting, setIsSubmitting] = useState(false);
    const [submittingSucceed, setIsSubmittingSucceed] = useState<boolean | null>(null);
    const [post, setPost] = useState({ prompt: "", tag: "" });

    const createPrompt = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/prompt/new", {
                method: "POST",
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user!.id,
                    tag: post.tag,
                }),
            });

            if (response.ok) {
                //router.push("/");
                setIsSubmittingSucceed(true);
            }
        } catch (error) {
            setIsSubmittingSucceed(false);
            console.log(error);
        } finally {
            setIsSubmitting(false);
            post.prompt=""
            post.tag=""
        }
    };

    return (
        <Form
            type='Create'
            post={post}
            setPost={setPost}
            submitting={submitting}
            submittingSucceed={submittingSucceed}
            handleSubmit={createPrompt}
        />
    );
};

export default CreatePrompt;
"use client";

import { z } from "zod";
import { User } from '@prisma/client';
import { Form, FormField, FormItem, FormMessage, useZodForm } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import PostLayout from "@/src/feature/post/PostLayout";
import { ContentTextArea } from "@/src/feature/post/ContentTextArea";
import { Button } from "@/components/ui/button";

const Schema = z.object({
    content: z.string().min(1).max(500)
});

export type WritePostFormValues = z.infer<typeof Schema>;

type WritePostFormProps = {
    user: User;
    onSubmit: (values: WritePostFormValues) => Promise<string>;
}

const WritePostForm = ({user, onSubmit}: WritePostFormProps) => {
    const form = useZodForm({
        schema: Schema,
    });


    const router = useRouter();

    return (
        <PostLayout user={user}>
            <Form form={form} onSubmit={async (values) => {
                const postId = await onSubmit(values);
                router.push(`/posts/${postId}`);
            }}>
                <FormField control={form.control} name="content" render={({field}) => (
                    <FormItem>
                        <ContentTextArea {...field } />
                        <FormMessage />
                    </FormItem>
                )} />
                
                <div className="flex w-full justify-end">
                    <Button size={"sm"}>Post</Button>
                </div>
            </Form>
        </PostLayout>
    );
}
 
export default WritePostForm;
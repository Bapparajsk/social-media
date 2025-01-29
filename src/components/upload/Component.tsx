import { useRef, useState } from "react";
import { FileUpload } from "../ui/FileUpload";
import { Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useMotionValue } from "@/components/motion";
import { useUser } from "@/contexts/user.context";
import { ProgressBar } from "../ui/progress";
import { createUrl, createPost, uploadFile } from "@/lib/post";


export default function Component() {

    const [image, setImage] = useState<File | null>(null);
    const [description, setDescription] = useState<string>("");
    const [stage, setStage] = useState<number>(1);
    const ref = useRef<HTMLDivElement>(null);
    const progress = useMotionValue(0);

    const { user } = useUser();

    const { mutate, isPending } = useMutation({
        mutationKey: ["upload"],
        mutationFn: async () => {
            if (!image) {
                throw new Error("No image found");
            }

            const containerX = ref.current?.getBoundingClientRect().x || 0;
            progress.set(containerX * .10);

            const { url, key } = await createUrl(image?.name || user?.name || "post");
            progress.set(containerX * .45);

            await uploadFile(url, image);
            progress.set(containerX * .90);

            await createPost(key, description);
            progress.set(containerX);
        },
        onSuccess: () => {
            setStage(1);
            setImage(null);
            setDescription("");
            progress.set(0);
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const onFileUpload = (file: File) => {
        setImage(file);
        setStage(2);
    };

    const upload = () => mutate();

    return (
        <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            {stage === 1 ? <FileUpload onChange={onFileUpload} /> : (
                <div className="w-full h-full flex-col gap-5 flex items-center justify-center py-4">
                    {image && <Image
                        width={500}
                        height={500}
                        src={URL.createObjectURL(image)}
                        alt="Image"
                        className="w-1/2 h-1/2 rounded-lg"
                    />}
                    <div
                        className="w-full h-auto px-5"
                    >
                        <Textarea
                            fullWidth
                            placeholder="Write something"
                            defaultValue={""}
                            minRows={5}
                            disabled={isPending}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <ProgressBar progress={progress} ref={ref}/>
                    <div className="flex justify-center mt-4 gap-2">
                        <Button
                            onPress={() => setStage(1)}
                            size="sm"
                            variant="faded"
                            color="danger"
                            isLoading={isPending}
                        >
                            Prev
                        </Button>
                        <Button
                            onPress={upload}
                            size="sm"
                            variant="shadow"
                            color="primary"
                            isLoading={isPending}
                        >
                            Upload
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

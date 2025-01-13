import { useState } from "react";
import { FileUpload } from "../ui/FileUpload";
import {Textarea} from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import Image from "next/image";

export default function Component() {

    const [image, setImage] = useState<File | null>(null);
    const [stage, setStage] = useState<number>(1);

    const onFileUpload = (file: File) => {
        setImage(file);
        setStage(2);
    };

    const upload = () => {
        // api coll
        console.log(image);
        
    };
    
    return (
        <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
            {stage === 1 ? <FileUpload onChange={onFileUpload}/> : (
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
                        />
                    </div>
                    <div className="flex justify-center mt-4 gap-2">
                    <Button
                        onPress={() => setStage(1)}
                        size="sm"
                        variant="faded"
                        color="danger"
                    >
                        Prev
                    </Button>
                    <Button
                        onPress={upload}
                        size="sm"
                        variant="shadow"
                        color="primary"
                    >
                        Upload
                    </Button>
                </div>
                </div>
            )}
        </div>
    );
}

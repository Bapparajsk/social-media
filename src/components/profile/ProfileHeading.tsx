"use client";

import Image from 'next/image';
import { Avatar, AvatarGroup } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { IconPlus, IconPencil, IconDotsVertical } from "@tabler/icons-react";

export default function ProfileHeading() {
    return (
        <div className="w-full h-auto border-b-1 border-neutral-200 dark:border-neutral-700">
            <div className='w-full h-auto flex flex-col'>
                <div className="relative w-full h-44 sm:h-52 md:h-60 lg:h-72 xl:h-80 flex justify-center items-center rounded-md">
                    <Image
                        width={1000}
                        height={1000}
                        src="/profile.jpg"
                        alt="Profile Picture"
                        className='w-full h-full object-cover rounded-md'
                    />
                    <div className='absolute w-28 h-28 md:w-32 md:h-32 xl:w-36 xl:h-36 rounded-full left-10 -bottom-[4rem] md:-bottom-[4.5rem] xl:-bottom-[5rem]'>
                        <Image
                            width={150}
                            height={150}
                            src="/newbg.jpeg"
                            alt="Profile Picture"
                            className='w-full h-full object-cover border-1 sm:border-2 md:border-3 xl:border-4 border-white dark:border-black rounded-full'
                        />
                    </div>
                </div>
                <div className='w-full h-[4rem] md:h-[4.5rem] xl:h-[5rem]' />
                <div className='w-full h-auto items-start justify-between py-5 sm:px-2 md:px-3 lg:px-5 flex gap-3 flex-col md:flex-row'>
                    <div className='flex gap-3'>
                        <div className='flex flex-col justify-center'>
                            <p className='text-start text-lg sm:text-xl md:text-2xl xl:text-3xl font-semibold'>John Doe</p>
                            <p className='text-start text-sm md:text-base xl:text-medium font-normal text-neutral-300 dark:text-neutral-500'>@johndoe - 200k Friends</p>
                        </div>
                        <div className='hidden sm:block'>
                            <AvatarGroup
                                isBordered
                                max={5}
                                renderCount={(count) => (
                                    <p className="text-small text-foreground font-medium ms-2">+{count} others</p>
                                )}
                                total={1}
                            >
                                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
                                <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
                                <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
                                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
                                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                                <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
                            </AvatarGroup>
                        </div>
                    </div>
                    <div className='w-full md:w-auto flex gap-2'>
                        <div className='flex-grow sm:flex-grow-0'>
                            <Button fullWidth variant={"shadow"} color={"primary"}>
                                <IconPlus stroke={1.5} /> 
                                <span className='md:hidden lg:block'>Create new Post</span>
                            </Button>
                        </div>
                        <div>
                            <Button >
                                <IconPencil stroke={1.5} />
                                <span className='md:hidden lg:block'>Edit Profile</span>
                            </Button>
                        </div>
                        <div >
                            <Button isIconOnly>
                                <IconDotsVertical stroke={1.5} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

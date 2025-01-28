"use client";

import Image from 'next/image';
import {
    Avatar,
    AvatarGroup,
    Button,
    Modal,
    ModalContent,
    useDisclosure,
    Skeleton,
} from "@nextui-org/react";
import { useRouter } from 'next/navigation';

import { IconPlus, IconPencil, IconDotsVertical } from "@tabler/icons-react";
import { SettingModel } from '../setting';
// import { useProfile } from "@/contexts/profile.context";
import { useUser } from '@/contexts/user.context';
import { useState } from 'react';
import { FileUpload } from '../ui/FileUpload';
import { Profile } from '@/contexts/type.profile';

export default function ProfileHeading({profile, isFetching}: {profile: Profile, isFetching: boolean}) {

    const [modalState, setModalState] = useState<"setting" | "create-post">("setting");

    const { user } = useUser();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { push } = useRouter();

    return (
        <>
            <div className="w-full h-auto border-b-1 border-neutral-200 dark:border-neutral-700">
                <div className='w-full h-auto flex flex-col'>
                    <div className="relative w-full h-44 sm:h-52 md:h-60 lg:h-72 xl:h-80 flex justify-center items-center rounded-md">
                        <Skeleton className='w-full h-full object-cover rounded-md' style={{display: isFetching ? 'block' : 'none'}} />
                        <Image
                            width={1000}
                            height={1000}
                            src={profile?.coverPicture || "/profile.jpg"}
                            alt="Profile Picture"
                            className='w-full h-full object-cover rounded-md'
                            style={{display: isFetching ? 'none' : 'block'}}
                        />
                        <div className='absolute w-28 h-28 md:w-32 md:h-32 xl:w-36 xl:h-36 rounded-full left-10 -bottom-[4rem] md:-bottom-[4.5rem] xl:-bottom-[5rem]'>
                            <Skeleton className='w-full h-full object-cover border-1 sm:border-2 md:border-3 xl:border-4 border-white dark:border-black rounded-full' style={{display: isFetching ? 'block' : 'none'}} />
                            <Image
                                width={150}
                                height={150}
                                src={profile?.profilePicture || "/newbg.jpeg"}
                                alt="Profile Picture"
                                className='w-full h-full object-cover border-1 sm:border-2 md:border-3 xl:border-4 border-white dark:border-black rounded-full'
                                style={{display: isFetching ? 'none' : 'block'}}
                            />
                        </div>
                    </div>
                    <div className='w-full h-[4rem] md:h-[4.5rem] xl:h-[5rem]' />
                    <div className='w-full h-auto items-start justify-between py-5 sm:px-2 md:px-3 lg:px-5 flex gap-3 flex-col md:flex-row'>
                        <div className='flex gap-3'>
                            <div className={`flex flex-col gap-2 justify-center ${isFetching ? 'block' : 'hidden'}`}>
                                <Skeleton className='w-56 h-10 rounded-lg' />
                                <Skeleton className='w-56 h-4 rounded-lg' />
                            </div>
                            <div className={`flex flex-col justify-center ${isFetching ? 'hidden' : 'block'}`}>
                                <p className='text-start text-lg sm:text-xl md:text-2xl xl:text-3xl font-semibold'>{profile?.name}</p>
                                <p className='text-start text-sm md:text-base xl:text-medium font-normal text-neutral-300 dark:text-neutral-500'>{profile?.title ? profile.title + " - " : ""} {profile?.totalFriends} Friends</p>
                            </div>
                            <div className='hidden sm:block'>
                                <AvatarGroup
                                    isBordered
                                    max={5}
                                    renderCount={(count) => (
                                        <Button
                                            size='sm'
                                            variant='faded'
                                            color={count > 4 ? 'primary' : "success"}
                                            className='ml-2'
                                            onPress={() => { push("/friend?env=friends"); }}
                                        >
                                            + {user?.userId !== profile?.userId ? `${count} others` : count > 4 ? "More" : "Add Friend"}
                                        </Button>
                                    )}
                                    total={profile?.totalFriends}
                                >
                                    {profile?.friends.map((friend, index) => (
                                        <Avatar
                                            key={index}
                                            src={friend.profilePicture || "/profile.jpg"}
                                            alt={friend.name}
                                        />
                                    ))}
                                </AvatarGroup>
                            </div>
                        </div>
                        <div style={{display: isFetching ? "none" : "flex"}} className={`w-full md:w-auto gap-2 ${user?.userId !== profile?.userId ? 'hidden' : 'flex'}`}>
                            <div className='flex-grow sm:flex-grow-0'>
                                <Button fullWidth variant={"shadow"} color={"primary"} onPress={() => {
                                    setModalState("create-post");
                                    onOpen();
                                }}>
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
                                <Button onPress={() => {
                                    setModalState("setting");
                                    onOpen();
                                }} isIconOnly>
                                    <IconDotsVertical stroke={1.5} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal backdrop="blur" isOpen={isOpen} size={"lg"} onClose={onClose} hideCloseButton>
                <ModalContent>
                    {() => (modalState === "setting" ? <SettingModel /> : <FileUpload />)}
                </ModalContent>
            </Modal>
        </>
    );
}

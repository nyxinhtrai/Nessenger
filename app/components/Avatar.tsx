'use client';

import Image from "next/image";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import useActiveList from "../hooks/useActiveList";

interface AvatarProps {
    user?: User;
}

const Avatar: React.FC<AvatarProps> = ({
    user
}) => {
    const { members } = useActiveList();
    const isActive = !!user?.email && members.includes(user.email);

    const { data: session } = useSession(); 
    let userImage = '/images/avtdefault.jpg';
    
    if (user?.image) {
        userImage = user.image;
    } else if (!user && session?.user?.image) {
        userImage = session.user.image;
    }

    return (
        <div className="relative">
            <div
                className="
                    relative
                    inline-block
                    rounded-full
                    overflow-hidden
                    h-9
                    w-9
                    md:h-11
                    md:w-11
                "
            >
                <Image 
                    alt="Avatar"
                    src={userImage}
                    fill
                    sizes="(max-width: 768px) 36px, (max-width: 1200px) 44px, 48px"
                />
            </div>
            {isActive && (
                <span 
                    className="
                        absolute
                        block
                        rounded-full
                        bg-green-500
                        ring-2
                        ring-white
                        top-0
                        right-0
                        h-2
                        w-2
                        md:h-3
                        md:w-3
                    "
                />
            )}
        </div>
    );
}

export default Avatar;
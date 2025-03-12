'use client';

import { useSession } from "next-auth/react";

import Image from "next/image";
import { User } from "@prisma/client";

interface AvatarProps {
    user?: User;
}

const Avatar: React.FC<AvatarProps> = ({
    user
}) => {

    //fix session
    const { data: session } = useSession();
    const userImage = session?.user?.image || user?.image || "/images/avtdefault.jpg";

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
        </div>
    );
}

export default Avatar;
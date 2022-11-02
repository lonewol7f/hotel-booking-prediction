import React, {useEffect, useState} from 'react';
import {Container, Stepper} from "@mantine/core";
import {useRouter} from "next/router";

const Layout = ({children}) => {
    const [pageNumber, setPageNumber] = useState(0);
    const router = useRouter();

    const [isAPage, setIsAPage] = useState(false);

    useEffect(() => {
        if (router.pathname.includes('page')) {
            setIsAPage(true);
        } else {
            setIsAPage(false);
        }
    }, [router]);

    return (
        <div className={`h-screen w-screen flex flex-col justify-center items-center ${isAPage ? 'bg-gray-100' : 'bg-gray-200'}`}
            style={{
                backgroundColor: 'rgb(224, 242, 254)',
                // backgroundImage: 'radial-gradient(at 7% 2%, rgb(37, 99, 235) 0, transparent 76%), radial-gradient(at 55% 56%, rgb(3, 105, 161) 0, transparent 77%), radial-gradient(at 33% 83%, rgb(22, 78, 99) 0, transparent 26%), radial-gradient(at 16% 59%, rgb(253, 164, 175) 0, transparent 93%), radial-gradient(at 93% 28%, rgb(165, 243, 252) 0, transparent 33%), radial-gradient(at 29% 44%, rgb(244, 114, 182) 0, transparent 47%)'
                backgroundImage: 'radial-gradient(at 0% 0%, rgb(30, 64, 175) 0, transparent 100%), radial-gradient(at 96% 97%, rgb(209, 250, 229) 0, transparent 50%), radial-gradient(at 88% 21%, rgb(240, 171, 252) 0, transparent 80%), radial-gradient(at 2% 16%, rgb(226, 232, 240) 0, transparent 4%), radial-gradient(at 33% 10%, rgb(243, 244, 246) 0, transparent 36%), radial-gradient(at 89% 37%, rgb(199, 210, 254) 0, transparent 8%), radial-gradient(at 17% 6%, rgb(165, 243, 252) 0, transparent 26%)'
            }}>

            {children}
        </div>
    );
};

export default Layout;
"use client";
import Link from "next/link";
import { PropsWithChildren } from "react";

import { usePathname, useParams, } from "next/navigation";


const TestPageLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const pathname = usePathname();
    const params = useParams();
    console.log({ pathname })
    console.log({ params })

    return <div>
        <Link href="/test/1234">
            Dynamic 1234
        </Link>
        <Link href="/test/5678">
            Dynamic 5678
        </Link>
        <Link href="/test/8901">
            Dynamic 8901
        </Link>
        <Link href="/test/mytest">
            My test
        </Link>
        {children}
    </div>
}

export default TestPageLayout;
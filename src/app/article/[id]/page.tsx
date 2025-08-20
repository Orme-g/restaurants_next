"use client";
import React from "react";
import { useParams, useSearchParams } from "next/navigation";

const Page: React.FC = () => {
    const params = useParams();
    console.log("params:", params);
    const searchParams = useSearchParams();
    const query = searchParams?.get("query");
    console.log("searchParams:", query);

    return <div>Testing params!</div>;
};

export default Page;

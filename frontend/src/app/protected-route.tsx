"use client";

import { redirect, usePathname } from 'next/navigation';
import React, { useState } from 'react'

type ProtectedRouteProps = {
    children: React.ReactNode;
};

const ProtectedRoute = ({
    children
}: ProtectedRouteProps) => {
    const [user, setUser] = useState(null);
    const pathname = usePathname();

    const isAuth = user;
    if (!isAuth) {
        if (pathname !== "/authentication/login") {
            redirect("/authentication/login")
        }
    }

    return children
}

export default ProtectedRoute
"use client";

import { ReactNode } from "react";

interface adminProps {
    className? : string
}

export const Admin = ({className} : adminProps) => {
  return (
    <div className={className}>
        Hi From Admin
    </div>
  );
};

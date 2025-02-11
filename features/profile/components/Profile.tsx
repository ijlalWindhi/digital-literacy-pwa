"use client";
import React from "react";

import Header from "./Header";
import Information from "./Information";
import ModalUpdate from "./ModalUpdate";

export default function Profile() {
  return (
    <div className="flex flex-col gap-6 min-h-[74vh]">
      <Header />
      <Information />
      <ModalUpdate />
    </div>
  );
}

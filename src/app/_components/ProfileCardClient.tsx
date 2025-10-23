"use client";
import ProfileCard from "../../../components/reactbits/ProfileCard";
import React from "react";

export default function ProfileCardClient(props: React.ComponentProps<typeof ProfileCard>) {
  return (
    <ProfileCard
      {...props}
      onContactClick={() => console.log("Contact clicked")} // safe here (client)
    />
  );
}

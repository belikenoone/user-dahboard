"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Mail, Phone, Briefcase, Building } from "lucide-react";

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
  };
  company: {
    name: string;
    title: string;
  };
}

const UserDetails = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`);
        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <Skeleton className="h-64 w-full rounded-xl" />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container mx-auto p-4 text-center text-2xl font-bold text-red-500">
        User not found
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-8 md:p-16 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
          <Avatar className="h-32 w-32 md:h-48 md:w-48 rounded-full border-4 border-white shadow-xl">
            <AvatarImage
              src={userData.image}
              alt={`${userData.firstName} ${userData.lastName}`}
            />
            <AvatarFallback className="text-4xl">
              {userData.firstName[0]}
              {userData.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {userData.firstName} {userData.lastName}
            </h1>
            <p className="text-xl text-white opacity-90">
              {userData.company.title}
            </p>
            <p className="text-lg text-white opacity-75">
              {userData.company.name}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Mail className="mr-2" /> Contact Information
            </h2>
            <div className="space-y-3">
              <p className="flex items-center">
                <Mail className="mr-2 text-gray-500" /> {userData.email}
              </p>
              <p className="flex items-center">
                <Phone className="mr-2 text-gray-500" /> {userData.phone}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <MapPin className="mr-2" /> Address
            </h2>
            <div className="space-y-3">
              <p className="flex items-center">
                <span className="mr-2 text-gray-500" /> {userData.address.city},{" "}
                {userData.address.state} {userData.address.postalCode}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Briefcase className="mr-2" /> Professional Information
          </h2>
          <div className="space-y-3">
            <p className="flex items-center">
              <Briefcase className="mr-2 text-gray-500" />{" "}
              {userData.company.title}
            </p>
            <p className="flex items-center">
              <Building className="mr-2 text-gray-500" />{" "}
              {userData.company.name}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDetails;

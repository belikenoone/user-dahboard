"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  MapPin,
  Mail,
  Phone,
  Briefcase,
  Building,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

import { User } from "@/types/types";

const UserDetails = () => {
  const router = useRouter();
  const { userId } = useParams();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("No User Found");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-8">
        <Skeleton className="h-64 w-full rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-40 rounded-xl" />
          <Skeleton className="h-40 rounded-xl" />
        </div>
        <Skeleton className="h-40 rounded-xl" />
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="container mx-auto p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="mr-2" /> Back
        </Button>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-6 flex items-center justify-center">
            <AlertCircle className="text-red-500 mr-2" size={24} />
            <p className="text-xl font-semibold text-red-700">
              {error || "User not found"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.back()}
        className="mb-4"
      >
        <ArrowLeft className="mr-2" /> Back
      </Button>
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 md:p-16">
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-12">
            <Avatar className="h-32 w-32 md:h-48 md:w-48 rounded-full border-4 border-white shadow-xl">
              <AvatarImage
                src={userData.image}
                alt={`${userData.firstName} ${userData.lastName}`}
              />
              <AvatarFallback className="text-4xl bg-blue-200 text-blue-600">
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
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-blue-600">
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

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-blue-600">
              <MapPin className="mr-2" /> Address
            </h2>
            <div className="space-y-3">
              <p className="flex items-center">
                <MapPin className="mr-2 text-gray-500" />
                {userData.address.city}, {userData.address.state}{" "}
                {userData.address.postalCode}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold mb-4 flex items-center text-blue-600">
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

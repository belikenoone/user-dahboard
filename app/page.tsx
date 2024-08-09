"use client";

import { useState, useEffect } from "react";
import Charts from "@/components/custom/Charts";
import UsersTable from "@/components/custom/UsersTable";
import { useUserStore } from "@/store/userDataStore";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const HomePage = () => {
  const { fetchData, pageNumber } = useUserStore();
  const [activeChart, setActiveChart] = useState<
    "bar" | "line" | "radial" | "radar"
  >("bar");

  useEffect(() => {
    fetchData(pageNumber);
  }, [pageNumber]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-4xl font-bold text-indigo-800 mb-4 md:mb-8">
          Interactive Dashboard
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 mb-4 md:mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-semibold text-indigo-700">
              User Data
            </h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>View Charts</Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-xs md:max-w-4xl">
                <DialogHeader>
                  <DialogTitle>User Data Visualization</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-4">
                    <Button
                      variant={activeChart === "bar" ? "default" : "outline"}
                      onClick={() => setActiveChart("bar")}
                    >
                      Bar Chart
                    </Button>
                    <Button
                      variant={activeChart === "line" ? "default" : "outline"}
                      onClick={() => setActiveChart("line")}
                    >
                      Line Chart
                    </Button>
                    <Button
                      variant={activeChart === "radial" ? "default" : "outline"}
                      onClick={() => setActiveChart("radial")}
                    >
                      Radial Chart
                    </Button>
                    <Button
                      variant={activeChart === "radar" ? "default" : "outline"}
                      onClick={() => setActiveChart("radar")}
                    >
                      Radar Chart
                    </Button>
                  </div>
                  <Charts chartType={activeChart} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <UsersTable />
        </div>
      </div>
    </div>
  );
};

export default HomePage;

"use client";

import { useState, useMemo, useEffect } from "react";
import {
  BarChart,
  LineChart,
  RadialBarChart,
  RadarChart,
  Bar,
  Line,
  RadialBar,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

interface Coordinates {
  lat: number;
  lng: number;
}

interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

interface Hair {
  color: string;
  type: string;
}

interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: string;
}

type ChartCategory = {
  value: keyof User;
  label: string;
  type: "numeric" | "categorical";
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
];

const Charts = ({
  chartType,
}: {
  chartType: "bar" | "line" | "radial" | "radar";
}) => {
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/users?limit=0");
        setUserData(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<ChartCategory>({
    value: "age",
    label: "Age",
    type: "numeric",
  });

  const categories: ChartCategory[] = [
    { value: "age", label: "Age", type: "numeric" },
    { value: "height", label: "Height", type: "numeric" },
    { value: "weight", label: "Weight", type: "numeric" },
    { value: "bloodGroup", label: "Blood Group", type: "categorical" },
    { value: "eyeColor", label: "Eye Color", type: "categorical" },
    { value: "gender", label: "Gender", type: "categorical" },
    { value: "university", label: "University", type: "categorical" },
  ];

  const getChartData = useMemo(() => {
    if (loading) return [];

    if (selectedCategory.type === "numeric") {
      return userData.map((user) => ({
        name: `${user.firstName} ${user.lastName}`,
        value: user[selectedCategory.value] as number,
      }));
    } else {
      const categoryCounts = userData.reduce(
        (acc: Record<string, number>, user) => {
          const value = user[selectedCategory.value] as string;
          acc[value] = (acc[value] || 0) + 1;
          return acc;
        },
        {}
      );
      return Object.entries(categoryCounts).map(([name, value]) => ({
        name,
        value,
      }));
    }
  }, [userData, selectedCategory, loading]);

  const renderChart = () => {
    if (loading) {
      return <div>Loading...</div>;
    }

    const commonProps = {
      data: getChartData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 },
    };

    switch (chartType) {
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        );
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        );
      case "radial":
        return (
          <RadialBarChart
            width={300}
            height={300}
            cx="50%"
            cy="50%"
            innerRadius="10%"
            outerRadius="80%"
            barSize={10}
            data={getChartData}
          >
            <RadialBar
              // minAngle={15}
              label={{ position: "insideStart", fill: "#fff" }}
              background
              // clockWise
              dataKey="value"
            >
              {getChartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </RadialBar>
            <Tooltip />
          </RadialBarChart>
        );
      case "radar":
        return (
          <RadarChart
            cx="50%"
            cy="50%"
            outerRadius="80%"
            width={400}
            height={400}
            data={getChartData}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar
              name="User Data"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        );
      default:
        return <div>Invalid chart type</div>;
    }
  };

  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <div className="mb-4">
        <select
          value={selectedCategory.value}
          onChange={(e) => {
            const newCategory = categories.find(
              (c) => c.value === e.target.value
            );
            if (newCategory) setSelectedCategory(newCategory);
          }}
          className="p-2 border rounded w-full md:w-auto"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>
      <div className="h-[200px] md:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;

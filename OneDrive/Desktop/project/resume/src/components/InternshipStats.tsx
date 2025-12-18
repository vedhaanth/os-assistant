import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

interface Internship {
  _id: string;
  state: string;
  qualification: string;
}

interface StatsData {
  totalInternships: number;
  totalCompanies: number;
  totalLocations: number;
  totalPositions: number;
  topSkills: { skill: string; count: number }[];
  companies: string[];
  locations: string[];
  positions: string[];
  qualifications: string[];
  internships: Internship[];
}

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
  '#82CA9D',
  '#A4DE6C',
  '#D0ED57',
  '#FFD700',
  '#FF6B6B',
];

const InternshipStats: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatsData | null>(null);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/internships/stats/overview');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  const locationData = stats.locations.map((location) => ({
    name: location,
    count: stats.internships.filter((i) => i.state === location).length,
  }));

  const skillData = stats.topSkills.map((skill, index) => ({
    ...skill,
    color: COLORS[index % COLORS.length],
  }));

  const qualificationData = stats.qualifications.map((qual) => ({
    name: qual,
    count: stats.internships.filter((i) => i.qualification === qual).length,
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Internship Analytics
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {/* Overview Cards */}
        <Box sx={{ width: { xs: '100%', sm: '45%', md: '22%' } }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Internships
              </Typography>
              <Typography variant="h4">
                {stats.totalInternships}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ width: { xs: '100%', sm: '45%', md: '22%' } }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Companies
              </Typography>
              <Typography variant="h4">
                {stats.totalCompanies}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ width: { xs: '100%', sm: '45%', md: '22%' } }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Locations
              </Typography>
              <Typography variant="h4">
                {stats.totalLocations}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ width: { xs: '100%', sm: '45%', md: '22%' } }}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Position Types
              </Typography>
              <Typography variant="h4">
                {stats.totalPositions}
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Skills Distribution */}
        <Box sx={{ width: { xs: '100%', md: '48%' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Top Skills in Demand
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={skillData}
                    dataKey="count"
                    nameKey="skill"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    labelLine={false}
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      percent,
                      name,
                    }: any) => {
                      const RADIAN = Math.PI / 180;
                      const radius = (Number(innerRadius) + Number(outerRadius)) * 0.5;
                      const x = Number(cx) + radius * Math.cos(-Number(midAngle) * RADIAN);
                      const y = Number(cy) + radius * Math.sin(-Number(midAngle) * RADIAN);

                      return (
                        <text
                          x={x}
                          y={y}
                          fill="white"
                          textAnchor={x > Number(cx) ? 'start' : 'end'}
                          dominantBaseline="central"
                        >
                          {`${name} (${(Number(percent) * 100).toFixed(0)}%)`}
                        </text>
                      );
                    }}
                  >
                    {skillData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        {/* Location Distribution */}
        <Box sx={{ width: { xs: '100%', md: '48%' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Internships by Location
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={locationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" name="Internships" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        {/* Qualification Distribution */}
        <Box sx={{ width: '100%' }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Internships by Qualification
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={qualificationData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={150} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" name="Internships" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default InternshipStats;